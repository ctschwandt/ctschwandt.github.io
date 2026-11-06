import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

/** Check the deployed artifact, including routes reached without client JavaScript. */
const root = path.resolve('dist');
const origin = 'https://ctschwandt.github.io';
const errors: string[] = [];
const fail = (file: string, message: string) => errors.push(`${path.relative(root, file)}: ${message}`);

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function decode(value: string): string {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity: string) => {
    if (entity[0] === '#') {
      const hexadecimal = entity[1]?.toLowerCase() === 'x';
      const codepoint = Number.parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      return codepoint <= 0x10ffff ? String.fromCodePoint(codepoint) : '\uFFFD';
    }
    return ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' } as Record<string, string>)[entity.toLowerCase()] ?? entity;
  });
}

interface Tag { name: string; attrs: Record<string, string> }
function tags(html: string): Tag[] {
  // The input is our generated HTML, not arbitrary browser-repaired markup. Keep
  // quoted attributes intact so URLs, JSON and comparison symbols stay intact.
  return [...html.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)].map((match) => {
    const attrs: Record<string, string> = {};
    for (const attribute of match[2].matchAll(/([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
      attrs[attribute[1].toLowerCase()] = decode(attribute[2] ?? attribute[3] ?? attribute[4] ?? '');
    }
    return { name: match[1].toLowerCase(), attrs };
  });
}

assert(existsSync(root), 'dist/ is missing. Run the production build before check:site.');
const files = walk(root);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const documents = new Map(htmlFiles.map((file) => {
  const html = readFileSync(file, 'utf8');
  const elements = tags(html);
  return [file, { html, elements, ids: new Set(elements.flatMap(({ attrs }) => attrs.id ? [attrs.id] : [])) }];
}));

const required = ['index.html', 'projects/index.html', 'experience/index.html', 'skills/index.html', '404.html', 'about/index.html', 'about.html'];
for (const file of required) {
  if (!documents.has(path.join(root, file))) fail(path.join(root, file), 'required independently accessible HTML route is missing');
}

const projectSlugs = readdirSync('src/content/projects').filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -3)).sort();
assert(projectSlugs.length > 0, 'No Markdown projects were found.');
const generatedSlugs = htmlFiles.map((file) => path.relative(root, file).replaceAll(path.sep, '/'))
  .flatMap((file) => /^projects\/([^/]+)\/index\.html$/.exec(file)?.[1] ?? []).sort();
if (JSON.stringify(projectSlugs) !== JSON.stringify(generatedSlugs)) {
  errors.push(`Project routes differ from Markdown files. Expected ${projectSlugs.join(', ')}; found ${generatedSlugs.join(', ')}.`);
}

// These routes belong to the inherited sample site, not Cole's portfolio.
const templateRoutes = /^(?:publications|talks|teaching|portfolio|year-archive|category-archive|tag-archive|collection-archive|markdown|talkmap|cv|cv-json)(?:\/|\.html$)/;
for (const file of htmlFiles) {
  if (templateRoutes.test(path.relative(root, file).replaceAll(path.sep, '/'))) fail(file, 'inherited sample route was published');
}

let localReferences = 0;
let externalReferences = 0;
function checkReference(file: string, reference: string): void {
  if (!reference || /^(?:mailto:|tel:|data:|blob:)/i.test(reference)) return;
  if (/^javascript:/i.test(reference)) { fail(file, `unsafe URL: ${reference}`); return; }
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const pagePath = relative.endsWith('index.html') ? relative.slice(0, -10) : relative;
  let url: URL;
  try { url = new URL(reference, `${origin}/${pagePath}`); }
  catch { fail(file, `invalid URL: ${reference}`); return; }
  if (url.origin !== origin) { externalReferences++; return; }
  localReferences++;
  let pathname: string;
  try { pathname = decodeURIComponent(url.pathname); }
  catch { fail(file, `invalid URL encoding: ${reference}`); return; }
  let target = path.resolve(root, `.${pathname}`);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) { fail(file, `URL escapes output: ${reference}`); return; }
  if (existsSync(target) && statSync(target).isDirectory()) target = path.join(target, 'index.html');
  if (!existsSync(target) || !statSync(target).isFile()) { fail(file, `missing internal target: ${reference}`); return; }
  if (url.hash && documents.has(target)) {
    let id: string;
    try { id = decodeURIComponent(url.hash.slice(1)); }
    catch { fail(file, `invalid fragment encoding: ${reference}`); return; }
    if (id && !documents.get(target)!.ids.has(id)) fail(file, `missing fragment: ${reference}`);
  }
}

for (const [file, { html, elements }] of documents) {
  const alias = ['about.html', 'about/index.html'].includes(path.relative(root, file).replaceAll(path.sep, '/'));
  const meta = (name: string) => elements.find(({ name: tag, attrs }) => tag === 'meta' && (attrs.name === name || attrs.property === name))?.attrs.content;
  const title = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title || !decode(title).includes('Cole Schwandt')) fail(file, 'missing descriptive page title containing Cole Schwandt');
  for (const name of ['description', 'og:title', 'og:description', 'og:url', 'og:image']) {
    if (!meta(name)?.trim()) fail(file, `missing ${name} metadata`);
  }
  const canonical = elements.find(({ name, attrs }) => name === 'link' && attrs.rel === 'canonical')?.attrs.href;
  if (!canonical?.startsWith(`${origin}/`)) fail(file, 'missing absolute production canonical URL');
  if (canonical && meta('og:url') !== canonical) fail(file, 'Open Graph URL differs from canonical URL');
  if (meta('og:image')) checkReference(file, meta('og:image')!);
  if (!elements.some(({ name, attrs }) => name === 'html' && attrs.lang?.startsWith('en'))) fail(file, 'missing document language');
  if (!alias) {
    if (elements.filter(({ name }) => name === 'h1').length !== 1) fail(file, 'expected one primary h1');
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    const text = main?.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() ?? '';
    if (text.length < 40) fail(file, 'main content is absent or not statically rendered');
    if (!elements.some(({ name, attrs }) => name === 'a' && attrs.href?.startsWith('#'))) fail(file, 'missing keyboard skip link');
  }
  if (/GitHub University|Example Journal|Lorem ipsum/i.test(html)) fail(file, 'sample content appears in generated page');
  for (const { name, attrs } of elements) {
    if (['a', 'link'].includes(name) && attrs.href) checkReference(file, attrs.href);
    if (['img', 'script', 'video', 'audio', 'source', 'track', 'iframe'].includes(name) && attrs.src) checkReference(file, attrs.src);
    if (attrs.poster) checkReference(file, attrs.poster);
    if (attrs.srcset && !attrs.srcset.includes('data:')) {
      for (const candidate of attrs.srcset.split(',')) checkReference(file, candidate.trim().split(/\s+/)[0]);
    }
    if (name === 'img' && !Object.hasOwn(attrs, 'alt')) fail(file, `image lacks alt attribute: ${attrs.src ?? '(no src)'}`);
  }
}

const sitemap = path.join(root, 'sitemap.xml');
if (!existsSync(sitemap)) fail(sitemap, 'missing sitemap');
else {
  const locations = [...readFileSync(sitemap, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  if (!locations.length) fail(sitemap, 'sitemap contains no locations');
  for (const location of locations) checkReference(sitemap, location);
  for (const slug of projectSlugs) {
    if (!locations.includes(`${origin}/projects/${slug}/`)) fail(sitemap, `project route absent from sitemap: ${slug}`);
  }
}
const robots = path.join(root, 'robots.txt');
if (!existsSync(robots) || !readFileSync(robots, 'utf8').includes(`${origin}/sitemap.xml`)) fail(robots, 'missing production sitemap reference');
if (!existsSync(path.join(root, '.nojekyll'))) errors.push('dist/.nojekyll is missing.');

if (errors.length) {
  console.error(`Static site validation failed (${errors.length}):\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Static site validation passed: ${htmlFiles.length} HTML pages, ${projectSlugs.length} project details, ${localReferences} internal references. ${externalReferences} external references were not network-tested.`);
}
