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
        // Angebotsverweis, Standards-Wiki Abschnitt 6 und 8. Nur vollstaendig
        // gefuellt gibt der Export sie aus.
        offer_heading: z.string().optional(),
        offer_text: z.string().optional(),
        offer_link: z.string().optional(),
      }),
    }),
  }),
};
