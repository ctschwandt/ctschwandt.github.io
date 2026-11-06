import type { PageData } from './types';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './styles/main.css';

export function App({data}: {data: PageData}) {
  return <Layout data={data}>{data.kind === 'about' ? <AboutPage data={data} /> : data.kind === 'projects' ? <ProjectsPage data={data} /> : data.kind === 'project' && data.project ? <ProjectPage data={data} project={data.project} /> : data.kind === 'experience' ? <ExperiencePage data={data} /> : data.kind === 'skills' ? <SkillsPage data={data} /> : <NotFoundPage />}</Layout>;
}
export default App;
