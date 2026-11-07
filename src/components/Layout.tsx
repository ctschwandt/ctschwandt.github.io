import type { PropsWithChildren } from 'react';
import type { PageData } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { ProfileSidebar } from './ProfileSidebar';
import { Icon } from './Icon';

export function Layout({ data, children }: PropsWithChildren<{ data: PageData }>) {
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <div className="header-inner"><a className="site-name" href="/"><span className="site-mark"><Icon name="code" size={20} /></span>ctschwandt<span className="site-address">.github.io</span></a>
      <nav aria-label="Main navigation"><ul>{data.navigation.map(item => <li key={item.href}><a href={item.href} aria-current={(item.href === '/' ? data.path === '/' : data.path.startsWith(item.href)) ? 'page' : undefined}>{item.label}</a></li>)}</ul></nav>
      </div>
    </header>
    <div className="site-layout"><ProfileSidebar profile={data.profile} /><div className="content-column"><main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer"><div className="footer-identity"><span>{data.profile.name}</span><a href={data.profile.github}>View source & projects<Icon name="arrow" size={13} /></a></div><ThemeToggle /></footer>
    </div></div>
  </>;
}
