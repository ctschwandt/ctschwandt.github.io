import { imageAttributes } from '../image-assets';
import type { Project } from '../types';
import { TextLink } from './Link';

export function TechnologyList({ items }: { items: string[] }) {
  if (!items.length) return null;
  return <ul className="technology-list" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function ProjectEntry({ project, image = false }: { project: Project; image?: boolean }) {
  const thumbnail = project.images[0];
  return <article className={`project-entry${image && thumbnail ? ' project-entry-with-image' : ''}`}>
    {image && thumbnail && <a className="project-entry-image" href={`/projects/${project.slug}/`} aria-label={`View ${project.title}`}><img {...imageAttributes(thumbnail.src)} sizes="(max-width: 700px) 100vw, 480px" alt={thumbnail.alt} loading="lazy" decoding="async" /></a>}
    <div className="project-entry-copy">
      <h3><a href={`/projects/${project.slug}/`}>{project.title}</a></h3>
      <TechnologyList items={project.technologies} />
      <p>{project.summary}</p>
      <div className="entry-links"><TextLink href={`/projects/${project.slug}/`}>Read project</TextLink>{project.github && <a href={project.github} aria-label={`${project.title} source code on GitHub`}>Source code</a>}{project.demo && <a href={project.demo}>Live demo</a>}</div>
    </div>
  </article>;
}
