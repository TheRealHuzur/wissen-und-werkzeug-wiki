import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';

export const collections = {
  // Nur fuer einzelne Beschriftungen der Oberflaeche. src/content/i18n/de.json
  // aendert bisher allein den Text im Suchfeld auf "Wiki durchsuchen", wie in
  // der Designvorlage. Alle uebrigen Begriffe bleiben Starlights deutsche
  // Standardtexte.
  i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
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
        // Der Einleitungssatz oberhalb des Inhalts. Der Export zieht ihn aus
        // dem Abschnitt "Zusammenfassung" der Notiz, siehe extractLead().
        // Reiner Text ohne Markdown; ArticleLead.astro gibt ihn unveraendert
        // aus. Nicht mit description zu verwechseln: Die ist fuer die
        // Suchmaschinen gekuerzt und traegt zusaetzlich die Fragenliste.
        lead: z.string().optional(),
        // Angebotsverweis, Standards-Wiki Abschnitt 6 und 8, Muster in
        // Verlinkungsmatrix. offer_heading ist die unverlinkte H2, offer_text
        // traegt den Link als Inline-Markdown. Ein eigenes Zielfeld gibt es
        // nicht: Der Ankertext gehoert in den Satz, nicht in die Ueberleitung.
        // Der Export gibt beide nur aus, wenn die Pruefung dort bestanden ist.
        offer_heading: z.string().optional(),
        offer_text: z.string().optional(),
        // Seit der Struktur-Migration. type traegt die schema.org-Namen und
        // steuert @type im JSON-LD; die Ebenenfelder tragen den Pfad und
        // steuern Brotkruemel und articleSection. image bleibt optional und
        // ist heute in keiner Notiz gefuellt.
        // Der Export schreibt die Ebenenfelder nur bis zur tatsaechlichen
        // Tiefe, deshalb sind auch ebene_1 und ebene_2 optional.
        type: z.enum(['Article', 'HowTo', 'CollectionPage']).optional(),
        image: z.string().optional(),
        ebene_1: z.string().optional(),
        ebene_2: z.string().optional(),
        ebene_3: z.string().optional(),
      }),
    }),
  }),
};
