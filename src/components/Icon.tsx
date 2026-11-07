type IconName = 'location' | 'education' | 'arrow' | 'code' | 'github' | 'book';
const paths: Record<IconName, string> = {
  location: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  education: 'm2 9 10-5 10 5-10 5L2 9Zm4 3v5c4 3 8 3 12 0v-5m4-3v8',
  arrow: 'M6 18 18 6M6 6h12v12',
  code: 'm7 6-5 6 5 6m10-12 5 6-5 6M14 3l-4 18',
  github: 'M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .2-2-1-3 4 0 7-2 7-6 0-2-1-3-1-3 0-1 0-3-1-4-2 0-3 1-4 1-2-1-4-1-6 0-1 0-2-1-4-1-1 1-1 3-1 4 0 0-1 1-1 3 0 4 3 6 7 6-1 1-1 2-1 3v4',
  book: 'M12 5C8 3 5 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-1-10 1Zm0 0v15',
};
export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
