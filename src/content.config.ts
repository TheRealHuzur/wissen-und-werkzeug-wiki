import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { docsLoader } from '@astrojs/starlight/loaders';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    // Die Felder schreibt scripts/export-wiki.mjs aus der Vault-Notiz durch.
    // Ohne diese Erweiterung weist Astro unbekannte Frontmatter-Felder ab und
    // die Artikelfuss-Komponente kaeme gar nicht erst an die Werte.
    // Alle optional: Der Bestand hat sie noch nicht.
    schema: docsSchema({
      extend: z.object({
        // Datumsangaben als Zeichenkette im Format JJJJ-MM-TT. Der Vergleich
        // updated > created in ArticleFooter.astro ist damit ein reiner
        // Zeichenkettenvergleich und bleibt in diesem Format richtig.
        created: z.string().optional(),
        updated: z.string().optional(),
        // Angebotsverweis, Standards-Wiki Abschnitt 6 und 8, Muster in
        // Verlinkungsmatrix. offer_heading ist die unverlinkte H2, offer_text
        // traegt den Link als Inline-Markdown. Ein eigenes Zielfeld gibt es
        // nicht: Der Ankertext gehoert in den Satz, nicht in die Ueberleitung.
        // Der Export gibt beide nur aus, wenn die Pruefung dort bestanden ist.
        offer_heading: z.string().optional(),
        offer_text: z.string().optional(),
      }),
    }),
  }),
};
