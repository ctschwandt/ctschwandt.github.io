import { ArrowIcon, TextLink } from '../components/Link';
import type { PageData, SkillGroup } from '../types';
import '../styles/secondary.css';

export function SkillsPage({ data }: { data: PageData }) {
  return <div className="capabilities-page">
    <header className="page-heading"><h1>Skills</h1><p>Languages, tools, and libraries I use in projects and research.</p></header>
    <div className="capability-grid">{data.skills.map((group, index) => <SkillGroupEntry group={group} key={group.title} data={data} prominent={index === 0} />)}</div>
    <section className="capability-interests" aria-labelledby="interests-heading">
      <div><h2 id="interests-heading">Areas of interest</h2><p>The subjects I keep coming back to.</p></div>
      <ul>{data.profile.interests.map(interest => <li key={interest}>{interest}</li>)}</ul>
    </section>
    <div className="capability-project-link"><TextLink href="/projects/">Explore the projects behind the skills</TextLink></div>
  </div>;
}

function SkillGroupEntry({ group, data, prominent }: { group: SkillGroup; data: PageData; prominent: boolean }) {
  const normalizedItems = new Set(group.items.map(item => item.toLowerCase()));
  const examples = data.projects.filter(project => project.technologies.some(technology => normalizedItems.has(technology.toLowerCase()))).slice(0, 2);
  const headingId = `skill-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return <section className={`capability-group${prominent ? ' capability-group-primary' : ''}`} aria-labelledby={headingId}>
    <h2 id={headingId}>{group.title}</h2>
    <ul className="capability-items">{group.items.map(item => <li key={item}>{item}</li>)}</ul>
    {examples.length > 0 && <div className="capability-evidence"><p>Used in</p><ul>{examples.map(project => <li key={project.slug}><a href={`/projects/${project.slug}/`}>{project.title}<ArrowIcon /></a></li>)}</ul></div>}
  </section>;
}
