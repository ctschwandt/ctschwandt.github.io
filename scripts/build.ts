import { build } from 'vite';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.ssr', emptyOutDir: true, manifest: false } });
const renderer = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
const routes: string[] = renderer.getRoutes();
for (const route of routes) {
  const target = path.join('dist', route.endsWith('.html') ? route : `${route}index.html`);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, renderer.fillTemplate(template, renderer.renderPage(route)));
}
const canonicalRoutes = routes.filter((route) => !['/about/', '/about.html', '/404.html'].includes(route));
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${canonicalRoutes.map((route) => `<url><loc>${renderer.siteUrl}${route}</loc></url>`).join('')}</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${renderer.siteUrl}/sitemap.xml\n`);
await writeFile('dist/.nojekyll', '');
await rm('.ssr', { recursive: true, force: true });
console.log(`Generated ${routes.length} independently accessible HTML pages.`);
