import { TextLink } from '../components/Link';
import { imageAttributes } from '../image-assets';
import type { PageData, Experience } from '../types';
import '../styles/secondary.css';

export function ExperienceEntry({ entry }: { entry: Experience }) {
  return <article className="career-entry" id={entry.id} aria-labelledby={`${entry.id}-heading`}>
    <div className="career-dates">
      <span>{entry.start}</span>
      <span className={entry.end === 'Present' ? 'career-current' : undefined}>{entry.end === 'Present' ? 'Present' : `— ${entry.end}`}</span>
    </div>
    <div className="career-content">
      <header className="career-header">
        <div>
          <h2 id={`${entry.id}-heading`}>{entry.role}</h2>
          <p className="career-organization">{entry.organization}</p>
          {entry.location && <p className="career-location">{entry.location}</p>}
        </div>
        {entry.image && <figure className="career-image">
          <img {...imageAttributes(entry.image)} sizes="(max-width: 480px) 88px, 160px" alt={`${entry.organization} — ${entry.role}`} loading="lazy" decoding="async" />
        </figure>}
      </header>
      <p className="career-summary">{entry.summary}</p>
      <ul className="career-responsibilities">{entry.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
      {entry.id === 'nsf-reu' && <div className="career-project-link"><TextLink href="/projects/underground-mining-research/">Explore the research project</TextLink></div>}
    </div>
  </article>;
}

export function ExperiencePage({ data }: { data: PageData }) {
  const education = data.profile.education;

  return <div className="career-page">
    <header className="page-heading"><h1>Experience</h1><p>Research, teaching, and the work along the way.</p></header>
    <section aria-label="Work and research experience">
      <ol className="career-timeline">{data.experience.map(entry => <li key={entry.id}><ExperienceEntry entry={entry} /></li>)}</ol>
    </section>
    <section className="career-education" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <div className="career-education-content">
        <div><h3>{education.institution}</h3><p>{education.degree}</p></div>
        <div className="career-education-dates"><p>{education.start} — {education.end}</p><p>Expected graduation <strong>{education.expectedGraduation}</strong></p></div>
      </div>
    </section>
  </div>;
}
