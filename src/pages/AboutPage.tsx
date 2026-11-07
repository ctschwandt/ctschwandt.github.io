import type { PageData } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectEntry } from '../components/ProjectEntry';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { TextLink } from '../components/Link';
import { Icon } from '../components/Icon';

export function AboutPage({data}: {data: PageData}) {
  const {profile, projects} = data;
  const maze = projects.find(project => project.slug === 'opengl-maze-fps');
  const selected = projects.filter(project => ['mips-interpreter', 'quadtree-collision'].includes(project.slug));
  const research = projects.find(project => project.slug === 'underground-mining-research');
  return <>
    <section className="introduction" aria-labelledby="about-heading">
      <h1 id="about-heading">About me</h1>
      <p className="mobile-intro-summary">{profile.education.institution} · Expected {profile.education.expectedGraduation}</p>
      <div className="intro-full"><p className="intro-lead">{profile.intro[0]}</p>
      {profile.intro.slice(1, 2).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className="intro-links"><a className="button-link" href="/projects/">Explore projects<Icon name="arrow" size={16} /></a><a className="quiet-link" href={profile.github}><Icon name="github" size={17} />GitHub</a><a className="quiet-link" href="/experience/">Experience<Icon name="arrow" size={15} /></a></div>
    </section>
    <section className="selected-work" aria-label="Selected projects">
      <SectionHeading href="/projects/" linkText="All projects">Selected work</SectionHeading>
      {maze && <ProjectShowcase project={maze} priority headingLevel={3} />}
      <div className="mobile-intro-continuation">{profile.intro.slice(0, 2).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className="home-project-grid">{selected.map(project => <ProjectEntry key={project.slug} project={project} image />)}</div>
    </section>
    {research && <section className="home-research" aria-label="Research"><SectionHeading href="/experience/" linkText="View experience">Research</SectionHeading><ProjectEntry project={research} image /></section>}
    <section className="about-further" aria-label="More about me">
      <div className="personal-content"><h2>Beyond programming</h2>{profile.personal.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p>{profile.intro[2]} <a href={profile.club.url}>About the club<Icon name="arrow" size={13} /></a></p><ul className="inline-links" aria-label="Personal interests">{profile.personalLinks.map(link => <li key={link.url}><a href={link.url}>{link.label}<Icon name="arrow" size={12} /></a></li>)}</ul></div>
      <div className="setup-content"><h2>My development setup</h2><dl>{profile.setup.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl><TextLink href={profile.dotfiles}>Explore my dotfiles</TextLink></div>
    </section>
  </>;
}
