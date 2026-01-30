export interface User {
  id: number;
  email: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  category: number | null;
  is_completed: boolean;
  color: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
