import type { PageData } from '../types';
import { ProjectEntry, TechnologyList } from '../components/ProjectEntry';

export function ProjectsPage({data}: {data: PageData}) {
  const substantial = data.projects.filter(project => project.featured || project.github || project.images.length || project.videos.length);
  const other = data.projects.filter(project => !substantial.includes(project));
  return <>
    <header className="page-heading"><h1>Projects</h1><p>Interpreters, graphics, simulations, and other software.<br className="desktop-break" /> A closer look at what I’ve built and how it works.</p></header>
    <section aria-labelledby="featured-projects-heading"><h2 className="list-section-title" id="featured-projects-heading">Selected engineering & research</h2><div className="project-list">{substantial.map(project => <ProjectEntry project={project} key={project.slug} image />)}</div></section>
    {!!other.length && <section className="other-projects" aria-labelledby="other-projects-heading"><h2 id="other-projects-heading">Other explorations</h2><p className="section-note">Smaller projects in graphics, databases, and low-level programming.</p><div className="compact-projects">{other.map(project => <article key={project.slug}><h3><a href={`/projects/${project.slug}/`}>{project.title}</a></h3><TechnologyList items={project.technologies} /><p>{project.summary}</p></article>)}</div></section>}
  </>;
}
