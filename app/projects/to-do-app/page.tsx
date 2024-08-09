'use client';

import { ReactNode } from 'react';
import { CheckIcon } from '@/components/icons/check-icon';
import { CrossIcon } from '@/components/icons/cross-icon';
import { FilterIcon } from '@/components/icons/filter-icon';
import { ListIcon } from '@/components/icons/list-icon';
import { PlusIcon } from '@/components/icons/plus-icon';
import { Button } from '@/components/ui/button';
import useTodos from '@/hooks/useTodos';
import useUser from '@/hooks/useUser';
import { supabase } from '@/lib/supabase/client';
import TodoCard from './components/TodoCard';
import { TodoFilerBy } from '@/types/types';
import LoginForm from './components/LoginForm';

const filtered_buttons: { filterBy: TodoFilerBy; icon: ReactNode }[] = [
  {
    filterBy: 'checked',
    icon: <CheckIcon className="h-4 w-4" />,
  },
  {
    filterBy: 'not-checked',
    icon: <CrossIcon className="h-4 w-4" />,
  },
  {
    filterBy: 'all',
    icon: <ListIcon className="h-4 w-4" />,
  },
];

const TodoApp = () => {
  const { user, error, isLoading } = useUser();
  const {
    todos,
    filterBy,
    setFilterBy,
    onCreateEmptyTodos,
    onUpdateTodos,
    onUpdateTodoIsCompleted,
    onDeleteTodos,
    isLoading: isTodosLoading,
  } = useTodos(user ? user.id : '');

  if (isLoading || isTodosLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load user data</div>;
  }

  const handleOAuthLogin = async (provider: 'github' | 'google') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: process.env.NEXT_PUBLIC_TODO_AUTH_REDIRECT_TO,
      },
    });
    if (error) console.error('Error logging in with OAuth:', error);
  };

  const handleOAuthLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error log out:', error);
    window.location.reload();
  };

  return (
    <div className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Todo App</h1>
              {user && user.email && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => onCreateEmptyTodos(user.id)}
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Todo
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <FilterIcon className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">Filter by:</span>
                </div>
                <div className="flex items-center gap-2">
                  {filtered_buttons.map((btn) => (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full ${filterBy === btn.filterBy ? 'pointer-events-none bg-accent' : ''}`}
                      onClick={() => setFilterBy(btn.filterBy)}
                    >
                      {btn.icon}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {todos?.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    isTextMode={todo.task.length > 0 ? true : false}
                    onChangeCheck={onUpdateTodoIsCompleted}
                    onClickSendTask={onUpdateTodos}
                    onClickDelete={onDeleteTodos}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <LoginForm
              user={user}
              handleOAuthLogin={handleOAuthLogin}
              handleOAuthLogout={handleOAuthLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoApp;
