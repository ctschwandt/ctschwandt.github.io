import { imageAttributes } from '../image-assets';
import type { PageData, Experience } from '../types';

export function ExperienceEntry({entry}: {entry: Experience}) {
  return <article className="experience-entry" id={entry.id}>
    <div className="experience-dates"><span>{entry.start}</span><span>– {entry.end}</span></div>
    <div className="experience-copy"><h2>{entry.role}</h2><p className="experience-organization">{entry.organization}{entry.location && <span> · {entry.location}</span>}</p><p>{entry.summary}</p><ul>{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div>
    {entry.image && <figure className="experience-image"><img {...imageAttributes(entry.image)} sizes="180px" alt={`${entry.organization} — ${entry.role}`} loading="lazy" decoding="async" /></figure>}
  </article>;
}

export function ExperiencePage({data}: {data: PageData}) {
  const education = data.profile.education;
  return <>
    <header className="page-heading"><h1>Experience</h1><p>Research, teaching, and work.</p></header>
    <section className="experience-list" aria-label="Work and research experience">{data.experience.map(entry => <ExperienceEntry entry={entry} key={entry.id} />)}</section>
    <section className="education-section" aria-labelledby="education-heading"><h2 id="education-heading">Education</h2><div className="education-row"><p>{education.start} – {education.end}</p><div><h3>{education.institution}</h3><p>{education.degree}</p><p className="section-note">Expected graduation: {education.expectedGraduation}</p></div></div></section>
  </>;
}
