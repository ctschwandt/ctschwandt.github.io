import { TextLink } from '../components/Link';
export function NotFoundPage() {
  return <div className="not-found page-heading"><h1>Page not found</h1><p>This address doesn’t lead to a page on this site. It may have moved during the redesign.</p><TextLink href="/">Return to About</TextLink><TextLink href="/projects/">Browse projects</TextLink></div>;
}
