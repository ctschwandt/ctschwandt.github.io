import type { PropsWithChildren } from 'react';
import { TextLink } from './Link';
export function SectionHeading({children, href, linkText}: PropsWithChildren<{href?: string; linkText?: string}>) {
  return <div className="section-heading"><h2>{children}</h2>{href && linkText && <TextLink href={href}>{linkText}</TextLink>}</div>;
}
