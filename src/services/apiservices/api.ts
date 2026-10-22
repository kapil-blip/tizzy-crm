import NetInfo from '@react-native-community/netinfo';
import * as Keychain from 'react-native-keychain';

export const API_HOST = 'https://stagingsuperadmin.tizzygroup.com'//'https://superadmin.tizzygroup.com';
export const API_BASE_URL = `${API_HOST}/api/crm`;

export const buildQuery = (params: Record<string, string | number | undefined>) => {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&');
  return query ? `?${query}` : '';
};

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: boolean;
}

const OFFLINE_ERROR_MESSAGE =
  'No internet connection. Please check your network and try again.';

export const API_OFFLINE_MESSAGE = OFFLINE_ERROR_MESSAGE;
export const API_SERVER_UNREACHABLE_MESSAGE = 'Unable to connect to server.';

const AUTH_TOKEN_SERVICE = 'com.tizzycrm.auth.token';

const checkInternetConnection = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected === true;
  } catch {
    return false;
  }
};

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: AUTH_TOKEN_SERVICE,
      });
      return credentials ? credentials.password : null;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  async getToken(): Promise<string | null> {
    return this.getAuthToken();
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    requireAuth = true,
  ): Promise<ApiResponse<T>> {
    try {
      const hasInternet = await checkInternetConnection();

      if (!hasInternet) {
        return {
          success: false,
          error: true,
          message: OFFLINE_ERROR_MESSAGE,
        };
      }

      const token = requireAuth ? await this.getAuthToken() : null;
      const url = /^https?:\/\//.test(endpoint)
        ? endpoint
        : `${this.baseURL}${endpoint}`;

      const isFormData = body instanceof FormData;
      // fetch sets the multipart boundary itself, so Content-Type must be omitted for FormData.
      const headers: Record<string, string> = isFormData
        ? { Accept: 'application/json' }
        : { 'Content-Type': 'application/json', Accept: 'application/json' };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers,
      };

      if (
        body &&
        ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
      ) {
        config.body = isFormData ? body : JSON.stringify(body);
      }
      console.log('🔵 API REQUEST');
      console.log('URL:', url);
      console.log('Method:', method);
      console.log('Headers:', headers);
  
      if (body) {
        console.log('Body:', body);
      }
  
      console.log('---');
      const response = await fetch(url, config);
      console.log('🔵 API RESPONSE');      
      const responseData = await response.json();
      console.log('Response Data:', responseData);

      if (
        !response.ok ||
        responseData?.success === false ||
        responseData?.error
      ) {
        return {
          success: false,
          error: true,
          message:
            responseData?.message ||
            'Something went wrong. Please try again.',
          data: responseData?.errors || responseData?.data,
        };
      }

      const hasDataKey =
        responseData != null &&
        typeof responseData === 'object' &&
        Object.prototype.hasOwnProperty.call(responseData, 'data');

      return {
        success: true,
        data: hasDataKey ? responseData.data : responseData,
        message: responseData?.message,
      };
    } catch (error: unknown) {
      const hasInternet = await checkInternetConnection();

      let message = 'Something went wrong. Please try again.';

      if (!hasInternet) {
        message = OFFLINE_ERROR_MESSAGE;
      } else if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        (error.message === 'Network request failed' ||
          String(error.message).includes('Network'))
      ) {
        message = API_SERVER_UNREACHABLE_MESSAGE;
      }

      return {
        success: false,
        error: true,
        message,
      };
    }
  }

  get<T>(endpoint: string, requireAuth = true) {
    return this.request<T>('GET', endpoint, undefined, requireAuth);
  }

  post<T>(endpoint: string, body?: unknown, requireAuth = true) {
    return this.request<T>('POST', endpoint, body, requireAuth);
  }

  async saveToken(token: string): Promise<void> {
    try {
      await Keychain.setGenericPassword('authToken', token, {
        service: AUTH_TOKEN_SERVICE,
      });
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  async clearToken(): Promise<void> {
    try {
      await Keychain.resetGenericPassword({
        service: AUTH_TOKEN_SERVICE,
      });
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  }
}

export const apiClient = new ApiClient();
