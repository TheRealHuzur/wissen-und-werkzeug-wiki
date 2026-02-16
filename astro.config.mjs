import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://www.wissen-und-werkzeug.de',
  base: '/wiki',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Wissen & Werkzeug Wiki',
      sidebar: [
        { label: 'Startseite', link: '/' },
      ],
      favicon: '/favicon.svg',
    }),
  ],
});