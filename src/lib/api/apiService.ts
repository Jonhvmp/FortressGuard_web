import { buildApiUrl, API_CONFIG } from './config';

/**
 * Tipos para os parâmetros e respostas das operações da API
 */
export type PasswordParams = {
  length?: number;
  special?: boolean;
};

export type ValidationParams = {
  password: string;
};

export type EncryptionParams = {
  text: string;
};

export type DecryptionParams = {
  encryptedText: string;
};

/**
 * Interface genérica para respostas da API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Interface para resposta de geração de senha
 */
export interface GeneratePasswordResponse {
  password: string;
  strength: string;
  score: number;
  timestamp: string;
  params: {
    length: number;
    includeSpecial: boolean;
  };
}

/**
 * Interface para resposta de validação de senha
 */
export interface ValidatePasswordResponse {
  valid: boolean;
  strength: string;
  score: number;
  feedback: string;
  timestamp: string;
}

/**
 * Interface para resposta de criptografia
 */
export interface EncryptResponse {
  encryptedText: string;
  originalLength: number;
  encryptedLength: number;
  timestamp: string;
}

/**
 * Interface para resposta de descriptografia
 */
export interface DecryptResponse {
  decryptedText: string;
  length: number;
  timestamp: string;
}

/**
 * Interface para resposta de estatísticas
 */
export interface StatisticsResponse {
  passwordsGenerated: number;
  passwordsValidated: number;
  textEncrypted: number;
  stregthDistribution: {
    weak: number;
    medium: number;
    strong: number;
    very_strong: number;
  };
  timestamp: string;
  serverInfo: {
    uptime: number;
    memoryUsage: Record<string, number>;
    nodeVersion: string;
  };
}

/**
 * Classe para lidar com erros da API
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

/**
 * Função para tratar erros nas requisições
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'Erro desconhecido ao conectar com a API';

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || `Erro ${response.status}: ${response.statusText}`;
  } catch (e) {
    errorMessage = `Erro ${response.status}: ${response.statusText}`;
    console.log("Erro: ", e)
  }

  throw new ApiError(errorMessage, response.status);
};

/**
 * Função genérica para fazer requisições à API
 */
const fetchApi = async <T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<ApiResponse<T>> => {
  try {
    // Construir a URL com parâmetros de consulta
    let url = buildApiUrl(endpoint);

    if (params) {
      const queryString = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => {
          // Converter booleanos para string
          if (typeof value === 'boolean') {
            return `${key}=${value.toString()}`;
          }
          return `${key}=${encodeURIComponent(value as string | number)}`;
        })
        .join('&');

      if (queryString) {
        url += `?${queryString}`;
      }
    }

    console.log(`Fazendo requisição para: ${url}`);

    // Adicionar timeout à requisição
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      // Desativar cache para evitar problemas
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return await handleApiError(response);
    }

    const data = await response.json();
    console.log('Resposta da API:', data);
    return data;
  } catch (error) {
    console.error('Erro na requisição API:', error);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('A requisição excedeu o tempo limite', 408);
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Erro desconhecido',
      500
    );
  }
};

/**
 * Serviços de API encapsulados para cada funcionalidade
 */
export const apiService = {
  /**
   * Gera uma senha segura com os parâmetros especificados
   */
  generatePassword: async (params?: PasswordParams): Promise<ApiResponse<GeneratePasswordResponse>> => {
    return await fetchApi<GeneratePasswordResponse>(API_CONFIG.endpoints.generatePassword, params);
  },

  /**
   * Valida uma senha existente
   */
  validatePassword: async (params: ValidationParams): Promise<ApiResponse<ValidatePasswordResponse>> => {
    return await fetchApi<ValidatePasswordResponse>(API_CONFIG.endpoints.validatePassword, params);
  },

  /**
   * Criptografa um texto
   */
  encryptText: async (params: EncryptionParams): Promise<ApiResponse<EncryptResponse>> => {
    return await fetchApi<EncryptResponse>(API_CONFIG.endpoints.encryptText, params);
  },

  /**
   * Descriptografa um texto
   */
  decryptText: async (params: DecryptionParams): Promise<ApiResponse<DecryptResponse>> => {
    return await fetchApi<DecryptResponse>(API_CONFIG.endpoints.decryptText, params);
  },

  /**
   * Obtém estatísticas de uso da API
   */
  getStatistics: async (): Promise<ApiResponse<StatisticsResponse>> => {
    return await fetchApi<StatisticsResponse>(API_CONFIG.endpoints.statistics);
  },
};
