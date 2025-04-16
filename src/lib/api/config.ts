/**
 * Configuração para conexão com a API
 */

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  endpoints: {
    generatePassword: '/generate-password',
    validatePassword: '/validate-password',
    encryptText: '/encrypt-text',
    decryptText: '/decrypt-text',
    statistics: '/statistics',
  },
  timeout: 30000, // Aumentado para 30 segundos para debug
}

/**
 * Constrói a URL completa para um endpoint da API
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}/api/${API_CONFIG.apiVersion}${endpoint}`;
}
