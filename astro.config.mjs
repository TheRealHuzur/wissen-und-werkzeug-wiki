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
      // Keine Vor- und Zurueck-Verweise am Artikelende. Die Designvorlage
      // laesst sie bewusst weg: Am Fuss stehen bereits Autorenblock und
      // Angebotsverweis, eine dritte Navigationsstufe dahinter fuehrt aus dem
      // Artikel heraus, ohne einen Zusammenhang zu stiften. Die Seitenleiste
      // traegt die Reihenfolge ohnehin.
      pagination: false,
      // Keine Ankerverweise an den Ueberschriften. Starlight haengt sonst an
      // jede H2 bis H6 einen Link auf die Ueberschrift selbst, mit
      // Kettensymbol beim Ueberfahren. Entscheidung vom 20.09.2026: Die
      // Sprungmarken (id) bleiben, das Verzeichnis "Auf dieser Seite" und
      // Verweise auf Abschnitte funktionieren weiter.
      markdown: {
        headingLinks: false,
      },
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
      // lastmod folgt derselben Regel wie dateModified im JSON-LD
      // (Standards-Wiki, Abschnitt 4): Es kommt allein aus dem Feld updated,
      // das der Export nach src/content/docs durchreicht. Fehlt updated,
      // bekommt die Adresse kein lastmod. Kein Datum ist besser als ein
      // falsches.
      //
      // Bis zum 13.11.2026 suchte diese Funktion nach lastmod, updatedDate
      // oder dateModified. Keines davon schreibt der Export, gefunden wurde
      // also nie etwas, und es griff der Rueckfall auf die Dateizeit. Im
      // CI-Checkout ist das der Zeitpunkt des Deploys: Jede Adresse trug bei
      // jedem Lauf ein frisches lastmod, ob sich etwas geaendert hatte oder
      // nicht. Genau dieses Signal verwerfen Suchmaschinen, und zwar im
      // unguenstigen Fall fuer die ganze Sitemap.
      serialize(item) {
        delete item.lastmod;
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

          if (fs.existsSync(potentialFilePath)) {
            const content = fs.readFileSync(potentialFilePath, 'utf-8');
            // Nur im Frontmatter suchen, nicht im Text. Der Export schreibt
            // updated als "JJJJ-MM-TT". Das Sitemap-Paket macht daraus
            // Mitternacht UTC desselben Tages (2026-09-18T00:00:00.000Z),
            // also dasselbe Datum wie dateModified im JSON-LD.
            const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
            const match = frontmatter.match(/^updated:\s*"?(\d{4}-\d{2}-\d{2})"?\s*$/m);
            if (match) {
              item.lastmod = match[1];
            }
          }
        } catch (e) {
          // Im Zweifel kein lastmod, siehe oben.
        }
        return item;
      }
    }),
  ],
});
