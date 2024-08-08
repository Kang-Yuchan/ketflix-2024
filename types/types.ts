import { Database } from '@/types/database.types';

export type Project = Database['public']['Tables']['projects']['Row'];

export type Todo = Database['public']['Tables']['todos']['Row'];

export type User = {
  id: string;
  email: string;
};

export type TodoFilerBy = 'all' | 'checked' | 'not-checked';
