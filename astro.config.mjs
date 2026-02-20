import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { sidebar } from './src/generated/sidebar.mjs';

export default defineConfig({
  site: 'https://www.wissen-und-werkzeug.de',
  base: '/wiki',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Wissen & Werkzeug Wiki',
      locales: {
        root: {
          label: 'Deutsch',
          lang: 'de',
        },
      },
      sidebar,
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
    }),
    sitemap(),
  ],
});
