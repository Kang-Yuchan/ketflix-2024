'use client';

import useProjects from '@/hooks/useProjects';
import ProjectCard from '@/app/projects/components/project-card';
import SkeletonCard from './components/skeleteon-card';

export default function Projects() {
  const { projects, error, isLoading } = useProjects();

  if (error) return <div>Sorry..failed data fetching</div>;

  return (
    <div className="w-full flex-1">
      <section className="w-full bg-background py-12 dark:bg-[#121212] md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter text-[#121212] dark:text-white sm:text-5xl xl:text-6xl/none">
                  Projects
                </h1>
                <p className="max-w-[600px] text-[#121212] dark:text-muted-foreground md:text-xl">
                  Explore my latest projects and see what I've been working on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading && <SkeletonCard />}
              {projects?.map((prj) => <ProjectCard project={prj} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
