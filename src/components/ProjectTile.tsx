import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectTileProps {
  project: Project;
}

export default function ProjectTile({ project }: ProjectTileProps) {
  const linkHref = project.demoUrl || '#';
  
  const tileContent = (
    <div className="group relative bg-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Title overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <h3 className="text-xl font-bold text-white text-center px-4">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );

  // If it's an internal route (starts with /), use Next.js Link
  if (project.demoUrl && project.demoUrl.startsWith('/')) {
    return (
      <Link href={linkHref} className="block cursor-pointer">
        {tileContent}
      </Link>
    );
  }
  
  // If it's an external URL, use regular anchor tag
  if (project.demoUrl) {
    return (
      <a href={linkHref} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
        {tileContent}
      </a>
    );
  }
  
  // If no demo URL, return non-clickable tile
  return tileContent;
}
