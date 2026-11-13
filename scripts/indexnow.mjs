// IndexNow fuer das Wiki: meldet nach einem Deploy genau die Seiten, deren
// Inhalt sich geaendert hat, an Bing und die anderen IndexNow-Suchmaschinen.
//
// Drei Befehle, je einer pro Workflow-Schritt:
//
//   node scripts/indexnow.mjs manifest
//     Nach dem Build. Liest die Sitemap aus dist/, bildet fuer jede Adresse
//     einen Fingerabdruck und schreibt dist/indexnow-manifest.json. Das
//     Manifest wird mit gespiegelt und ist danach oeffentlich abrufbar. So
//     kennt der naechste Deploy den Stand des vorigen.
//
//   node scripts/indexnow.mjs vergleichen <listendatei>
//     Vor dem mirror. Holt das Manifest des letzten Deploys von der
//     Live-Seite und vergleicht es mit dem frischen aus dist/. Schreibt die
//     Meldeliste in <listendatei>. Das muss vor dem mirror geschehen, danach
//     liegt live schon das neue Manifest.
//
//   node scripts/indexnow.mjs melden <listendatei> [--trocken]
//     Nach dem mirror. Schickt die Liste an api.indexnow.org. Mit --trocken
//     wird sie nur ausgegeben.
//
// Warum ein Git-Diff nicht taugt: Die Wiki-Seiten entstehen beim Build aus
// vault/ und stehen nicht im Repository. Was sich an einer Seite geaendert
// hat, zeigt erst das fertige HTML.
//
// Grundsatz: Dieses Skript darf einen Deploy nie scheitern lassen. Jeder
// Fehler wird protokolliert, das Skript endet trotzdem mit Status 0. Im
// schlimmsten Fall wird einmal nichts oder zu viel gemeldet. Ein rotes
// Deploy wegen IndexNow waere der groessere Schaden.

import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const HOST = 'wissen-und-werkzeug.de';
const SITE = `https://${HOST}`;
const BASE = '/wiki/';
const KEY = '7ef216f13492d64229835d432e4e5819';
// Der Schluessel liegt nicht im Wurzelverzeichnis der Domain, sondern unter
// /wiki/. Deshalb muss jede Meldung keyLocation mitschicken. Der Schluessel
// berechtigt dann nur Adressen unter /wiki/, mehr soll er auch nicht.
const KEY_LOCATION = `${SITE}${BASE}${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
// Obergrenze des Protokolls je Anfrage
const MAX_URLS_PER_REQUEST = 10000;

const DIST_DIR = 'dist';
const MANIFEST_NAME = 'indexnow-manifest.json';
const LIVE_MANIFEST_URL = `${SITE}${BASE}${MANIFEST_NAME}`;
// Fassung des Fingerabdrucks. Aendert sich das Verfahren in
// fingerprintHtml(), wird sie hochgezaehlt. Ein Live-Manifest mit anderer
// Fassung wird dann nicht verglichen, sondern als fehlend behandelt: Ein
// Vergleich ueber zwei verschiedene Verfahren meldete sonst jede Seite als
// geaendert, ohne dass es jemand bemerkt -- so wird es wenigstens im
// Protokoll benannt.
const FINGERPRINT_VERSION = 1;
const FETCH_TIMEOUT_MS = 30000;

function log(message) {
  console.log(`[indexnow] ${message}`);
}

function warn(message) {
  // ::warning:: macht den Hinweis in der Zusammenfassung des Actions-Laufs
  // sichtbar, ohne den Lauf rot zu faerben.
  const prefix = process.env.GITHUB_ACTIONS ? '::warning::' : '[indexnow] WARNUNG: ';
  console.log(`${prefix}${message}`);
}

// --- Sitemap -------------------------------------------------------------

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
}

// Adresse der Live-Seite auf die Datei in dist/ abbilden.
// https://wissen-und-werkzeug.de/wiki/bpmn/ -> dist/bpmn/index.html
function distPathForUrl(url) {
  const { pathname } = new URL(url);
  if (!pathname.startsWith(BASE)) return null;
  const rel = decodeURIComponent(pathname.slice(BASE.length));
  if (rel === '' || rel.endsWith('/')) return path.join(DIST_DIR, rel, 'index.html');
  return path.join(DIST_DIR, rel);
}

// Nur Adressen aus der Sitemap kommen in Frage. Die Sitemap filtert interne
// Bereiche bereits heraus (astro.config.mjs), eine zweite Liste muss hier
// nicht gepflegt werden.
async function readSitemapUrls() {
  const indexXml = await fs.readFile(path.join(DIST_DIR, 'sitemap-index.xml'), 'utf-8');
  const urls = [];
  for (const sitemapUrl of extractLocs(indexXml)) {
    const file = distPathForUrl(sitemapUrl);
    if (!file) {
      warn(`Teil-Sitemap ausserhalb von ${BASE} uebersprungen: ${sitemapUrl}`);
      continue;
    }
    urls.push(...extractLocs(await fs.readFile(file, 'utf-8')));
  }
  return [...new Set(urls)].sort();
}

// --- Fingerabdruck -------------------------------------------------------

// Gehasht wird nicht die ganze index.html, sondern nur, was eine
// Suchmaschine von der Seite auswertet:
//
//   aus dem head: title, die meta-Angaben (ohne generator), canonical und
//   das JSON-LD;
//   aus dem body: das main-Element, also Brotkruemelpfad, Titel, Text und
//   Autorenblock.
//
// Warum nicht die ganze Datei: Jede Seite verweist im head auf Stylesheets
// und Skripte, deren Dateinamen einen Inhaltshash tragen, und nennt die
// Astro- und Starlight-Fassung (generator). Eine einzige geaenderte Zeile in
// custom.css aendert damit alle Seiten, ebenso jedes Paket-Update. Gemessen
// am 13.11.2026: Ganze Datei 63 von 63 Seiten geaendert, Fingerabdruck 0.
// Nichts davon ist eine inhaltliche Aenderung.
//
// Was dagegen gemeldet wird: Ein neuer Artikel taucht in den Artikellisten
// seiner Hubs und unter "Verwandte Artikel" der verlinkten Seiten auf. Das
// steht im main-Element, diese Seiten gelten zu Recht als geaendert
// (Probelauf: ein neuer BPMN-Artikel, sieben Meldungen).
//
// Warum die Astro-Klassen normalisiert werden: Astro vergibt je Komponente
// eine Kennung wie astro-bguv2lll, die aus der Komponentendatei berechnet
// wird. Eine reine Gestaltungsaenderung an einer Komponente aendert die
// Kennung auf allen Seiten.
//
// Zeitstempel oder Build-Kennungen stehen nicht im HTML: Zwei Builds aus
// demselben Stand sind byte-gleich (geprueft am 13.11.2026). Das sichtbare
// Bearbeitungsdatum kommt aus dem Frontmatter (updated), nicht aus der
// Dateizeit. Die Dateizeit steckt nur im lastmod der Sitemap, und die wird
// nicht gehasht.
function fingerprintHtml(html) {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (head === undefined || main === undefined) {
    throw new Error('head oder main nicht gefunden');
  }

  const headParts = [
    ...(head.match(/<title>[\s\S]*?<\/title>/gi) ?? []),
    ...(head.match(/<meta\s[^>]*>/gi) ?? []).filter((tag) => /\s(name|property)=/i.test(tag) && !/name="generator"/i.test(tag)),
    ...(head.match(/<link\s[^>]*rel="canonical"[^>]*>/gi) ?? []),
    ...(head.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi) ?? []),
  ];

  const mainNormalized = main
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\s?data-astro-cid-[a-z0-9]+(="[^"]*")?/gi, '')
    .replace(/\bastro-[a-z0-9]{8}\b/g, 'astro-#');

  return createHash('sha256')
    .update(headParts.join('\n'))
    .update('\n<main>\n')
    .update(mainNormalized)
    .digest('hex');
}

// --- Befehl: manifest ----------------------------------------------------

async function buildManifest() {
  // Ohne Schluesseldatei in dist/ wuerde mirror --delete sie vom Server
  // nehmen, und jede Meldung scheiterte an der Pruefung des Schluessels.
  try {
    const key = await fs.readFile(path.join(DIST_DIR, `${KEY}.txt`), 'utf-8');
    if (key !== KEY) warn(`Schluesseldatei in ${DIST_DIR}/ hat nicht genau den Schluessel als Inhalt.`);
  } catch {
    warn(`Schluesseldatei ${KEY}.txt fehlt in ${DIST_DIR}/. Meldungen werden abgelehnt werden.`);
  }

  const urls = await readSitemapUrls();
  const pages = {};
  let missing = 0;
  for (const url of urls) {
    const file = distPathForUrl(url);
    try {
      pages[url] = fingerprintHtml(await fs.readFile(file, 'utf-8'));
    } catch (error) {
      // Seite fehlt oder ist nicht lesbar: ohne Fingerabdruck ins Manifest.
      // Der Vergleich behandelt sie dann als geaendert und meldet sie.
      missing += 1;
      pages[url] = null;
      warn(`Kein Fingerabdruck fuer ${url} (${file}): ${error.message}`);
    }
  }

  const manifest = { version: FINGERPRINT_VERSION, pages };
  await fs.writeFile(path.join(DIST_DIR, MANIFEST_NAME), `${JSON.stringify(manifest, null, 2)}\n`);
  log(`Manifest geschrieben: ${DIST_DIR}/${MANIFEST_NAME} mit ${urls.length} Adressen${missing ? `, ${missing} ohne Fingerabdruck` : ''}.`);
}

// --- Befehl: vergleichen -------------------------------------------------

async function fetchLiveManifest() {
  // Der Abfrageparameter umgeht Zwischenspeicher auf dem Weg. Die
  // .htaccess prueft nur, ob die Datei existiert, und ignoriert ihn.
  const url = `${LIVE_MANIFEST_URL}?t=${Date.now()}`;
  let response;
  try {
    response = await fetch(url, {
      cache: 'no-store',
      redirect: 'follow',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (error) {
    warn(`Live-Manifest nicht abrufbar (${error.message}).`);
    return null;
  }
  if (response.status === 404) {
    log('Kein Live-Manifest vorhanden (404). Erster Lauf mit IndexNow.');
    return null;
  }
  if (!response.ok) {
    warn(`Live-Manifest: HTTP ${response.status}.`);
    return null;
  }
  try {
    const data = await response.json();
    if (data?.version !== FINGERPRINT_VERSION || typeof data.pages !== 'object' || data.pages === null) {
      warn(`Live-Manifest hat Fassung ${data?.version}, erwartet ${FINGERPRINT_VERSION}. Wird als fehlend behandelt.`);
      return null;
    }
    return data;
  } catch (error) {
    warn(`Live-Manifest nicht lesbar (${error.message}).`);
    return null;
  }
}

async function compare(listFile) {
  if (!listFile) throw new Error('Pfad der Listendatei fehlt.');
  // Zuerst eine leere Liste hinlegen. Bricht der Vergleich weiter unten ab,
  // findet der Meldeschritt eine gueltige Datei und meldet nichts, statt
  // eine Liste aus einem frueheren Lauf zu senden.
  await fs.writeFile(listFile, '[]\n');

  const fresh = JSON.parse(await fs.readFile(path.join(DIST_DIR, MANIFEST_NAME), 'utf-8'));
  const live = await fetchLiveManifest();

  let neu = [];
  let geaendert = [];
  let entfernt = [];
  if (!live) {
    neu = Object.keys(fresh.pages);
    log(`Ohne Vergleichsstand werden alle ${neu.length} Sitemap-Adressen gemeldet.`);
  } else {
    for (const [url, hash] of Object.entries(fresh.pages)) {
      if (!(url in live.pages)) neu.push(url);
      else if (hash === null || live.pages[url] !== hash) geaendert.push(url);
    }
    // Entfernte Adressen werden mitgemeldet. Das IndexNow-Protokoll sieht
    // das ausdruecklich vor: Die Suchmaschine ruft die Adresse ab, bekommt
    // 404 oder eine Weiterleitung aus der .htaccess und aktualisiert ihren
    // Index entsprechend schneller.
    entfernt = Object.keys(live.pages).filter((url) => !(url in fresh.pages));
  }

  // Nur Adressen, fuer die der Schluessel gilt. Alles andere lehnt die
  // Gegenstelle ab, und zwar die ganze Anfrage.
  const list = [...neu, ...geaendert, ...entfernt].filter((url) => {
    try {
      const u = new URL(url);
      return u.host === HOST && u.pathname.startsWith(BASE);
    } catch {
      return false;
    }
  });

  log(`Vergleich: ${neu.length} neu, ${geaendert.length} geaendert, ${entfernt.length} entfernt.`);
  for (const [label, items] of [['neu', neu], ['geaendert', geaendert], ['entfernt', entfernt]]) {
    for (const url of items) log(`  ${label}: ${url}`);
  }
  await fs.writeFile(listFile, `${JSON.stringify(list, null, 2)}\n`);
  log(`Meldeliste mit ${list.length} Adressen geschrieben: ${listFile}`);
}

// --- Befehl: melden ------------------------------------------------------

// Bedeutung der Antwortcodes laut Protokoll, damit das Actions-Protokoll
// ohne Nachschlagen lesbar ist.
const STATUS_TEXT = {
  200: 'OK, angenommen',
  202: 'Angenommen, Schluessel wird noch geprueft',
  400: 'Ungueltiges Format',
  403: 'Schluessel ungueltig oder Schluesseldatei nicht gefunden',
  422: 'Adressen passen nicht zum Host oder zum Schluessel',
  429: 'Zu viele Anfragen',
};

async function report(listFile, dryRun) {
  if (!listFile) throw new Error('Pfad der Listendatei fehlt.');
  const list = JSON.parse(await fs.readFile(listFile, 'utf-8'));
  if (!Array.isArray(list) || list.length === 0) {
    log('Meldeliste leer. Nichts zu melden.');
    return;
  }

  for (let i = 0; i < list.length; i += MAX_URLS_PER_REQUEST) {
    const urlList = list.slice(i, i + MAX_URLS_PER_REQUEST);
    const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

    if (dryRun) {
      log(`TROCKENLAUF: wuerde ${urlList.length} Adressen an ${ENDPOINT} senden:`);
      for (const url of urlList) log(`  ${url}`);
      continue;
    }

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
      const text = (await response.text()).trim();
      const meaning = STATUS_TEXT[response.status] ?? 'unbekannter Status';
      const line = `Gemeldet: ${urlList.length} Adressen, HTTP ${response.status} (${meaning})${text ? `, Antwort: ${text.slice(0, 500)}` : ''}`;
      if (response.status === 200 || response.status === 202) log(line);
      else warn(line);
    } catch (error) {
      warn(`Meldung von ${urlList.length} Adressen fehlgeschlagen: ${error.message}`);
    }
  }
}

// --- Einstieg ------------------------------------------------------------

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = rest.filter((a) => !a.startsWith('--'));
  const dryRun = rest.includes('--trocken');

  if (command === 'manifest') await buildManifest();
  else if (command === 'vergleichen') await compare(args[0]);
  else if (command === 'melden') await report(args[0], dryRun);
  else throw new Error(`Unbekannter Befehl "${command ?? ''}". Erwartet: manifest, vergleichen, melden.`);
}

// Immer Status 0, siehe Grundsatz oben.
main().catch((error) => {
  warn(`IndexNow uebersprungen: ${error.message}`);
}).finally(() => {
  process.exitCode = 0;
});
