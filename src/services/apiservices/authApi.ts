import { apiClient } from './api';

export type CrmUser = {
  id: number;
  name: string;
  email: string;
  mobile?: string;
  role?: string;
  status?: string;
  last_login_at?: string;
  created_at?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  user: CrmUser;
  token: string;
  token_type: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponseData>('/auth/login', data, false),

  forgotPassword: (data: ForgotPasswordRequest) =>
    apiClient.post<null>('/auth/forgot-password', data, false),

  resetPassword: (data: ResetPasswordRequest) =>
    apiClient.post<null>('/auth/reset-password', data, false),

  logout: () => apiClient.post<null>('/auth/logout'),

  getProfile: () => apiClient.get<CrmUser>('/auth/profile'),
};
