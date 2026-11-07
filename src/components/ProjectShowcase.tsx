import { useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { imageAttributes } from '../image-assets';
import type { Project } from '../types';
import { TechnologyList } from './ProjectEntry';
import { TextLink } from './Link';

function PlayIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 10 7-10 7V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>;
}

/** A gallery of actual project evidence, progressively enhanced from image links. */
export function ProjectStage({ project, priority = false }: { project: Project; priority?: boolean }) {
  const defaultImage = project.slug === 'opengl-maze-fps' ? Math.min(2, project.images.length - 1) : 0;
  const [selection, setSelection] = useState({ kind: project.images.length ? 'image' : 'video', index: defaultImage < 0 ? 0 : defaultImage });
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const id = useId();
  useEffect(() => setReady(true), []);
  const image = selection.kind === 'image' ? project.images[selection.index] : undefined;
  const video = selection.kind === 'video' ? project.videos[selection.index] : undefined;
  const poster = project.images[0] ? imageAttributes(project.images[0].src).src : video?.poster;
  const change = (kind: string, index: number) => { setSelection({ kind, index }); setFailed(false); };
  const enlarge = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!dialog.current?.showModal) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setEnlarged(true);
    dialog.current.showModal();
  };
  if (!project.images.length && !project.videos.length) return null;
  return <div className="project-stage" aria-label={`${project.title} media gallery`}>
    <div className={`project-stage-view${selection.kind === 'video' ? ' is-video' : ''}`}>
      {image && <a href={image.src} onClick={enlarge} aria-label={`Enlarge: ${image.alt}`}><img {...imageAttributes(image.src)} alt={image.alt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 70vw, 650px" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" /></a>}
      {video && !failed && <video key={video.src} controls playsInline preload="none" poster={poster} aria-label={video.caption} onError={() => setFailed(true)}><source src={video.src} type="video/mp4" onError={() => setFailed(true)} /><a href={video.src}>Open the video demonstration</a></video>}
      {video && failed && <p className="media-error" role="status">This demonstration could not be loaded. <a href={video.src}>Open the original video file</a> to try it directly.</p>}
    </div>
    <div className="project-stage-toolbar">
      <span id={`${id}-label`}>{image ? image.caption || image.alt : video?.caption}</span>
      {image && <span className="stage-hint">Select image to enlarge</span>}
      {video && <a href={video.src}>Open video file</a>}
    </div>
    {(project.images.length + project.videos.length > 1) && <div className="project-stage-thumbnails" role="group" aria-label={`Choose media for ${project.title}`}>
      {project.images.map((item, index) => <a key={item.src} href={item.src} className="stage-thumbnail" aria-current={selection.kind === 'image' && selection.index === index ? 'true' : undefined} aria-label={`Show screenshot ${index + 1}: ${item.alt}`} onClick={event => { event.preventDefault(); change('image', index); }}><img {...imageAttributes(item.src)} sizes="72px" alt="" loading="lazy" /><span>{index + 1}</span></a>)}
      {project.videos.map((item, index) => <button key={item.src} className="stage-thumbnail video-thumbnail" type="button" disabled={!ready} aria-pressed={selection.kind === 'video' && selection.index === index} onClick={() => change('video', index)} aria-label={`Show video ${index + 1}: ${item.caption}`}><PlayIcon /><span>Demo {index + 1}</span></button>)}
    </div>}
    <noscript><ul className="no-script-media">{project.videos.map(item => <li key={item.src}><a href={item.src}>{item.caption}</a></li>)}</ul></noscript>
    <dialog ref={dialog} className="image-dialog" aria-label={`Enlarged screenshot of ${project.title}`} onClose={() => { setEnlarged(false); opener.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="dialog-content"><button type="button" className="dialog-close" autoFocus onClick={() => dialog.current?.close()}>Close image<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" /></svg></button>{enlarged && image && <img src={image.src} alt={image.alt} />}</div>
    </dialog>
  </div>;
}

export function ProjectShowcase({ project, priority = false, headingLevel = 2 }: { project: Project; priority?: boolean; headingLevel?: 2 | 3 }) {
  const Title = headingLevel === 2 ? 'h2' : 'h3';
  const bullets = [...project.html.matchAll(/<li>([\s\S]*?)<\/li>/g)].slice(0, 3).map(match => match[1]);
  const hasMedia = Boolean(project.images.length || project.videos.length);
  return <article className={`project-showcase${hasMedia ? '' : ' project-showcase-text'}`} id={project.slug}>
    <header className="showcase-heading"><Title><a href={`/projects/${project.slug}/`}>{project.title}</a></Title><TechnologyList items={project.technologies} /></header>
    {hasMedia && <div className="showcase-media"><ProjectStage project={project} priority={priority} /></div>}
    <div className="showcase-copy">
      <p className="showcase-summary">{project.summary}</p>
      {!!bullets.length && <ul className="implementation-highlights">{bullets.map((bullet, index) => <li key={index} dangerouslySetInnerHTML={{ __html: bullet }} />)}</ul>}
      <div className="showcase-links"><TextLink href={`/projects/${project.slug}/`}>Explore project</TextLink>{project.github && <a href={project.github} className="source-link" aria-label={`${project.title} source code on GitHub`}>Source code<svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10" stroke="currentColor" strokeWidth="1.5" /></svg></a>}{project.demo && <a href={project.demo}>Live demo</a>}</div>
      {!!project.links.length && <div className="showcase-extra-links">{project.links.map(link => <a key={link.url} href={link.url}>{link.label}</a>)}</div>}
    </div>
  </article>;
}
