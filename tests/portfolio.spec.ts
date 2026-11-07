import { readdirSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const projectRoutes = readdirSync('src/content/projects')
  .filter((file) => file.endsWith('.md'))
  .map((file) => `/projects/${file.slice(0, -3)}/`)
  .sort();
const sampleRoutes = ['/', '/projects/', '/experience/', '/skills/', '/projects/opengl-maze-fps/', '/projects/python2-interpreter/'];

async function open(page: Page, route: string) {
  const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
  expect(response?.status(), `${route} should return real HTML`).toBe(200);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.getByLabel('Appearance')).toBeEnabled();
}

test('important routes retain substantive content and navigation without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    for (const [route, heading, text] of [
      ['/', 'About me', 'Columbia College'],
      ['/projects/', 'Projects', 'MIPS Assembly Interpreter'],
      ['/projects/opengl-maze-fps/', 'OpenGL Maze FPS', 'Implementation'],
      ['/experience/', 'Experience', 'Missouri University of Science & Technology'],
      ['/skills/', 'Skills', 'OCaml'],
    ]) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1, name: heading, exact: true })).toBeVisible();
      await expect(page.locator('main')).toContainText(text);
      await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('href', '/projects/');
    }
    await page.goto('/projects/opengl-maze-fps/', { waitUntil: 'domcontentloaded' });
    const screenshot = page.getByRole('link', { name: /^Enlarge:/ }).first();
    await expect(screenshot).toHaveAttribute('href', /\/images\/projects\/maze1\.png$/);
    // Without enhancement the screenshot remains a normal, usable image link.
    const target = await screenshot.getAttribute('href');
    const imageResponse = await page.request.get(target!);
    expect(imageResponse.status()).toBe(200);
    expect(imageResponse.headers()['content-type']).toContain('image/');
  } finally {
    await context.close();
  }
});

test('all discovered project routes load directly without application or internal resource errors', async ({ page }) => {
  const applicationErrors: string[] = [];
  const externalMediaFailures: string[] = [];
  page.on('pageerror', (error) => applicationErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() !== 'error') return;
    const url = message.location().url;
    // Cloud network restrictions are not application errors. These requests
    // remain real and unmocked; remote reachability is reported separately.
    if (url.includes('res.cloudinary.com') && /Failed to load resource|net::ERR_/i.test(message.text())) {
      externalMediaFailures.push(`${url}: ${message.text()}`);
    } else applicationErrors.push(`${url}: ${message.text()}`);
  });
  const internalFailures: string[] = [];
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:4173/') && response.status() >= 400) internalFailures.push(`${response.status()} ${response.url()}`);
  });
  // Discover future projects as well: ordinary Markdown additions must not
  // require changing this test or a routing table.
  expect(projectRoutes.length).toBeGreaterThan(0);
  for (const route of projectRoutes) {
    await open(page, route);
    await expect(page.locator('.project-body')).not.toBeEmpty();
    expect((await page.locator('main').innerText()).length).toBeGreaterThan(100);
  }
  await open(page, '/projects/opengl-maze-fps/');
  const refreshed = await page.reload({ waitUntil: 'domcontentloaded' });
  expect(refreshed?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('OpenGL Maze FPS');
  await expect(page.getByLabel('Appearance')).toBeEnabled();
  expect(applicationErrors).toEqual([]);
  expect(internalFailures).toEqual([]);
  if (externalMediaFailures.length) test.info().annotations.push({ type: 'external-media', description: `${externalMediaFailures.length} real Cloudinary poster requests failed; remote media reachability is outside these application assertions.` });
});

test('screenshot dialog supports keyboard opening, Escape, and focus return without preloading originals', async ({ page }) => {
  const originals: string[] = [];
  page.on('request', (request) => {
    if (/\/images\/projects\/maze\d+\.png(?:\?|$)/.test(request.url())) originals.push(request.url());
  });
  await open(page, '/projects/opengl-maze-fps/');
  const opener = page.getByRole('link', { name: /^Enlarge:/ }).first();
  const dialog = page.getByRole('dialog', { name: 'Enlarged project screenshot' });
  expect(originals, 'full-size originals should load only after opening').toEqual([]);
  await opener.focus();
  await expect(opener).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close image' })).toBeFocused();
  const image = dialog.getByRole('img');
  await expect(image).toHaveAttribute('src', '/images/projects/maze1.png');
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('video demonstrations use native controls and never preload or autoplay', async ({ page }) => {
  const videoRequests: string[] = [];
  page.on('request', (request) => { if (/\.mp4(?:\?|$)/i.test(request.url())) videoRequests.push(request.url()); });
  await open(page, '/projects/opengl-maze-fps/');
  const videos = page.locator('video');
  await expect(videos).toHaveCount(3);
  for (const video of await videos.all()) {
    await expect(video).toHaveAttribute('controls', '');
    await expect(video).toHaveAttribute('preload', 'none');
    expect(await video.getAttribute('autoplay')).toBeNull();
    expect(await video.getAttribute('aria-labelledby')).toBeTruthy();
    await expect(video.locator('source')).toHaveAttribute('src', /^https:\/\/res\.cloudinary\.com\/.+\.mp4$/);
    await expect(video.locator('a')).toHaveAttribute('href', /\.mp4$/);
  }
  expect(videoRequests).toEqual([]);
  await expect(videos.first()).toHaveAttribute('poster', /^\/images\/.+\.webp$/);
  // Exercise the recovery state without pretending the remote host was reachable.
  await videos.first().dispatchEvent('error');
  await expect(page.getByRole('status')).toContainText('This demonstration could not be loaded.');
  await expect(page.getByRole('status').getByRole('link')).toHaveAttribute('href', /^https:\/\/res\.cloudinary\.com\/.+\.mp4$/);
});

test('appearance defaults to dark and persists explicit light, dark, and system choices', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await open(page, '/');
  const control = page.getByLabel('Appearance');
  await expect(control).toHaveValue('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await control.selectOption('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(control).toBeEnabled();
  await expect(control).toHaveValue('light');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'light' });
  await control.selectOption('dark');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(control).toBeEnabled();
  await expect(control).toHaveValue('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await control.selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('system');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(control).toHaveValue('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('project index galleries switch real screenshots and videos with keyboard controls', async ({ page }) => {
  await open(page, '/projects/');
  const project = page.locator('article#opengl-maze-fps');
  const secondImage = project.getByRole('link', { name: /^Show screenshot 2:/ });
  await secondImage.focus();
  await page.keyboard.press('Enter');
  await expect(secondImage).toHaveAttribute('aria-current', 'true');
  await expect(project.locator('.project-stage-view img')).toHaveAttribute('src', /maze2\.webp$/);
  const demonstration = project.getByRole('button', { name: /^Show video 1:/ });
  await demonstration.focus();
  await page.keyboard.press('Enter');
  await expect(demonstration).toHaveAttribute('aria-pressed', 'true');
  await expect(project.locator('video')).toHaveAttribute('controls', '');
  await expect(project.locator('video')).toHaveAttribute('preload', 'none');
  expect(await project.locator('video').getAttribute('autoplay')).toBeNull();
  await secondImage.focus();
  await page.keyboard.press('Enter');
  const opener = project.locator('.project-stage-view a');
  await opener.focus();
  const stage = project.locator('.project-stage-view');
  expect(await stage.evaluate(element => {
    const style = getComputedStyle(element);
    return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2;
  }), 'Focused screenshot needs a visible frame ring that its own clipping cannot hide').toBe(true);
  await page.keyboard.press('Enter');
  await expect(project.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(project.getByRole('dialog')).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('principal layouts fit 320, 390, 768, and 1440 pixel viewports', async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of sampleRoutes) {
      await open(page, route);
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
      }));
      expect(dimensions.page, `${route} overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      const navigation = page.getByRole('navigation', { name: 'Main navigation' });
      await expect(navigation).toBeVisible();
      for (const link of await navigation.getByRole('link').all()) await expect(link).toBeVisible();
      if (route === '/' && width === 390) {
        const feature = page.locator('.selected-work article#opengl-maze-fps');
        const title = await feature.getByRole('heading', { name: 'OpenGL Maze FPS', exact: true }).boundingBox();
        const media = await feature.locator('.project-stage-view').boundingBox();
        expect(title && title.y + title.height < 844, 'The featured software identity must fit the initial phone viewport').toBe(true);
        expect(media && media.y < 844 - 120, 'Show a recognizable part of the demonstration in the first phone viewport').toBe(true);
      }
    }
  }
});

for (const theme of ['light', 'dark'] as const) {
  test(`representative pages satisfy automated WCAG A/AA checks in ${theme} mode`, async ({ page }) => {
    for (const route of sampleRoutes) {
      await open(page, route);
      await page.getByLabel('Appearance').selectOption(theme);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(results.violations.map(({ id, impact, nodes }) => ({ id, impact, targets: nodes.map((node) => node.target) })), `${route}, ${theme}`).toEqual([]);
    }
  });
}
