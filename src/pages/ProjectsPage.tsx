import type { PageData } from '../types';
import { TechnologyList } from '../components/ProjectEntry';
import { ProjectShowcase } from '../components/ProjectShowcase';

export function ProjectsPage({ data }: { data: PageData }) {
  const substantial = data.projects.filter(project => project.featured || project.github || project.images.length || project.videos.length);
  // Put software demonstrations first; the REU remains a full, substantial project.
  const ordered = [...substantial].sort((a, b) => (a.slug === 'underground-mining-research' ? 1 : 0) - (b.slug === 'underground-mining-research' ? 1 : 0));
  const other = data.projects.filter(project => !substantial.includes(project));
  return <>
    <header className="page-heading"><h1>Projects</h1><p>Systems, languages, and software you can see in action. Explore the implementations, watch the demonstrations, or go straight to the source.</p></header>
    <section className="project-showcases" aria-label="Engineering and research projects">{ordered.map((project, index) => <ProjectShowcase project={project} priority={index === 0} key={project.slug} />)}</section>
    {!!other.length && <section className="other-projects" aria-labelledby="other-projects-heading"><h2 id="other-projects-heading">Other explorations</h2><p className="section-note">More work in graphics, databases, and low-level programming.</p><div className="compact-projects">{other.map(project => <article key={project.slug}><h3><a href={`/projects/${project.slug}/`}>{project.title}</a></h3><TechnologyList items={project.technologies} /><p>{project.summary}</p><a className="compact-project-link" href={`/projects/${project.slug}/`}>Project details</a></article>)}</div></section>}
  </>;
}
