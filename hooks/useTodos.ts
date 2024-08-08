'use client';

import {
  createTodos,
  deleteTodosSoft,
  getTodos,
  updateTodoIsCompleted,
  updateTodos,
} from '@/actions/todos/todo.action';
import { Todo, TodoFilerBy } from '@/types/types';
import { useCallback, useEffect, useState } from 'react';

const useTodos = (userId = '') => {
  const [isLoading, setIsLoading] = useState(false);
  const [todoList, setTodoList] = useState<Todo[]>();
  const [filterBy, setFilterBy] = useState<TodoFilerBy>('all');

  const onGetTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const resultTodos = await getTodos(userId);

      if (resultTodos) setTodoList(resultTodos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    onGetTodos();
  }, [onGetTodos]);

  const filteredTodos = (filterBy: TodoFilerBy) => {
    switch (filterBy) {
      case 'checked':
        return todoList?.filter((todo) => todo.is_complete);
      case 'not-checked':
        return todoList?.filter((todo) => !todo.is_complete);
      default:
        return todoList;
    }
  };

  const onCreateEmptyTodos = async (userId: string) => {
    await createTodos(userId, '');
    await onGetTodos();
  };

  const onUpdateTodos = async (id: number, task: string) => {
    await updateTodos(id, task);
    await onGetTodos();
  };

  const onUpdateTodoIsCompleted = async (id: number, is_complete: boolean) => {
    await updateTodoIsCompleted(id, is_complete);
    await onGetTodos();
  };

  const onDeleteTodos = async (id: number) => {
    await deleteTodosSoft(id);
    await onGetTodos();
  };

  return {
    todos: filteredTodos(filterBy),
    isLoading,
    filterBy,
    setFilterBy,
    onCreateEmptyTodos,
    onUpdateTodos,
    onUpdateTodoIsCompleted,
    onDeleteTodos,
  };
};
export default useTodos;
