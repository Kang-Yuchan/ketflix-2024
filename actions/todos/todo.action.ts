'use server';

import { createServerSideClient } from '@/lib/supabase/server';

export const getTodos = async (userId: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .select('*')
    .is('deleted_at', null)
    .order('updated_at', {
      ascending: true,
    })
    .eq('user_id', userId);

  return result.data;
};

export const createTodos = async (userId: string, task: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .insert({
      task,
      user_id: userId,
    })
    .select('*');

  return result.data;
};

export const updateTodoIsCompleted = async (
  id: number,
  is_complete: boolean,
) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .update({
      is_complete,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();
  console.log(result);
  return result.data;
};

export const updateTodos = async (id: number, task: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .update({
      task,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();
  return result.data;
};

// todoList softDelete
export const deleteTodosSoft = async (id: number) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  return result.data;
};
