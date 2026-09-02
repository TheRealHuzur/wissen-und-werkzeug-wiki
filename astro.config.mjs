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
      // Drei Schriften der Designvorlage, als npm-Pakete und damit vom eigenen
      // Server. Bewusst nicht ueber fonts.googleapis.com: Ein Abruf dort
      // uebertraege die IP-Adresse jedes Besuchers an Google.
      //
      // Inter loest Montserrat ab. Die Groessen- und Abstandsskala der Vorlage
      // ist auf Inter gerechnet, siehe Handoff zur Designueberarbeitung.
      // JetBrains Mono traegt Mikro-Label, Tabellenkoepfe und Inline-Code,
      // Public Sans allein die H1 der Startseite.
      //
      // Bei Inter zwei Eintraege, nicht einer: Der Standardeinstieg des Pakets
      // bringt allein den aufrechten Schnitt mit, Kursiv liegt in einer eigenen
      // Datei. Mono und Public Sans brauchen keinen kursiven Schnitt.
      //
      // Die eigene Datei steht hinten, damit --sl-font dort das letzte Wort hat.
      customCss: [
        '@fontsource-variable/inter',
        '@fontsource-variable/inter/wght-italic.css',
        '@fontsource-variable/jetbrains-mono',
        '@fontsource-variable/public-sans',
        './src/styles/custom.css',
      ],
      components: {
        // Die drei Angebotslinks der Kopfzeile. Sie besetzen Starlights
        // ThemeSelect-Stelle, weil die in der rechten Kopfgruppe und zusaetzlich
        // im Menue schmaler Bildschirme gerendert wird. Begruendung in der
        // Komponente.
        ThemeSelect: './src/components/HeaderNav.astro',
        // Setzt den hellen Modus fest, solange die dunkle Fassung der
        // Design-Tokens fehlt. Siehe Kommentar in der Komponente.
        ThemeProvider: './src/components/ThemeProvider.astro',
        // Haengt die Fusszeile der Vorlage unter den Inhaltsbereich.
        PageFrame: './src/components/PageFrame.astro',
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
