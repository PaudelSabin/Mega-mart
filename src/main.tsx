// Entry point of the app.
// 1. Loads the Hanken Grotesk font (self-hosted, latin letters only).
// 2. Loads the global stylesheet (src/style.css).
// 3. Mounts the <App /> component into the #root element of index.html.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/hanken-grotesk/latin-400.css'; // Regular
import '@fontsource/hanken-grotesk/latin-500.css'; // Medium
import '@fontsource/hanken-grotesk/latin-600.css'; // SemiBold
import '@fontsource/hanken-grotesk/latin-700.css'; // Bold
import App from './App';
import './style.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
