import { imageAttributes } from '../image-assets';
import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Project } from '../types';

export function ProjectMedia({project}: {project: Project}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLAnchorElement | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const selectedImage = selected === null ? undefined : project.images[selected];
  const localPoster = project.images.find(image => image.src.startsWith('/'));
  const videoFailed = (src: string) => setFailedVideos(previous => ({ ...previous, [src]: true }));
  function enlarge(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (!dialog.current?.showModal) return;
    event.preventDefault();
    opener.current = event.currentTarget;
    setSelected(index);
    dialog.current.showModal();
  }
  function close() { dialog.current?.close(); }
  if (!project.images.length && !project.videos.length) return null;
  return <section className="project-media" aria-labelledby={`media-heading-${project.slug}`}>
    <h2 id={`media-heading-${project.slug}`}>Screenshots & demonstrations</h2>
    {!!project.images.length && <>
      <p className="section-note">Select a screenshot to view it at full size.</p>
      <div className="image-gallery">{project.images.map((image, index) => <figure key={image.src}>
        <a href={image.src} onClick={event => enlarge(event, index)} aria-label={`Enlarge: ${image.alt}`}><img {...imageAttributes(image.src)} sizes="(max-width: 720px) 100vw, 550px" alt={image.alt} loading="lazy" decoding="async" /></a>
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>)}</div>
      <dialog ref={dialog} className="image-dialog" aria-label="Enlarged project screenshot" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
        <div className="dialog-content"><button type="button" className="dialog-close" onClick={close} autoFocus>Close image<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" /></svg></button>
          {selectedImage && <figure><img src={selectedImage.src} alt={selectedImage.alt} width="1600" height="1000" />{selectedImage.caption && <figcaption>{selectedImage.caption}</figcaption>}</figure>}
        </div>
      </dialog>
    </>}
    {!!project.videos.length && <div className="video-gallery">{project.videos.map((video, index) => <figure key={video.src}>
      {!failedVideos[video.src] && <video controls preload="none" playsInline poster={localPoster ? imageAttributes(localPoster.src).src : video.poster} onError={() => videoFailed(video.src)} aria-labelledby={`video-caption-${project.slug}-${index}`} width="1280" height="720"><source src={video.src} type="video/mp4" onError={() => videoFailed(video.src)} /><a href={video.src}>Open the video demonstration</a></video>}
      {failedVideos[video.src] && <p className="media-error" role="status">This demonstration could not be loaded. <a href={video.src}>Open the original video file</a> to try it directly.</p>}
      <figcaption id={`video-caption-${project.slug}-${index}`}>{video.caption} <a href={video.src}>Open video file</a></figcaption>
    </figure>)}</div>}
  </section>;
}
