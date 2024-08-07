'use server';

import { createServerSideClient } from '@/lib/supabase/server';

export const getTodos = async (userId: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .select('*')
    .is('deleted_at', null)
    .eq('user_id', userId);

  return result.data;
};

export const createTodos = async (task: string) => {
  const supabase = createServerSideClient();
  const result = await supabase
    .from('todos')
    .insert({
      task,
    })
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
