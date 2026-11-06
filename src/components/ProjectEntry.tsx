import { imageAttributes } from '../image-assets';
import type { Project } from '../types';
import { TextLink } from './Link';

export function TechnologyList({items}: {items: string[]}) {
  return <ul className="technology-list" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function ProjectEntry({ project, image = false }: { project: Project; image?: boolean }) {
  return <article className={`project-entry${image && project.images.length ? ' project-entry-with-image' : ''}`}>
    <div className="project-entry-copy">
      <h3><a href={`/projects/${project.slug}/`}>{project.title}</a></h3>
      <TechnologyList items={project.technologies} />
      <p>{project.summary}</p>
      <div className="entry-links"><TextLink href={`/projects/${project.slug}/`}>Read project</TextLink>{project.github && <a href={project.github} aria-label={`${project.title} source code on GitHub`}>Source code</a>}{project.demo && <a href={project.demo}>Live demo</a>}</div>
    </div>
    {image && project.images[0] && <a className="project-entry-image" href={`/projects/${project.slug}/`} aria-label={`View ${project.title}`}><img {...imageAttributes(project.images[0].src)} sizes="(max-width: 720px) 100vw, 260px" alt={project.images[0].alt} loading="lazy" decoding="async" /></a>}
  </article>;
}
