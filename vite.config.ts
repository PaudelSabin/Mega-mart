// Vite configuration: the only plugin needed is the React one
// (it enables JSX and fast refresh while developing).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
