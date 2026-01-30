import api from './api';
import type { Task } from '../types';

export const getTasks = async () => {
  const response = await api.get<Task[]>('/v1/tasks/');
  return response.data;
};

export const createTask = async (data: Partial<Task>) => {
  const response = await api.post<Task>('/v1/tasks/', data);
  return response.data;
};

export const updateTask = async (id: number, data: Partial<Task>) => {
  const response = await api.patch<Task>(`/v1/tasks/${id}/`, data);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/v1/tasks/${id}/`);
};
