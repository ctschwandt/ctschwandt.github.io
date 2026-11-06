import type { PropsWithChildren } from 'react';
import type { PageData } from '../types';
import { ThemeToggle } from './ThemeToggle';

export function Layout({ data, children }: PropsWithChildren<{ data: PageData }>) {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header site-width">
      <a className="site-name" href="/">{data.profile.name}</a>
      <nav aria-label="Main navigation"><ul>{data.navigation.map(item => <li key={item.href}><a href={item.href} aria-current={(item.href === '/' ? data.path === '/' : data.path.startsWith(item.href)) ? 'page' : undefined}>{item.label}</a></li>)}</ul></nav>
    </header>
    <main className="site-width" id="main-content" tabIndex={-1}>{children}</main>
    <footer className="site-footer site-width">
      <div className="footer-identity"><span>{data.profile.name}</span><span>{data.profile.location}</span></div>
      <nav aria-label="Social links"><ul>{data.profile.social.map(link => <li key={link.url}><a href={link.url}>{link.label}</a></li>)}{data.profile.resume && <li><a href={data.profile.resume}>Résumé</a></li>}{data.profile.email && <li><a href={`mailto:${data.profile.email}`}>Email</a></li>}</ul></nav>
      <ThemeToggle />
    </footer>
  </>;
}
