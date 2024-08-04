import { Badge } from '@/components/ui/badge';
import { Project } from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div
      key={project.id}
      className="group relative overflow-hidden rounded-lg bg-background shadow-lg dark:bg-card"
    >
      {project.is_in_website ? (
        <Link
          href={project.link}
          className="absolute inset-0 z-10"
          prefetch={false}
        >
          <span className="sr-only">View project</span>
        </Link>
      ) : (
        <a
          href={project.link}
          className="absolute inset-0 z-10"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">View project</span>
        </a>
      )}
      <div>
        <Image
          src={project.image_url}
          alt={project.title}
          width={400}
          height={300}
          className="h-48 w-full object-cover transition-opacity group-hover:opacity-80"
          style={{ aspectRatio: '400/300', objectFit: 'cover' }}
        />
      </div>
      <div className="p-4 text-foreground">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-muted-foreground">{project.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {project.badges.map((badge: string, i: number) => (
            <Badge key={i} variant="default">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
