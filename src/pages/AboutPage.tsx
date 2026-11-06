import { imageAttributes } from '../image-assets';
import type { PageData } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectEntry } from '../components/ProjectEntry';
import { TextLink } from '../components/Link';

export function AboutPage({data}: {data: PageData}) {
  const {profile, projects} = data;
  const maze = projects.find(project => /maze/i.test(project.title));
  const leadImage = maze?.images[2] ?? maze?.images[0];
  const research = projects.find(project => /underground|mining|nsf reu/i.test(project.title));
  const selected = projects.filter(project => project.featured && project.slug !== maze?.slug && project.slug !== research?.slug).slice(0, 3);
  return <>
    <section className="introduction" aria-labelledby="about-heading">
      <div className="introduction-copy">
        <h1 id="about-heading">{profile.name}</h1>
        <p className="academic-line">{profile.education.degree}<br />{profile.education.institution} · Expected {profile.education.expectedGraduation}</p>
        <div className="intro-prose">{profile.intro.slice(1, 2).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="intro-links"><TextLink href="/projects/">Explore my projects</TextLink><a href={profile.github}>GitHub</a><a href="/experience/">Experience</a></div>
      </div>
      {maze && leadImage && <figure className="featured-figure">
        <a href={`/projects/${maze.slug}/`} aria-label={`Explore ${maze.title}`}><img {...imageAttributes(leadImage.src)} sizes="(max-width: 720px) 100vw, 480px" alt={leadImage.alt} fetchPriority="high" decoding="async" /></a>
        <figcaption><a href={`/projects/${maze.slug}/`}>{maze.title}</a><span>{maze.technologies.join(' / ')}</span></figcaption>
      </figure>}
    </section>
    <section className="selected-work" aria-label="Selected projects">
      <SectionHeading href="/projects/" linkText="All projects">Selected work</SectionHeading>
      <div className="project-list">{selected.map(project => <ProjectEntry key={project.slug} project={project} />)}</div>
    </section>
    {research && <section className="research-summary" aria-labelledby="research-heading">
      <div><h2 id="research-heading">Research</h2><p className="section-note">Missouri S&T · NSF REU · Summer 2025</p></div>
      <div><h3><a href={`/projects/${research.slug}/`}>{research.title}</a></h3><p>{research.summary}</p><TextLink href={`/projects/${research.slug}/`}>Read about the research</TextLink></div>
    </section>}
    <section className="about-further" aria-label="More about me">
      <div className="personal-content">
        <h2>Beyond the code</h2>
        {profile.personal.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <p>I tutor computer science and mathematics at {profile.education.institution}, where I also serve as {profile.club.role} of the <a href={profile.club.url}>{profile.club.label}</a>.</p>
        <ul className="inline-links" aria-label="Personal interests">{profile.personalLinks.map(link => <li key={link.url}><a href={link.url}>{link.label}</a></li>)}</ul>
      </div>
      <div className="setup-content"><h2>At my desk</h2><dl>{profile.setup.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><TextLink href={profile.dotfiles}>My dotfiles</TextLink></div>
    </section>
  </>;
}
