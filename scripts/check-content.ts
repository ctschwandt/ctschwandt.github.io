import assert from 'node:assert/strict';
import { loadContent } from '../src/content-loader';
const data = loadContent();
assert.equal(new Set(data.projects.map((p) => p.slug)).size, data.projects.length);
assert(data.navigation.some((n) => n.href === '/'), 'Navigation must link to the homepage');
assert(data.projects.every((p) => p.html.trim()), 'Every project must have a Markdown body');
assert(data.experience.length > 0, 'Experience must not be empty');
console.log(`Validated ${data.projects.length} Markdown projects, ${data.experience.length} experience entries, ${data.skills.length} skill groups, profile and navigation.`);
