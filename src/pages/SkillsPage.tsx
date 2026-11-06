import type { PageData, SkillGroup } from '../types';

export function SkillsPage({data}: {data: PageData}) {
  return <>
    <header className="page-heading"><h1>Skills</h1><p>Languages, tools, and libraries I’ve used in projects and research.</p></header>
    <div className="skills-list">{data.skills.map(group => <SkillGroupEntry group={group} key={group.title} data={data} />)}</div>
    <section className="interests-section" aria-labelledby="interests-heading"><h2 id="interests-heading">Areas of interest</h2><ul className="interest-list">{data.profile.interests.map(interest => <li key={interest}>{interest}</li>)}</ul><p>See the <a href="/projects/">project index</a> for implementations and source code.</p></section>
  </>;
}

function SkillGroupEntry({group, data}: {group: SkillGroup; data: PageData}) {
  const normalizedItems = group.items.map(item => item.toLowerCase());
  const examples = data.projects.filter(project => project.featured && project.technologies.some(technology => normalizedItems.some(item => item.includes(technology.toLowerCase()) || technology.toLowerCase().includes(item)))).slice(0, 2);
  return <section className="skill-group"><h2>{group.title}</h2><div><ul className="skill-items">{group.items.map(item => <li key={item}>{item}</li>)}</ul>{!!examples.length && <p className="skill-examples">In practice: {examples.map((project, index) => <span key={project.slug}>{index > 0 && ', '}<a href={`/projects/${project.slug}/`}>{project.title}</a></span>)}</p>}</div></section>;
}
