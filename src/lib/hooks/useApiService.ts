"use client";

import { useState, useCallback } from 'react';
import { apiService, ApiError, GeneratePasswordResponse, ValidatePasswordResponse, EncryptResponse, DecryptResponse, StatisticsResponse } from '../api/apiService';

/**
 * Interface genérica para os estados da requisição
 */
interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook personalizado para usar os serviços da API com estado React
 */
export const useApiService = () => {
  // Estado para geração de senha
  const [passwordState, setPasswordState] = useState<ApiState<GeneratePasswordResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Estado para validação de senha
  const [validationState, setValidationState] = useState<ApiState<ValidatePasswordResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Estado para criptografia
  const [encryptionState, setEncryptionState] = useState<ApiState<EncryptResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Estado para descriptografia
  const [decryptionState, setDecryptionState] = useState<ApiState<DecryptResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  // Estado para estatísticas
  const [statisticsState, setStatisticsState] = useState<ApiState<StatisticsResponse>>({
    data: null,
    isLoading: false,
    error: null,
  });

  /**
   * Função genérica para lidar com requisições à API
   */
  const handleApiRequest = useCallback(async <T>(
    apiCall: () => Promise<{success: boolean, message?: string, data?: T, error?: string}>,
    setStateFn: React.Dispatch<React.SetStateAction<ApiState<T>>>
  ): Promise<void> => {
    setStateFn({
      data: null,
      isLoading: true,
      error: null,
    });

    try {
      const response = await apiCall();

      if (!response.success) {
        throw new ApiError(response.message || response.error || 'Erro desconhecido', 400);
      }

      if (!response.data) {
        throw new ApiError('Resposta da API não contém dados', 500);
      }

      setStateFn({
        data: response.data,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof ApiError
        ? error.message
        : error instanceof Error
          ? error.message
          : 'Erro desconhecido';

      console.error('Erro na requisição API:', errorMessage);

      setStateFn({
        data: null,
        isLoading: false,
        error: errorMessage,
      });
    }
  }, []);

  /**
   * Gerar senha
   */
  const generatePassword = useCallback(async (length?: number, includeSpecial?: boolean) => {
    return handleApiRequest(
      () => apiService.generatePassword({ length, special: includeSpecial }),
      setPasswordState
    );
  }, [handleApiRequest]);

  /**
   * Validar senha
   */
  const validatePassword = useCallback(async (password: string) => {
    return handleApiRequest(
      () => apiService.validatePassword({ password }),
      setValidationState
    );
  }, [handleApiRequest]);

  /**
   * Criptografar texto
   */
  const encryptText = useCallback(async (text: string) => {
    return handleApiRequest(
      () => apiService.encryptText({ text }),
      setEncryptionState
    );
  }, [handleApiRequest]);

  /**
   * Descriptografar texto
   */
  const decryptText = useCallback(async (encryptedText: string) => {
    return handleApiRequest(
      () => apiService.decryptText({ encryptedText }),
      setDecryptionState
    );
  }, [handleApiRequest]);

  /**
   * Obter estatísticas
   */
  const getStatistics = useCallback(async () => {
    return handleApiRequest(
      () => apiService.getStatistics(),
      setStatisticsState
    );
  }, [handleApiRequest]);

  return {
    // Estados
    passwordState,
    validationState,
    encryptionState,
    decryptionState,
    statisticsState,

    // Métodos
    generatePassword,
    validatePassword,
    encryptText,
    decryptText,
    getStatistics,
  };
};
