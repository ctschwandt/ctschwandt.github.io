import type { PageData, Project } from '../types';
import { ProjectMedia } from '../components/ProjectMedia';
import { TechnologyList } from '../components/ProjectEntry';
import { TextLink } from '../components/Link';
import { imageAttributes } from '../image-assets';

export function ProjectPage({ project, data }: { project: Project; data: PageData }) {
  const nextProject = data.projects.find(candidate => candidate.featured && candidate.slug !== project.slug);
  const leadImage = project.slug === 'opengl-maze-fps' ? project.images[2] ?? project.images[0] : project.images[0];
  return <>
    <a className="back-link" href="/projects/">Back to projects</a>
    <header className={`project-heading${leadImage ? ' project-heading-with-media' : ''}`}>
      <div className="project-heading-copy"><h1>{project.title}</h1><p className="project-summary">{project.summary}</p><TechnologyList items={project.technologies} />
        <div className="project-resources">{project.github && <TextLink href={project.github}>Source code on GitHub</TextLink>}{project.demo && <TextLink href={project.demo}>Live demonstration</TextLink>}{project.links.map(link => <a key={link.url} href={link.url}>{link.label}</a>)}{project.year && <span>{project.year}</span>}</div>
      </div>
      {leadImage && <figure className="case-study-lead"><a href={leadImage.src} aria-label={`Open full-size image: ${leadImage.alt}`}><img {...imageAttributes(leadImage.src)} sizes="(max-width: 700px) 100vw, 600px" alt={leadImage.alt} fetchPriority="high" decoding="async" /></a>{leadImage.caption && <figcaption>{leadImage.caption}</figcaption>}</figure>}
    </header>
    <article className="project-body prose" aria-label={`${project.title} technical description`} dangerouslySetInnerHTML={{ __html: project.html }} />
    <ProjectMedia project={project} />
    <nav className="project-bottom-nav" aria-label="More projects"><TextLink href="/projects/">All projects</TextLink>{nextProject && <a href={`/projects/${nextProject.slug}/`}>{nextProject.title}</a>}</nav>
  </>;
}
