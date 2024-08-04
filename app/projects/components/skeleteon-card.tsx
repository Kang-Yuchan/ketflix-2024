import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-background shadow-lg dark:bg-card">
      <div className="absolute inset-0 z-10"></div>
      <div>
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="p-4 pt-5 text-foreground">
        <Skeleton className="mb-3 h-6 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-5/6" />
        <Skeleton className="h-4 w-11/12" />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-xl" />
          <Skeleton className="h-6 w-16 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
