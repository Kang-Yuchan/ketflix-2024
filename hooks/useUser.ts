'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useUser = () => {
  const [cachedUser, setCachedUser] = useState(null);

  const { data: user, error } = useSWR('/api/projects/to-do-app', fetcher, {
    fallbackData: cachedUser,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (user) {
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
