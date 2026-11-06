import { useEffect, useState } from 'react';

type Theme = 'system' | 'light' | 'dark';
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio-theme');
      if (stored === 'light' || stored === 'dark') setTheme(stored);
    } catch { /* System preference remains available when storage is disabled. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme = theme === 'system' ? (query.matches ? 'dark' : 'light') : theme;
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, [theme, ready]);
  const changeTheme = (value: Theme) => {
    setTheme(value);
    try {
      if (value === 'system') localStorage.removeItem('portfolio-theme');
      else localStorage.setItem('portfolio-theme', value);
    } catch { /* Changing this page still works when persistence is unavailable. */ }
  };
  return <div className="theme-control"><label htmlFor="appearance">Appearance</label><select id="appearance" value={theme} disabled={!ready} onChange={event => changeTheme(event.target.value as Theme)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>;
}
