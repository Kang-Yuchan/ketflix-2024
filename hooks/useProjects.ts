'use client';

import useSWR from 'swr';

export type Project = {
  id: number;
  created_at: string;
  image_url: string;
  title: string;
  description: string;
  is_in_website: boolean;
  link: string;
  badges: string[];
};

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json() as Promise<Project[]>);

const useProjects = () => {
  const { data: projects, error } = useSWR('/api/projects', fetcher);
  return {
    projects,
    error,
  };
};
export default useProjects;
