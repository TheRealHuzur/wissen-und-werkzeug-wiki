import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/generated/sidebar.mjs';

export default defineConfig({
  site: 'https://www.wissen-und-werkzeug.de',
  base: '/wiki',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Wissen & Werkzeug Wiki',
      sidebar,
      favicon: '/favicon.svg',
    }),
  ],
});
