import { readFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { Marked, Renderer } from 'marked';
import type { Experience, Link, NavigationItem, Profile, Project, ProjectImage, ProjectVideo, SkillGroup } from './types';

const contentRoot = path.resolve('src/content');
type RecordValue = Record<string, unknown>;
const fail = (file: string, message: string): never => { throw new Error(`${file}: ${message}`); };
function object(value: unknown, file: string): RecordValue {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return fail(file, 'expected an object');
  return value as RecordValue;
}
function string(value: unknown, file: string, field: string): string {
  if (typeof value !== 'string' || !value.trim()) return fail(file, `${field} must be a nonempty string`);
  return value;
}
function strings(value: unknown, file: string, field: string): string[] {
  if (!Array.isArray(value)) return fail(file, `${field} must be an array of strings`);
  return value.map((v) => string(v, file, field));
}
function url(value: unknown, file: string, field: string, local = false): string {
  const result = string(value, file, field);
  if (local && result.startsWith('/') && !result.startsWith('//') && !result.includes('..')) return result;
  try { if (new URL(result).protocol === 'https:') return result; } catch { /* give a content-specific error */ }
  return fail(file, `${field} must be an HTTPS URL${local ? ' or root-relative path' : ''}`);
}
function asset(value: unknown, file: string, field: string): string {
  const result = url(value, file, field, true);
  if (result.startsWith('/') && !existsSync(path.join('public', result))) fail(file, `${field}: missing asset ${result}`);
  return result;
}
function links(value: unknown, file: string): Link[] {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return fail(file, 'links must be an array');
  return value.map((v) => { const item = object(v, file); return { label: string(item.label, file, 'link.label'), url: url(item.url, file, 'link.url', true) }; });
}
function array(value: unknown, file: string): unknown[] {
  if (!Array.isArray(value)) return fail(file, 'expected an array');
  return value;
}
function json(name: string): unknown { return JSON.parse(readFileSync(path.join(contentRoot, name), 'utf8')); }
const renderer = new Renderer();
// Content is authored locally, but raw HTML is deliberately excluded from project Markdown.
renderer.html = ({ text }) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const markdown = new Marked({ renderer, gfm: true, breaks: false });

export function loadContent() {
  const profileFile = 'profile.json';
  const p = object(json(profileFile), profileFile);
  const edu = object(p.education, profileFile);
  const club = object(p.club, profileFile);
  const profile: Profile = {
    name: string(p.name, profileFile, 'name'), title: string(p.title, profileFile, 'title'),
    location: string(p.location, profileFile, 'location'), github: url(p.github, profileFile, 'github'),
    ...(p.resume ? { resume: asset(p.resume, profileFile, 'resume') } : {}),
    ...(p.email ? { email: string(p.email, profileFile, 'email') } : {}),
    education: {
      institution: string(edu.institution, profileFile, 'education.institution'), degree: string(edu.degree, profileFile, 'education.degree'),
      start: string(edu.start, profileFile, 'education.start'), end: string(edu.end, profileFile, 'education.end'),
      expectedGraduation: string(edu.expectedGraduation, profileFile, 'education.expectedGraduation'),
    },
    intro: strings(p.intro, profileFile, 'intro'), interests: strings(p.interests, profileFile, 'interests'),
    personal: strings(p.personal, profileFile, 'personal'), personalLinks: links(p.personalLinks, profileFile),
    social: links(p.social, profileFile), dotfiles: url(p.dotfiles, profileFile, 'dotfiles'),
    club: { role: string(club.role, profileFile, 'club.role'), label: string(club.label, profileFile, 'club.label'), url: url(club.url, profileFile, 'club.url') },
    setup: array(p.setup, profileFile).map((v) => { const item = object(v, profileFile); return { label: string(item.label, profileFile, 'setup.label'), value: string(item.value, profileFile, 'setup.value') }; }),
  };
  if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) fail(profileFile, 'email must be a valid email address');
  const navigation: NavigationItem[] = array(json('navigation.json'), 'navigation.json').map((v) => {
    const item = object(v, 'navigation.json');
    return { label: string(item.label, 'navigation.json', 'label'), href: url(item.href, 'navigation.json', 'href', true) };
  });
  const skills: SkillGroup[] = array(json('skills.json'), 'skills.json').map((v) => {
    const item = object(v, 'skills.json'); return { title: string(item.title, 'skills.json', 'title'), items: strings(item.items, 'skills.json', 'items') };
  });
  const experience: Experience[] = array(json('experience.json'), 'experience.json').map((v) => {
    const item = object(v, 'experience.json');
    return {
      id: string(item.id, 'experience.json', 'id'), role: string(item.role, 'experience.json', 'role'), organization: string(item.organization, 'experience.json', 'organization'),
      start: string(item.start, 'experience.json', 'start'), end: string(item.end, 'experience.json', 'end'), summary: string(item.summary, 'experience.json', 'summary'),
      bullets: strings(item.bullets, 'experience.json', 'bullets'),
      ...(item.location ? { location: string(item.location, 'experience.json', 'location') } : {}),
      ...(item.image ? { image: asset(item.image, 'experience.json', 'image') } : {}),
    };
  });
  if (new Set(experience.map((e) => e.id)).size !== experience.length) fail('experience.json', 'duplicate id');
  const projects: Project[] = readdirSync(path.join(contentRoot, 'projects')).filter((name) => name.endsWith('.md')).map((file) => {
    const slug = file.slice(0, -3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail(file, 'filename must use lowercase words separated by hyphens');
    const raw = readFileSync(path.join(contentRoot, 'projects', file), 'utf8');
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
    if (!frontmatter) return fail(file, 'expected YAML front matter followed by Markdown');
    const meta = object(parse(frontmatter[1]), file);
    if (!frontmatter[2].trim()) fail(file, 'project description must not be empty');
    if (meta.order !== undefined && (typeof meta.order !== 'number' || !Number.isFinite(meta.order))) fail(file, 'order must be a finite number');
    if (meta.featured !== undefined && typeof meta.featured !== 'boolean') fail(file, 'featured must be true or false');
    const images: ProjectImage[] = meta.images === undefined ? [] : array(meta.images, file).map((v) => {
      const image = object(v, file);
      return { src: asset(image.src, file, 'images.src'), alt: string(image.alt, file, 'images.alt'), ...(image.caption ? { caption: string(image.caption, file, 'images.caption') } : {}) };
    });
    const videos: ProjectVideo[] = meta.videos === undefined ? [] : array(meta.videos, file).map((v) => {
      const video = object(v, file);
      return { src: asset(video.src, file, 'videos.src'), caption: string(video.caption, file, 'videos.caption'), ...(video.poster ? { poster: asset(video.poster, file, 'videos.poster') } : {}) };
    });
    return {
      slug, title: string(meta.title, file, 'title'), summary: string(meta.summary, file, 'summary'),
      technologies: meta.technologies === undefined ? [] : strings(meta.technologies, file, 'technologies'),
      order: typeof meta.order === 'number' ? meta.order : 100, featured: meta.featured === true,
      ...(meta.github ? { github: url(meta.github, file, 'github') } : {}), ...(meta.demo ? { demo: url(meta.demo, file, 'demo') } : {}),
      ...(meta.year !== undefined ? { year: string(String(meta.year), file, 'year') } : {}), images, videos, links: links(meta.links, file),
      html: markdown.parse(frontmatter[2], { async: false }),
    };
  }).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  if (!projects.length) fail('projects', 'at least one project is required');
  return { profile, navigation, skills, experience, projects };
}
