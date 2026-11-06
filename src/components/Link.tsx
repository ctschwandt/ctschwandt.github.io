import type { PropsWithChildren } from 'react';

export function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function ExternalLink({ href, children, className }: PropsWithChildren<{href: string; className?: string}>) {
  return <a href={href} className={className}>{children}</a>;
}

export function TextLink({ href, children }: PropsWithChildren<{href: string}>) {
  return <a className="text-link" href={href}>{children}<ArrowIcon /></a>;
}
