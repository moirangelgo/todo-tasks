import api from './api';
import type { AuthResponse, RegisterResponse } from '../types';

export const login = async (email: string, password: string):Promise<string> => {
  const response = await api.post<AuthResponse>('/v1/auth/login/', { username: email, password });
  return response.data.token;
};

export const register = async (email: string, password: string):Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/v1/auth/register/', { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
