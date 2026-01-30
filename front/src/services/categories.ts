import api from './api';
import type { Category } from '../types';

export const getCategories = async () => {
  const response = await api.get<Category[]>('/v1/categories/');
  return response.data;
};

export const createCategory = async (title: string) => {
  const response = await api.post<Category>('/v1/categories/', { title });
  return response.data;
};

export const deleteCategory = async (id: number) => {
  await api.delete(`/v1/categories/${id}/`);
};
