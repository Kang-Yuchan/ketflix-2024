'use client';

import { User } from '@/types/types';
import Error from 'next/error';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useUser = (): { user: User; error: Error; isLoading: boolean } => {
  const [cachedUser, setCachedUser] = useState<User | null>(null);

  const { data: user, error } = useSWR(
    '/api/projects/to-do-app/auth',
    fetcher,
    {
      fallbackData: cachedUser,
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (user && user.id) {
      setCachedUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setCachedUser(JSON.parse(storedUser));
      }
    }
  }, [user]);

  return {
    user,
    error,
    isLoading: !error && !user && !cachedUser,
  };
};

export default useUser;
