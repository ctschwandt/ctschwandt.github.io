import type { Profile } from '../types';
import { imageAttributes } from '../image-assets';
import { Icon } from './Icon';

export function ProfileSidebar({ profile }: { profile: Profile }) {
  return <aside className="profile-sidebar" aria-label={`${profile.name} profile`}>
    <div className="profile-main">
      <a href="/" className="profile-photo-link" aria-label={`${profile.name}, home`}><img className="profile-photo" {...imageAttributes('/images/profile.png')} sizes="(max-width: 680px) 80px, 160px" alt={`${profile.name}`} decoding="async" /></a>
      <div className="profile-identity"><p className="profile-name">{profile.name}</p><p className="profile-role">{profile.title}</p></div>
    </div>
    <div className="profile-details"><p><Icon name="location" /><span>{profile.location}</span></p><p><Icon name="education" /><span>{profile.education.institution}<small>Expected {profile.education.expectedGraduation}</small></span></p></div>
    <nav className="profile-links" aria-label="Profile links">{profile.social.map(link => <a key={link.url} href={link.url}>{link.label}<Icon name="arrow" size={15} /></a>)}{profile.resume && <a href={profile.resume}>Résumé<Icon name="arrow" size={15} /></a>}{profile.email && <a href={`mailto:${profile.email}`}>Email<Icon name="arrow" size={15} /></a>}</nav>
    <a className="profile-dotfiles" href={profile.dotfiles}><Icon name="code" />My development setup<Icon name="arrow" size={14} /></a>
  </aside>;
}
