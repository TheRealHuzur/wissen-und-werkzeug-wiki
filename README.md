# Wissen & Werkzeug Wiki

Quelle des Wikis unter `https://wissen-und-werkzeug.de/wiki/`. Inhalte entstehen beim Build aus `vault/` (`scripts/export-wiki.mjs`). Ein Push auf `main` löst sofort den Deploy aus (`.github/workflows/deploy.yml`, lftp `mirror --delete`). Änderungen deshalb immer über Branch und Pull Request.

## IndexNow

Seit 13.11.2026 (PR #31) meldet jeder Deploy die Wiki-Seiten, deren Inhalt sich geändert hat, an `api.indexnow.org`. Von dort gehen die Meldungen an Bing und die übrigen IndexNow-Suchmaschinen. Die Hauptseite meldet ihre Seiten getrennt über das IndexNow-Plugin in WordPress, mit einem eigenen Schlüssel.

**Schlüssel.** `public/7ef216f13492d64229835d432e4e5819.txt`, Inhalt genau der Schlüssel, ohne Zeilenumbruch. Er liegt nicht im Wurzelverzeichnis der Domain, deshalb schickt jede Meldung `keyLocation` mit. Der Schlüssel berechtigt damit nur Adressen unter `/wiki/`. Die Datei muss in `public/` bleiben. Fehlt sie im Build, nimmt `mirror --delete` sie vom Server, und jede Meldung scheitert mit HTTP 403.

**Ablauf.** `scripts/indexnow.mjs` hat drei Befehle, je einen Workflow-Schritt:

| Schritt | Befehl | Wann |
|---|---|---|
| IndexNow-Manifest bauen | `manifest` | nach dem Build, vor dem mirror. Schreibt `dist/indexnow-manifest.json` mit einem Fingerabdruck je Sitemap-Adresse |
| IndexNow-Meldeliste ermitteln | `vergleichen <liste>` | vor dem mirror. Holt das Manifest des letzten Deploys von `/wiki/indexnow-manifest.json` und vergleicht |
| IndexNow melden | `melden <liste>` | nur nach erfolgreichem mirror. Höchstens 10.000 Adressen je Anfrage, leere Liste wird nicht gesendet |

Der Manifest-Schritt steht zeichengleich auch in `deploy-trockenlauf.yml`, damit dessen Löschliste stimmt.

**Was als geändert gilt.** Kandidaten sind nur die Adressen der Sitemap. Der Fingerabdruck umfasst aus dem `<head>` den Titel, die meta-Angaben (ohne `generator`), `canonical` und das JSON-LD, dazu das `<main>`-Element. Die Astro-Klassenkennungen werden vorher normalisiert. Gemeldet werden neue Adressen, Adressen mit geändertem Fingerabdruck und entfernte Adressen. Entfernte Adressen beantwortet der Server mit 404 oder einer Weiterleitung aus der `.htaccess`.

Die ganze Datei wird bewusst nicht gehasht. Jede Seite nennt im `<head>` CSS- und JS-Dateien mit Inhaltshash und die Astro-Fassung. Eine einzige Zeile in `custom.css` ändert damit alle Seiten, der Fingerabdruck dagegen bleibt gleich. Ein neuer Artikel meldet sich selbst, seine Hubs und die Seiten, die ihn unter „Verwandte Artikel“ zeigen.

**Rückfallregeln.**

| Fall | Folge |
|---|---|
| Kein Live-Manifest, nicht lesbar oder andere Fassung | alle Sitemap-Adressen werden gemeldet |
| Manifest lässt sich nicht bauen | diesmal nichts, beim nächsten Deploy alles |
| Nur die Meldung fällt aus (API nicht erreichbar) | das neue Manifest liegt trotzdem live, diese Änderungen werden **nicht** nachgemeldet |

Wer alles neu melden will, erhöht `FINGERPRINT_VERSION` in `scripts/indexnow.mjs`. Der nächste Deploy behandelt das Live-Manifest dann als fehlend. Dasselbe ist nötig, wenn sich das Verfahren in `fingerprintHtml()` ändert.

**Der Deploy scheitert nie an IndexNow.** Das Skript endet immer mit Status 0, die drei Schritte stehen zusätzlich auf `continue-on-error`.

**Kontrolle im Actions-Protokoll.** Im Schritt *IndexNow melden* steht zum Beispiel `Gemeldet: 63 Adressen, HTTP 202 (Angenommen, Schluessel wird noch geprueft)`. 200 und 202 sind Erfolg. Jeder andere Status und jeder Fehler erscheint als gelbe Warnung in der Zusammenfassung des Laufs, der Lauf bleibt grün. *Meldeliste leer* heißt, dass sich inhaltlich nichts geändert hat. Der Schritt *IndexNow-Meldeliste ermitteln* listet jede Adresse mit `neu`, `geaendert` oder `entfernt`.

Erster Lauf am 13.11.2026 (Deploy #52): kein Live-Manifest vorhanden, 63 Adressen gemeldet, HTTP 202.

**Lokal prüfen, ohne zu senden** (nach `npm run build`):

```sh
node scripts/indexnow.mjs manifest
node scripts/indexnow.mjs vergleichen /tmp/indexnow-liste.json
node scripts/indexnow.mjs melden /tmp/indexnow-liste.json --trocken
```

## Sitemap: `lastmod`

Seit 13.11.2026 (PR #32) kommt `lastmod` in der Wiki-Sitemap allein aus dem Feld `updated` im Frontmatter. Fehlt `updated`, bekommt die Adresse kein `lastmod`. Das ist dieselbe Regel wie für `dateModified` im JSON-LD (Standards-Wiki, Abschnitt 4): Kein Datum ist besser als ein falsches. Umgesetzt in `serialize()` in `astro.config.mjs`.

Vorher fiel die Sitemap auf die Dateizeit zurück, im CI-Checkout also auf den Zeitpunkt des Deploys. Jede Adresse trug bei jedem Lauf ein frisches `lastmod`. Am 13.11.2026 live geprüft: 5 von 63 Adressen haben `lastmod`. Mit jedem nach Standard überarbeiteten Artikel kommt eine dazu.

Die Sitemap fließt nicht in den IndexNow-Fingerabdruck ein. Eine Änderung an `lastmod` löst deshalb keine Meldung aus.

---

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
