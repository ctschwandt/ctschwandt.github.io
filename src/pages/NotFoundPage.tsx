import { TextLink } from '../components/Link';
import '../styles/secondary.css';

export function NotFoundPage() {
  return <section className="missing-page" aria-labelledby="missing-heading">
    <div className="missing-code" aria-hidden="true">404</div>
    <h1 id="missing-heading">Page not found</h1>
    <p>This address doesn’t lead to a page on this site. It may have moved during the redesign.</p>
    <div className="missing-links"><TextLink href="/">Return to About</TextLink><TextLink href="/projects/">Browse projects</TextLink></div>
  </section>;
}
