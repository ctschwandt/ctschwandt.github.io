import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import type { PageData } from './types';

const container = document.getElementById('root');
const serialized = document.getElementById('page-data');
if (container && serialized?.textContent) {
  hydrateRoot(container, <App data={JSON.parse(serialized.textContent) as PageData} />);
}
