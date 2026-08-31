import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { sidebar } from './src/generated/sidebar.mjs';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  site: 'https://wissen-und-werkzeug.de',
  base: '/wiki',
  trailingSlash: 'always',
  integrations: [
    starlight({
      // Der Wert erreicht nur noch die 404-Seite: Alle anderen Seiten setzen
      // ueber den Export einen eigenen title-Tag im head, und im Kopfbereich
      // steht seit dem Logo die Wortmarke. Ohne "Wiki" liest sich der
      // 404-Titel als "404 | Wissen & Werkzeug".
      title: 'Wissen & Werkzeug',
      locales: {
        root: {
          label: 'Deutsch',
          lang: 'de',
        },
      },
      // Wortmarke statt Texttitel. Zwei Fassungen, weil das Wiki einen dunklen
      // Modus hat und die farbige Schrift auf dunklem Grund schlecht lesbar
      // ist. Beide Dateien sind aus den 2560 Pixel breiten Originalen der
      // Mediathek auf 600 Pixel heruntergerechnet; die Kopfzeile zeigt sie
      // deutlich kleiner, alles darueber waere unnoetige Ladelast.
      logo: {
        light: './src/assets/logo-wortmarke.png',
        dark: './src/assets/logo-wortmarke-dunkel.png',
        replacesTitle: true,
      },
      sidebar,
      favicon: '/favicon.svg',
      // Montserrat wie auf der Hauptwebsite, als npm-Paket und damit vom
      // eigenen Server. Bewusst nicht ueber fonts.googleapis.com: Ein Abruf
      // dort uebertraege die IP-Adresse jedes Besuchers an Google.
      //
      // Zwei Eintraege, nicht einer: Der Standardeinstieg des Pakets bringt
      // allein den aufrechten Schnitt mit. Die Gewichtsachse deckt Fett ab,
      // Kursiv liegt in einer eigenen Datei.
      //
      // Die eigene Datei steht hinten, damit --sl-font dort das letzte Wort hat.
      customCss: [
        '@fontsource-variable/montserrat',
        '@fontsource-variable/montserrat/wght-italic.css',
        './src/styles/custom.css',
      ],
      components: {
        ThemeSelect: './src/components/CustomThemeSelect.astro',
        // Haengt den sichtbaren Brotkruemelpfad oberhalb der H1 ein.
        PageTitle: './src/components/PageTitle.astro',
        Footer: './src/components/Footer.astro',
      },
    }),
    sitemap({
      filter: (page) => !page.includes('/00-system') &&
        !page.includes('/10-expertise') &&
        !page.includes('/20-ip-atoms') &&
        !page.includes('/99-inbox'),
      serialize(item) {
        try {
          const urlPath = new URL(item.url).pathname.replace('/wiki/', '');
          const filePathWithoutExt = path.join(process.cwd(), 'src/content/docs', urlPath.replace(/\/$/, ''));
          let potentialFilePath = filePathWithoutExt + '.md';

          if (!fs.existsSync(potentialFilePath)) {
            potentialFilePath = filePathWithoutExt + '.mdx';
          }
          if (!fs.existsSync(potentialFilePath) && urlPath === '') {
            potentialFilePath = path.join(process.cwd(), 'src/content/docs/index.md');
          }

          let lastmod = new Date().toISOString();

          if (fs.existsSync(potentialFilePath)) {
            const content = fs.readFileSync(potentialFilePath, 'utf-8');
            const match = content.match(/^(lastmod|updatedDate|dateModified):\s*"?([^"\n]+)"?/m);
            if (match && match[2]) {
              lastmod = new Date(match[2]).toISOString();
            } else {
              const stat = fs.statSync(potentialFilePath);
              lastmod = stat.mtime.toISOString();
            }
          }
          item.lastmod = lastmod;
        } catch (e) {
          item.lastmod = new Date().toISOString();
        }
        return item;
      }
    }),
  ],
});
