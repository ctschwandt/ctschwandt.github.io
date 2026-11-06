import { defineConfig, type Plugin } from 'vite';
import { readFile } from 'node:fs/promises';

function staticPages(): Plugin {
  return {
    name: 'portfolio-static-pages',
    configureServer(server) {
      server.watcher.add('src/content');
      server.watcher.on('change', (file) => {
        if (file.includes('/src/content/')) server.ws.send({ type: 'full-reload' });
      });
      return () => server.middlewares.use(async (req, res, next) => {
        const pathname = new URL(req.url ?? '/', 'http://localhost').pathname;
        if (pathname.startsWith('/@') || pathname.startsWith('/src/') || pathname.startsWith('/node_modules/') || (/\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith('.html'))) return next();
        try {
          const module = await server.ssrLoadModule('/src/entry-server.tsx');
          const result = module.renderPage(pathname.endsWith('/') || pathname.endsWith('.html') ? pathname : `${pathname}/`);
          const template = await server.transformIndexHtml(pathname, await readFile('index.html', 'utf8'));
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(module.fillTemplate(template, result));
        } catch (error) { next(error); }
      });
    },
  };
}
export default defineConfig({
  appType: 'mpa',
  base: '/',
  plugins: [staticPages()],
  build: { manifest: true, target: 'es2022' },
});
