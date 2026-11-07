import { renderToString } from 'react-dom/server';
import { App } from './App';
import { loadContent } from './content-loader';
import type { PageData, PageKind } from './types';

export const siteUrl = 'https://ctschwandt.github.io';
export function getRoutes(): string[] {
  return ['/', '/projects/', '/experience/', '/skills/', ...loadContent().projects.map((p) => `/projects/${p.slug}/`), '/about/', '/about.html', '/404.html'];
}
const escape = (value: string) => value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
export function renderPage(requestPath: string) {
  const content = loadContent();
  const normalized = requestPath.replace(/index\.html$/, '');
  const isAbout = normalized === '/about/' || normalized === '/about.html';
  const path = isAbout ? '/' : normalized;
  const project = content.projects.find((p) => path === `/projects/${p.slug}/`);
  const kind: PageKind = path === '/' ? 'about' : path === '/projects/' ? 'projects' : path === '/experience/' ? 'experience' : path === '/skills/' ? 'skills' : project ? 'project' : 'not-found';
  const titles = { about: content.profile.name, projects: 'Projects', experience: 'Experience', skills: 'Skills', 'not-found': 'Page not found', project: project?.title ?? 'Project' };
  const title = kind === 'about' ? `${content.profile.name} — Computer Science & Mathematics` : `${titles[kind]} — ${content.profile.name}`;
  const descriptions = {
    about: `${content.profile.name}, Computer Science and Mathematics undergraduate at Columbia College. Systems programming, compilers, algorithms, and computer graphics.`,
    projects: 'Engineering projects in C++, graphics, compilers, interpreters, spatial algorithms, and computational research by Cole Schwandt.',
    experience: 'Research, tutoring, and employment experience of Cole Schwandt, including an NSF REU at Missouri University of Science & Technology.',
    skills: 'Programming languages, systems tools, graphics libraries, and research frameworks used by Cole Schwandt.',
    project: project?.summary ?? '', 'not-found': 'This page could not be found. Explore Cole Schwandt’s projects, experience, and technical background.',
  };
  // Showcase panels use the same authored implementation details as project pages.
  const data: PageData = { ...content, kind, path, title, description: descriptions[kind], ...(project ? { project } : {}) };
  const canonical = kind === 'not-found' ? `${siteUrl}/404.html` : `${siteUrl}${path}`;
  const head = `<title>${escape(title)}</title>
<meta name="description" content="${escape(data.description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${escape(content.profile.name)}" />
<meta property="og:title" content="${escape(title)}" />
<meta property="og:description" content="${escape(data.description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${siteUrl}/social-preview.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Cole Schwandt — Computer Science and Mathematics" />
<meta name="twitter:card" content="summary_large_image" />
${kind === 'not-found' ? '<meta name="robots" content="noindex" />' : ''}`;
  return { data, head, html: renderToString(<App data={data} />), status: kind === 'not-found' ? 404 : 200 };
}
export function fillTemplate(template: string, result: ReturnType<typeof renderPage>) {
  return template.replace('<!--head-tags-->', () => result.head).replace('<!--app-html-->', () => result.html)
    .replace('<!--page-data-->', () => JSON.stringify(result.data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'));
}
