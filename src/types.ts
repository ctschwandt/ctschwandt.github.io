export interface Link { label: string; url: string }
export interface ProjectImage { src: string; alt: string; caption?: string }
export interface ProjectVideo { src: string; poster?: string; caption: string }
export interface Project {
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  order: number;
  featured: boolean;
  github?: string;
  demo?: string;
  year?: string;
  images: ProjectImage[];
  videos: ProjectVideo[];
  links: Link[];
  html: string;
}
export interface Profile {
  name: string;
  title: string;
  location: string;
  github: string;
  email?: string;
  resume?: string;
  education: { institution: string; degree: string; start: string; end: string; expectedGraduation: string };
  intro: string[];
  interests: string[];
  personal: string[];
  personalLinks: Link[];
  setup: { label: string; value: string }[];
  social: Link[];
  club: { role: string; label: string; url: string };
  dotfiles: string;
}
export interface Experience {
  id: string;
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  image?: string;
}
export interface SkillGroup { title: string; items: string[] }
export interface NavigationItem { label: string; href: string }
export type PageKind = 'about' | 'projects' | 'project' | 'experience' | 'skills' | 'not-found';
export interface PageData {
  kind: PageKind;
  path: string;
  title: string;
  description: string;
  profile: Profile;
  navigation: NavigationItem[];
  projects: Project[];
  experience: Experience[];
  skills: SkillGroup[];
  project?: Project;
}
