import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_VAULT = 'vault';
const MOC_ROOT_DIR = 'vault/10_expertise_map';
const ATTACHMENTS_DIR = 'vault/00_system/attachments';
const OUT_DOCS_DIR = 'src/content/docs';
const LEGACY_OUT_DOCS_DIR = 'src/content/docs/fach-expertise';
const OUT_ASSETS_DIR = 'public/wiki-assets';
const GENERATED_SIDEBAR_FILE = 'src/generated/sidebar.mjs';
// Knotenpfad auf Beschriftung und Adresse des Hubs, fuer den sichtbaren
// Brotkruemelpfad. Die Seitenleiste taugt dafuer nicht: Sie traegt
// Beschriftung und Adresse, aber nicht den Knotenpfad.
const GENERATED_BREADCRUMBS_FILE = 'src/generated/breadcrumbs.mjs';
// Bericht der Bestandsaufnahme, bewusst ausserhalb von src/content/docs
const REPORT_FILE = 'reports/bestandsaufnahme.md';
// Beschreibungen unter dieser Wortzahl sind keine vollstaendigen Saetze
const SHORT_DESCRIPTION_WORDS = 4;
const STATUS_READY = 'ki_ready';
const STATUS_REJECTED = 'verworfen';
const STATUS_ACTIVE = 'aktiv';
const STATUS_DRAFT = 'entwurf';
const AUTHOR_DATA = {
  name: 'Patrick Roßkothen',
  expertise: 'Experte für Prozess- und Wissensmanagement',
  url: 'https://wissen-und-werkzeug.de/ueber-mich/',
  // Kennung der Person, zeichengleich mit dem Person-Knoten der Hauptdomain
  personId: 'https://wissen-und-werkzeug.de/ueber-mich/#person',
  linkedin: 'https://www.linkedin.com/in/patrick-rosskothen',
  organization: 'Wissen & Werkzeug',
  organizationUrl: 'https://wissen-und-werkzeug.de',
  // Kennung der Organisation, von Yoast auf der Hauptdomain vergeben
  organizationId: 'https://wissen-und-werkzeug.de/#organization',
  // Logo aus der WordPress-Mediathek, kein Favicon und kein SVG
  organizationLogo: 'https://wissen-und-werkzeug.de/wp-content/uploads/2026/08/Logo-Organisation-512.png',
};

// Interne Vault-Seiten, die nicht veroeffentlicht werden (Maschinenraum, Struktur, Inbox)
const EXCLUDED_SLUGS = [
  '00-system-maschinenraum',
  '10-expertise-map-moc-struktur',
  '20-ip-atoms-inhaltspool',
  '99-inbox-transit-zone'
];

const SITE = 'https://wissen-und-werkzeug.de';
const BASE = '/wiki';
const BASE_PREFIX = BASE;

// _papierkorb steht hier, weil der Export den gesamten Vault durchlaeuft und
// nicht nur 10_expertise_map und 20_ip_atoms. Ohne diesen Eintrag haengt es
// allein am status einer Notiz, ob sie aus dem Papierkorb heraus
// veroeffentlicht wird. Das ist kein Schutz, sondern ein Zufall.
const SKIP_DIRS = new Set(['.obsidian', '.trash', '_private', '_papierkorb']);

function toTitleCase(input) {
  // German common lowercase words in titles (if not at the start)
  const GERMAN_LOWERCASE = new Set(['das', 'der', 'die', 'ein', 'eine', 'und', 'in', 'von', 'zu', 'an', 'mit', 'bei', 'fuer', 'für', 'aus', 'am', 'im']);

  return input
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      // Preserve acronyms (all uppercase, length > 1, e.g., BPMN, XOR)
      // We check if it's all uppercase and contains letters
      if (word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word)) {
        return word;
      }

      // Handle common lowercase words in German titles
      if (index > 0 && GERMAN_LOWERCASE.has(word.toLowerCase())) {
        return word.toLowerCase();
      }

      // Default: Capitalize first letter, keep rest as is to preserve existing casing
      // (This avoids forcing lowercase on things like "XOR" if they were partially correctly cased)
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function parseFrontmatter(content) {
  const parsed = parseYamlFrontmatter(content, { strict: false });
  return {
    hasFrontmatter: parsed.hasFrontmatter,
    frontmatter: parsed.frontmatter,
    body: parsed.body,
  };
}

function parseYamlFrontmatter(content, options = {}) {
  const strict = Boolean(options.strict);
  if (!content.startsWith('---')) {
    return { hasFrontmatter: false, frontmatter: {}, body: content, warnings: [] };
  }

  const endMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!endMatch) {
    return { hasFrontmatter: false, frontmatter: {}, body: content, warnings: [] };
  }

  const block = endMatch[0];
  const yamlRaw = block.replace(/^---\r?\n/, '').replace(/\r?\n---\r?\n?$/, '');
  const body = content.slice(block.length);
  const frontmatter = {};
  const lines = yamlRaw.split(/\r?\n/);
  const warnings = [];
  let activeListKey = null;

  function parseYamlString(value) {
    let out = value.trim();
    if (
      (out.startsWith('"') && out.endsWith('"')) ||
      (out.startsWith("'") && out.endsWith("'"))
    ) {
      out = out.slice(1, -1);
    }
    return out;
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || /^\s*#/.test(line)) {
      continue;
    }

    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) {
      const listMatch = line.match(/^\s*-\s+(.+)$/);
      if (listMatch && activeListKey) {
        if (!Array.isArray(frontmatter[activeListKey])) {
          frontmatter[activeListKey] = [];
        }
        const item = parseYamlString(listMatch[1]);
        if (item) frontmatter[activeListKey].push(item);
        continue;
      }

      if (strict) {
        warnings.push(`Unsupported YAML syntax at line ${i + 1}`);
      }
      continue;
    }

    const key = match[1];
    const rawValue = match[2] ?? '';
    const trimmed = rawValue.trim();
    activeListKey = null;

    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const items = [];
      const inner = trimmed.slice(1, -1).trim();
      if (inner.length > 0) {
        for (const part of inner.split(',')) {
          const item = parseYamlString(part);
          if (item) items.push(item);
        }
      }
      frontmatter[key] = items;
      continue;
    }

    if (trimmed.length === 0) {
      frontmatter[key] = '';
      activeListKey = key;
      continue;
    }

    frontmatter[key] = parseYamlString(trimmed);
  }

  return { hasFrontmatter: true, frontmatter, body, warnings };
}

async function cleanExportDocsDir() {
  await fs.mkdir(OUT_DOCS_DIR, { recursive: true });
  const entries = await fs.readdir(OUT_DOCS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(OUT_DOCS_DIR, entry.name);
    if (!entry.isFile()) continue;
    const lower = entry.name.toLowerCase();
    if (lower === 'index.md' || lower === 'index.mdx') continue;
    if (lower.endsWith('.md') || lower.endsWith('.mdx')) {
      await fs.rm(fullPath, { force: true });
    }
  }

  await fs.rm(LEGACY_OUT_DOCS_DIR, { recursive: true, force: true });
}

async function walkMarkdownFiles(rootDir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        if (entry.name.startsWith('PRIVATE_')) continue;
        await walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }

  await walk(rootDir);
  return files;
}

function buildRoute(slug) {
  return `${BASE_PREFIX}/${slug}/`;
}

function normalizeLookupKey(input) {
  return input.trim().toLowerCase();
}

// Adressen werden transliteriert, nicht als Unicode durchgereicht:
// ae/oe/ue/ss, uebrige Diakritika auf den Grundbuchstaben, Unterstrich zu Bindestrich.
// Festlegung aus Standards-Wiki, Abschnitt 2.
function slugify(input) {
  return String(input ?? '')
    .trim()
    .normalize('NFC')
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// --- Bestandsaufnahme -------------------------------------------------------
// Liest den Vault und sammelt Rohmaterial fuer die spaetere Artikelarbeit.
// Aendert nichts an der Ausgabe: die Frageliste wird weiterhin exportiert, das
// Etikett "Kontext:" bleibt stehen, kurze Beschreibungen bleiben stehen.

// Nach Paket 1 heisst es "Dieser Artikel"; im Bestand steht noch "Dieses Modul".
// Zwei Notizen stellen ein Emoji vor die Zeile — deshalb der freie Vorspann.
const QUESTION_BLOCK_RE = /^[^*]*\*\*Diese[sr]\s+(?:Modul|Artikel)\s+beantwortet\s+folgende\s+Fragen:?\*\*\s*$/i;
const RELATED_HEADING_RE = /^#{1,6}\s*(?:🔗\s*)?Verwandte\s+(?:Module|Artikel)\s*$/i;
const LIST_ITEM_RE = /^\s*[-*]\s+/;
const KONTEXT_ITEM_RE = /^[\s*]*Kontext[\s*]*:/i;

function countWords(text) {
  return String(text ?? '').split(/\s+/).filter(Boolean).length;
}

function collectQuestions(body) {
  const lines = String(body ?? '').split(/\r?\n/);
  const questions = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!QUESTION_BLOCK_RE.test(lines[i])) continue;
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j += 1;
    while (j < lines.length && LIST_ITEM_RE.test(lines[j])) {
      const question = lines[j].replace(LIST_ITEM_RE, '').trim();
      if (question) questions.push(question);
      j += 1;
    }
    i = j;
  }
  return questions;
}

// Das Etikett kommt aus dem Notion-Export in mehreren Schreibweisen:
// "***Kontext:*", "***Kontext*:" und "  Kontext:" in der Folgezeile.
function stripKontextLabel(text) {
  return String(text ?? '')
    .replace(/\*/g, ' ')
    .trim()
    .replace(/^Kontext\s*:\s*/i, '')
    .trim();
}

async function writeBestandsaufnahme(candidates, missingUpdatedSlugs) {
  const sorted = [...candidates].sort((a, b) => a.slug.localeCompare(b.slug, 'de'));

  const withQuestions = [];
  const shortDescriptions = [];
  let questionsTotal = 0;
  let relatedTotal = 0;

  for (const candidate of sorted) {
    const questions = collectQuestions(candidate.body);
    if (questions.length > 0) {
      withQuestions.push({ slug: candidate.slug, title: candidate.title, questions });
      questionsTotal += questions.length;
    }
    for (const entry of collectRelatedDescriptions(candidate.body)) {
      relatedTotal += 1;
      if (entry.wordCount > 0 && entry.wordCount < SHORT_DESCRIPTION_WORDS) {
        shortDescriptions.push({ slug: candidate.slug, ...entry });
      }
    }
  }

  const lines = [];
  lines.push('# Bestandsaufnahme Wiki');
  lines.push('');
  lines.push('Erzeugt bei jedem Exportlauf aus dem Vault. **Reiner Lesebericht** —');
  lines.push('an der Ausgabe des Wikis aendert er nichts. Rohmaterial fuer die spaetere');
  lines.push('Artikelarbeit (Standards-Wiki, Abschnitte 3 und 8).');
  lines.push('');
  lines.push('| Kennzahl | Wert |');
  lines.push('|---|---|');
  lines.push(`| Artikel im Export | ${sorted.length} |`);
  lines.push(`| Artikel mit Frageliste | ${withQuestions.length} |`);
  lines.push(`| Fragen insgesamt | ${questionsTotal} |`);
  lines.push(`| Eintraege im Verweisblock | ${relatedTotal} |`);
  lines.push(`| Beschreibungen unter ${SHORT_DESCRIPTION_WORDS} Woertern | ${shortDescriptions.length} |`);
  lines.push(`| Notizen ohne \`updated:\` | ${missingUpdatedSlugs.length} |`);
  lines.push('');

  lines.push('## 1. Fragen aus den Artikelanfaengen');
  lines.push('');
  lines.push('Werden spaeter zu echten Frage-Antwort-Paaren am Artikelende und sind der');
  lines.push('erste Inhalt des FAQ-Registers. Bis dahin bleiben sie unveraendert stehen.');
  lines.push('');
  for (const entry of withQuestions) {
    lines.push(`### ${entry.slug}`);
    lines.push('');
    lines.push(`${entry.title}`);
    lines.push('');
    for (const question of entry.questions) {
      lines.push(`- ${question}`);
    }
    lines.push('');
  }

  lines.push(`## 2. Beschreibungen im Verweisblock unter ${SHORT_DESCRIPTION_WORDS} Woertern`);
  lines.push('');
  lines.push('Kein vollstaendiger Satz. Bei der Artikelarbeit umschreiben oder streichen —');
  lines.push('ist die Beschreibung kein Satz, steht der Titel allein (Standards-Wiki,');
  lines.push('Abschnitt 8).');
  lines.push('');
  if (shortDescriptions.length === 0) {
    lines.push('Keine gefunden.');
    lines.push('');
  } else {
    lines.push('| Artikel | Verweisziel | Beschreibung | Woerter |');
    lines.push('|---|---|---|---|');
    for (const entry of shortDescriptions) {
      lines.push(`| ${entry.slug} | ${entry.title} | ${entry.description} | ${entry.wordCount} |`);
    }
    lines.push('');
  }

  lines.push('## 3. Notizen ohne `updated:`');
  lines.push('');
  lines.push('Diese Artikel bekommen kein `dateModified` in den strukturierten Daten.');
  lines.push('Zugleich die Arbeitsliste: `updated:` wird am Tag der Ueberarbeitung gesetzt.');
  lines.push('');
  for (const slug of [...missingUpdatedSlugs].sort((a, b) => a.localeCompare(b, 'de'))) {
    lines.push(`- ${slug}`);
  }
  lines.push('');

  await fs.mkdir(path.dirname(REPORT_FILE), { recursive: true });
  await fs.writeFile(REPORT_FILE, lines.join('\n'), 'utf8');

  return {
    articlesWithQuestions: withQuestions.length,
    questionsTotal,
    relatedTotal,
    shortDescriptions: shortDescriptions.length,
  };
}

function collectRelatedDescriptions(body) {
  const lines = String(body ?? '').split(/\r?\n/);
  const entries = [];
  for (let i = 0; i < lines.length; i += 1) {
    if (!RELATED_HEADING_RE.test(lines[i])) continue;
    for (let j = i + 1; j < lines.length && !/^#{1,6}\s/.test(lines[j]); j += 1) {
      if (!LIST_ITEM_RE.test(lines[j])) continue;
      const item = lines[j].replace(LIST_ITEM_RE, '');

      // Dritte Form aus dem Notion-Export: das Etikett steht als eigener
      // Listenpunkt unter dem Titel und gehoert zum vorherigen Eintrag.
      if (KONTEXT_ITEM_RE.test(item)) {
        const previous = entries[entries.length - 1];
        if (previous && !previous.description) {
          previous.description = stripKontextLabel(item);
          previous.wordCount = countWords(previous.description);
        }
        continue;
      }

      const linkMatch = item.match(/\[\[([^\]|#]+)/);
      const title = (linkMatch ? linkMatch[1] : item.replace(/\*/g, '')).trim();

      const closing = item.indexOf(']]');
      let description = stripKontextLabel(closing === -1 ? '' : item.slice(closing + 2));
      if (!description) {
        const next = lines[j + 1] ?? '';
        const isOwnLine = next.trim() !== '' && !LIST_ITEM_RE.test(next) && !/^#{1,6}\s/.test(next);
        if (isOwnLine) description = stripKontextLabel(next);
      }

      entries.push({ title, description, wordCount: countWords(description) });
    }
  }
  return entries;
}

// Entfernt interne Arbeitsnotizen und Notion-Artefakte aus dem sichtbaren Text.
// Der Vault bleibt unveraendert; bereinigt wird ausschliesslich der Export.
function cleanVaultArtifacts(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  let index = 0;

  while (index < lines.length) {
    if (/^\s*>/.test(lines[index])) {
      let end = index;
      while (end < lines.length && /^\s*>/.test(lines[end])) end += 1;
      const block = lines.slice(index, end);

      // Grafik-Platzhalter sind interne Notizen fuer die spaetere Bildphase
      if (block.some((line) => /GRAFIK:/.test(line))) {
        index = end;
        if (index < lines.length && lines[index].trim() === '') index += 1;
        continue;
      }

      out.push(...block);
      index = end;
      continue;
    }

    out.push(lines[index]);
    index += 1;
  }

  let cleaned = out.join('\n');

  // Notion-Artefakt: "**[[Titel]]***Kontext:* Text" laesst Sternchen woertlich stehen
  cleaned = cleaned.replace(/\*\*\*Kontext:\*[ \t]*/g, '**  \n  Kontext: ');
  cleaned = cleaned.replace(/\*\*\*Kontext\*:[ \t]*/g, '**  \n  Kontext: ');

  // Vault-Begriff "Modul" gehoert nicht in den sichtbaren Text
  cleaned = cleaned.replace(/^(#{1,6}\s*)(?:🔗\s*)?Verwandte Module\s*$/gm, '$1Verwandte Artikel');
  cleaned = cleaned.replace(/\bDieses Modul\b/g, 'Dieser Artikel');

  return cleaned;
}

function normalizeAssetKey(input) {
  return String(input ?? '')
    .toLowerCase()
    .replace(/[\s._,-]+/g, '');
}

function splitWikilinkTarget(rawTarget) {
  const trimmed = rawTarget.trim();
  const hashIndex = trimmed.indexOf('#');
  if (hashIndex === -1) {
    return { target: trimmed, heading: '' };
  }
  return {
    target: trimmed.slice(0, hashIndex).trim(),
    heading: trimmed.slice(hashIndex + 1).trim(),
  };
}

function headingSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractFirstH1(content) {
  const lines = String(content ?? '').split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^#\s+(.+)$/);
    if (match) return match[1].trim();
  }
  return '';
}

function extractRagContext(content) {
  const match = content.match(/%%\r?\n\s*RAG-CONTEXT-ANCHOR:\s*\r?\n([\s\S]*?)\r?\n\s*%%/);
  if (!match) return null;
  return match[1]
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\bDieses Modul\b/g, 'Dieser Artikel');
}

function yamlQuote(input) {
  return `"${String(input).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ')}"`;
}

function sanitizeDescription(input) {
  let text = String(input ?? '');
  text = text.replace(/\bDieses Modul\b/g, 'Dieser Artikel');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
  text = text.replace(/[*_`]/g, '');
  text = text.replace(/\s+/g, ' ').trim();

  if (text.length <= 160) {
    return text;
  }

  const sliced = text.slice(0, 159);
  const boundary = sliced.lastIndexOf(' ');
  const compact = (boundary > 80 ? sliced.slice(0, boundary) : sliced).trim();
  return `${compact}\u2026`;
}

/**
 * Zieht den Lead-Absatz aus dem Abschnitt "## Zusammenfassung" am Kopf einer
 * Notiz und gibt ihn zusammen mit dem gekuerzten Body zurueck.
 *
 * Die Designvorlage setzt unter die H1 einen hervorgehobenen Einleitungssatz.
 * Im Bestand steht genau dieser Satz als Blockzitat unter einer H2
 * "Zusammenfassung". Aus dem Frontmatter laesst er sich nicht nehmen: Das Feld
 * description traegt dort Zusammenfassung und Fragenliste in einem und wird
 * fuer die Suchmaschinen auf 160 Zeichen gekuerzt.
 *
 * Entfernt werden nur die Ueberschrift und das Blockzitat. Der Rest des
 * Abschnitts, in aller Regel "Dieser Artikel beantwortet folgende Fragen" mit
 * seiner Liste, bleibt im Body stehen.
 *
 * Erkannt werden alle Schreibweisen des Bestands. Die Ueberschrift steht mal
 * als H2, mal fett gesetzt -- die Vorlage t_ip_atom.md gibt die fette Form vor,
 * der aeltere Teil des Bestands nutzt die H2. Der Text darunter steht mal als
 * Blockzitat, mal als gewoehnlicher Absatz. Steht keine Zusammenfassung am
 * Kopf, bleibt alles unveraendert.
 */
const ZUSAMMENFASSUNG_RE = /^(?:##\s+Zusammenfassung|\*\*Zusammenfassung\*\*)\s*:?\s*$/i;

function extractLead(body) {
  const lines = String(body ?? '').split(/\r?\n/);

  let index = 0;
  while (index < lines.length && lines[index].trim() === '') index += 1;
  if (!ZUSAMMENFASSUNG_RE.test(lines[index] ?? '')) {
    return { lead: '', body };
  }

  const headingIndex = index;
  index += 1;
  while (index < lines.length && lines[index].trim() === '') index += 1;

  const isQuote = (lines[index] ?? '').trimStart().startsWith('>');
  const collected = [];
  while (index < lines.length) {
    const trimmed = lines[index].trim();
    if (isQuote) {
      // Das Blockzitat endet mit der ersten Zeile ohne Zeichen davor. Leere
      // Zitatzeilen ("> ") kommen im Bestand vor und werden uebersprungen.
      if (!trimmed.startsWith('>')) break;
      const text = trimmed.replace(/^>\s?/, '').trim();
      if (text) collected.push(text);
    } else {
      // Gewoehnlicher Absatz: bis zur naechsten Leerzeile oder Ueberschrift.
      if (trimmed === '' || /^#{1,6}\s/.test(trimmed)) break;
      collected.push(trimmed);
    }
    index += 1;
  }

  // Dieselbe Saeuberung wie bei der description, nur ohne deren Kuerzung: Der
  // Lead wird als Text ausgegeben, nicht als Markdown. Ein stehengebliebenes
  // [Label](Ziel) waere sonst woertlich zu lesen.
  const lead = collected
    .join(' ')
    .replace(/\bDieses Modul\b/g, 'Dieser Artikel')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!lead) return { lead: '', body };

  const rest = [...lines.slice(0, headingIndex), ...lines.slice(index)].join('\n').trim();
  return { lead, body: rest };
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
}

// Brotkruemel fuer das JSON-LD.
//
// Zwei Aenderungen gegenueber der Fassung vor der Struktur-Migration:
//  1. Der Name kam aus der Adresse, was auf allen Seiten Ergebnisse wie
//     "Bpmn das Exklusive Gateway Xor" erzeugte. Er kommt jetzt aus dem
//     Titel, der an der Aufrufstelle ohnehin bereitsteht.
//  2. Der Pfad wurde aus Adressteilen zusammengesetzt, was nie eine Stufe
//     ergeben hat: Die Schleife rechnete eine Variable aus und verwendete
//     sie nirgends. Der Pfad kommt jetzt aus den Ebenenfeldern, ueber die
//     Hub-Notizen des Baums.
//
// Die Seite selbst ist immer die letzte Stufe. Ist sie zugleich ein Hub,
// wird ihr eigener Knoten nicht doppelt genannt.
function buildBreadcrumbs(slug, title, pfad, mocNachKnoten) {
  const breadcrumbs = [{ name: 'Wiki', item: `${SITE}${BASE}/` }];

  for (let i = 1; i <= pfad.length; i += 1) {
    const moc = mocNachKnoten.get(pfad.slice(0, i).join('/'));
    if (!moc) continue;
    if (moc.slug === slug) continue;
    breadcrumbs.push({ name: moc.label, item: `${SITE}${BASE}/${moc.slug}/` });
  }

  breadcrumbs.push({ name: title, item: `${SITE}${BASE}/${slug}/` });

  return breadcrumbs.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: b.item
  }));
}

function toBool(value) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
    return undefined;
  }
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true' || normalized === '1') return true;
    if (normalized === 'false' || normalized === '0') return false;
  }
  return undefined;
}

function toNumber(value) {
  const parsed = Number.parseInt(String(value ?? '').trim(), 10);
  if (Number.isNaN(parsed)) {
    return undefined;
  }
  return parsed;
}

function buildMocLabel(frontmatter, body, fallbackName) {
  const h1 = extractFirstH1(body);
  if (h1) return h1;

  const title = String(frontmatter.title ?? '').trim();
  if (title) return title;

  const identifier = String(frontmatter.id ?? '').trim() || fallbackName;
  return toTitleCase(identifier);
}

async function buildAttachmentIndex() {
  const exact = new Map();
  const normalized = new Map();
  let entries = [];
  try {
    entries = await fs.readdir(ATTACHMENTS_DIR, { withFileTypes: true });
  } catch {
    return { exact, normalized };
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const exactKey = normalizeLookupKey(entry.name);
    if (!exact.has(exactKey)) {
      exact.set(exactKey, entry.name);
    }
    const normalizedKey = normalizeAssetKey(entry.name);
    if (normalizedKey && !normalized.has(normalizedKey)) {
      normalized.set(normalizedKey, entry.name);
    }
  }
  return { exact, normalized };
}

async function copyAttachmentByNameIfExists(filename, attachmentIndex) {
  const safeName = path.basename(filename);
  const exactKey = normalizeLookupKey(safeName);
  let matchedName = attachmentIndex.exact.get(exactKey);
  let fuzzyMatched = false;
  if (!matchedName) {
    const normalizedKey = normalizeAssetKey(safeName);
    matchedName = attachmentIndex.normalized.get(normalizedKey);
    fuzzyMatched = Boolean(matchedName);
  }
  if (!matchedName) {
    return { copied: false, filename: safeName, fuzzyMatched: false };
  }

  const source = path.join(ATTACHMENTS_DIR, matchedName);
  await fs.mkdir(OUT_ASSETS_DIR, { recursive: true });
  const target = path.join(OUT_ASSETS_DIR, safeName);
  try {
    await fs.access(target);
  } catch {
    await fs.copyFile(source, target);
  }
  return { copied: true, filename: safeName, sourceName: matchedName, fuzzyMatched };
}

function extractLinkTarget(rawTarget) {
  const cleaned = rawTarget.trim();
  const filePart = cleaned.split('#')[0].trim();
  return filePart;
}

function resolveInternalRoute(routeMap, target) {
  const normalized = normalizeLookupKey(target);
  const basenameKey = normalizeLookupKey(path.parse(target).name || target);
  return routeMap.get(normalized) || routeMap.get(basenameKey) || null;
}

// --- Der Baum aus den Ebenenfeldern -----------------------------------------
// Bis zur Struktur-Migration kannte der Erzeuger zwei Ebenen: eine Gruppe je
// parent_topic, gesteuert ueber moc_level. Beide Felder gibt es nicht mehr.
// Die Tiefe einer Notiz ergibt sich jetzt aus der Zahl ihrer gefuellten
// Ebenenfelder, und ein Knoten mit Kindern wird zur verschachtelten Gruppe.
function ebenenPfad(frontmatter) {
  return ['ebene_1', 'ebene_2', 'ebene_3']
    .map((key) => slugify(String(frontmatter[key] ?? '').trim()))
    .filter(Boolean);
}

function knotenSchluessel(pfad) {
  return pfad.join('/');
}

// Kinder je Knoten. Ein Knoten ist Kind, wenn sein Pfad ohne das letzte
// Glied den Elternknoten ergibt.
function kinderIndex(mocs) {
  const kinder = new Map();
  for (const moc of mocs) {
    if (moc.pfad.length < 2) continue;
    const eltern = knotenSchluessel(moc.pfad.slice(0, -1));
    if (!kinder.has(eltern)) kinder.set(eltern, []);
    kinder.get(eltern).push(moc);
  }
  return kinder;
}

// Geschwister werden nach Beschriftung sortiert. Das ist ueberall richtig,
// wo keine Reihenfolge gemeint ist, und falsch bei den fuenf Bereichen des
// Prozessmanagements: Sie stehen in einer fachlichen Ordnung, naemlich
// Steuern als Klammer, darin Verstehen, Gestalten und Umsetzen als
// Lebenszyklus, dann Betreiben.
//
// Das optionale Feld reihenfolge ueberlagert die alphabetische Sortierung,
// es ersetzt sie nicht: Notizen mit Wert stehen vorn, aufsteigend nach
// Zahl; alles ohne Wert folgt alphabetisch. Bei gleichem Wert entscheidet
// die Beschriftung. Standards-Wiki, Abschnitt 7.
function vergleicheGeschwister(a, b) {
  const ra = a.reihenfolge;
  const rb = b.reihenfolge;
  if (ra !== undefined && rb === undefined) return -1;
  if (ra === undefined && rb !== undefined) return 1;
  if (ra !== undefined && rb !== undefined && ra !== rb) return ra - rb;
  return a.label.localeCompare(b.label, 'de', { sensitivity: 'base' });
}

function sortiereGeschwister(liste) {
  return liste.slice().sort(vergleicheGeschwister);
}

function buildSidebarItemsFromMocs(mocs, includeDraft) {
  const sichtbar = mocs.filter((moc) => {
    const status = normalizeLookupKey(String(moc.status ?? ''));
    if (status === STATUS_REJECTED) return false;
    return status === STATUS_ACTIVE || (includeDraft && status === STATUS_DRAFT);
  });

  const kinder = kinderIndex(sichtbar);
  const nachLabel = sortiereGeschwister;
  const link = (moc) => buildRoute(moc.slug).replace(BASE_PREFIX, '') || '/';

  const erreicht = new Set();

  // Ein Knoten ohne Kinder bleibt ein Link. Sobald er Kinder hat, wird er zur
  // Gruppe und bekommt seine eigene Seite als ersten Eintrag "Uebersicht".
  const baueEintrag = (moc) => {
    erreicht.add(moc.knoten);
    const eigene = nachLabel(kinder.get(moc.knoten) || []);
    if (eigene.length === 0) return { label: moc.label, link: link(moc) };
    return {
      label: moc.label,
      items: [{ label: 'Übersicht', link: link(moc) }, ...eigene.map(baueEintrag)],
    };
  };

  const groups = nachLabel(sichtbar.filter((moc) => moc.pfad.length === 1)).map((wurzel) => {
    erreicht.add(wurzel.knoten);
    const eigene = nachLabel(kinder.get(wurzel.knoten) || []);
    return {
      label: wurzel.label,
      items: [{ label: 'Übersicht', link: link(wurzel) }, ...eigene.map(baueEintrag)],
    };
  });

  // Ein Hub, dessen uebergeordneter Hub fehlt oder auf entwurf steht, haengt
  // an keinem Ast. Er verschwindet sonst lautlos aus dem Menue, deshalb wird
  // er gezaehlt und weiter unten gemeldet.
  const verwaist = sichtbar.filter((moc) => !erreicht.has(moc.knoten)).map((moc) => moc.knoten);

  return { groups, verwaist };
}

async function generateSidebarFromMocs() {
  const mocFiles = await walkMarkdownFiles(MOC_ROOT_DIR);
  const mocs = [];
  const yamlWarningFiles = [];
  const ohneEbeneFiles = [];
  const tiefen = [0, 0, 0];

  for (const file of mocFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = parseYamlFrontmatter(raw, { strict: true });
    if (!parsed.hasFrontmatter) continue;
    if (parsed.warnings.length > 0) {
      yamlWarningFiles.push(file);
      continue;
    }

    const pfad = ebenenPfad(parsed.frontmatter);
    if (pfad.length === 0) {
      ohneEbeneFiles.push(file);
      continue;
    }

    const sourceName = path.parse(file).name;
    const id = String(parsed.frontmatter.id ?? '').trim() || sourceName;
    const slug = slugify(id) || slugify(sourceName) || 'untitled';
    const label = buildMocLabel(parsed.frontmatter, parsed.body, sourceName);

    tiefen[pfad.length - 1] += 1;
    mocs.push({
      file,
      id,
      slug,
      label,
      status: String(parsed.frontmatter.status ?? '').trim(),
      // Bleibt undefined, wenn das Feld leer ist oder fehlt. Das Feld wird
      // allein hier gelesen und erreicht keine Astro-Komponente; es steht
      // deshalb weder im Schema noch im durchgereichten Frontmatter.
      reihenfolge: toNumber(parsed.frontmatter.reihenfolge),
      pfad,
      knoten: knotenSchluessel(pfad),
      tiefe: pfad.length,
      description: String(parsed.frontmatter.description ?? '').trim(),
    });
  }

  let { groups: sidebar, verwaist } = buildSidebarItemsFromMocs(mocs, false);
  let fallbackUsed = false;
  let adoptedCount = mocs.filter((moc) => normalizeLookupKey(String(moc.status ?? '')) === STATUS_ACTIVE)
    .length;
  if (sidebar.length === 0) {
    ({ groups: sidebar, verwaist } = buildSidebarItemsFromMocs(mocs, true));
    fallbackUsed = true;
    adoptedCount = mocs.filter((moc) => {
      const status = normalizeLookupKey(String(moc.status ?? ''));
      return status === STATUS_ACTIVE || status === STATUS_DRAFT;
    }).length;
    if (sidebar.length > 0) {
      console.warn('[warn] Sidebar fallback: entwurf included');
    }
  }

  for (const knoten of verwaist) {
    console.warn(`[warn] Hub ohne sichtbaren uebergeordneten Hub, fehlt im Menue: ${knoten}`);
  }
  for (const file of ohneEbeneFiles) {
    console.warn(`[warn] MOC-Notiz ohne ebene_1: ${file}`);
  }

  await fs.mkdir(path.dirname(GENERATED_SIDEBAR_FILE), { recursive: true });
  const sidebarModule = `// Auto-generated by scripts/export-wiki.mjs\nexport const sidebar = ${JSON.stringify(
    sidebar,
    null,
    2
  )};\n`;
  await fs.writeFile(GENERATED_SIDEBAR_FILE, sidebarModule, 'utf8');

  // Dieselbe Zuordnung, aus der buildBreadcrumbs() die Auszeichnung baut, noch
  // einmal als Datei fuer die Anzeige. Ohne sie muesste die Komponente die
  // Beschriftung aus dem Knotennamen formen, und dabei kaeme wieder
  // "Bpmn das Exklusive Gateway Xor" heraus.
  //
  // Bewusst alle Hubs, nicht nur die aus der Seitenleiste: Die Auszeichnung
  // kennt diese Einschraenkung auch nicht, und beide sollen dasselbe sagen.
  const breadcrumbMap = Object.fromEntries(
    mocs.map((moc) => [moc.knoten, { label: moc.label, slug: moc.slug }])
  );
  const breadcrumbModule = `// Auto-generated by scripts/export-wiki.mjs\nexport const breadcrumbs = ${JSON.stringify(
    breadcrumbMap,
    null,
    2
  )};\n`;
  await fs.writeFile(GENERATED_BREADCRUMBS_FILE, breadcrumbModule, 'utf8');

  return {
    mocs,
    totalMocs: mocs.length,
    ebene1Count: tiefen[0],
    ebene2Count: tiefen[1],
    ebene3Count: tiefen[2],
    adoptedCount,
    fallbackUsed,
    orphanCount: verwaist.length,
    missingEbeneCount: ohneEbeneFiles.length,
    yamlWarningsCount: yamlWarningFiles.length,
    yamlWarningFiles,
  };
}

async function main() {
  let scannedFiles = 0;
  let exportedFiles = 0;
  let skippedNoFrontmatter = 0;
  let skippedInternal = 0;
  let skippedStatusMissing = 0;
  let skippedStatusNotReady = 0;
  let skippedStatusVerworfen = 0;
  let brokenWikilinksCount = 0;
  let missingAssetsCount = 0;
  let descriptionsFromSummary = 0;
  let leadsFromSummary = 0;
  let descriptionsFromDescription = 0;
  let descriptionsMissing = 0;
  // Notizen ohne updated: — zugleich die Arbeitsliste fuer die Artikelueberarbeitung
  let missingUpdated = 0;
  const missingUpdatedSlugs = [];
  let missingOffer = 0;
  const missingOfferSlugs = [];
  const skippedSamples = [];
  const mocSummary = {
    totalMocs: 0,
    ebene1Count: 0,
    ebene2Count: 0,
    ebene3Count: 0,
    orphanCount: 0,
    missingEbeneCount: 0,
    adoptedCount: 0,
    fallbackUsed: false,
    yamlWarningsCount: 0,
    yamlWarningFiles: [],
  };

  // Der MOC-Baum, nach Knotenpfad ansprechbar. Frueher lagen hier nur die
  // Zusammenfassungen, angesprochen ueber id und Slug. Jetzt braucht der
  // Export den ganzen Knoten: fuer den semantic-context, fuer die
  // Brotkruemel und fuer den Waechter, der Notiz und Baum vergleicht.
  const mocNachKnoten = new Map();
  // Kinder je Knoten, unabhaengig vom Status: der Waechter soll auch dann
  // melden, wenn ein Zwischen-Hub nur auf entwurf steht.
  const mocKinder = new Map();
  // Notizen, deren Pfad im Baum keine Entsprechung hat
  let pfadOhneKnoten = 0;
  const pfadOhneKnotenSlugs = [];

  function addSkipSample(file, reason) {
    if (skippedSamples.length < 10) {
      skippedSamples.push(`${file} (${reason})`);
    }
  }

  await cleanExportDocsDir();
  const attachmentIndex = await buildAttachmentIndex();
  const mocResult = await generateSidebarFromMocs();
  Object.assign(mocSummary, mocResult);

  for (const m of mocResult.mocs || []) {
    mocNachKnoten.set(m.knoten, m);
    if (m.pfad.length < 2) continue;
    const eltern = knotenSchluessel(m.pfad.slice(0, -1));
    if (!mocKinder.has(eltern)) mocKinder.set(eltern, []);
    mocKinder.get(eltern).push(m);
  }

  // Der semantic-context kommt aus dem tiefsten gefuellten Ebenenfeld und
  // faellt nach oben zurueck, wenn dort keine description steht. Frueher kam
  // er aus parent_topic, also aus dem obersten Knoten: 47 von 59 Seiten
  // trugen dieselbe Zeile.
  function semantischerKontextAusPfad(pfad) {
    for (let i = pfad.length; i > 0; i -= 1) {
      const moc = mocNachKnoten.get(knotenSchluessel(pfad.slice(0, i)));
      if (moc && moc.description) return moc.description;
    }
    return '';
  }

  // Waechter: der Pfad steht in der Notiz und im MOC-Baum. Jede Stufe des
  // Pfades muss dort einen Knoten haben, sonst haengt die Notiz an einer
  // Kette mit Luecke. Dieselbe Mechanik wie missingUpdated und missingOffer.
  function pruefePfad(pfad, slug) {
    const fehlend = [];
    for (let i = 1; i <= pfad.length; i += 1) {
      const knoten = knotenSchluessel(pfad.slice(0, i));
      if (!mocNachKnoten.has(knoten)) fehlend.push(knoten);
    }
    if (fehlend.length > 0) {
      pfadOhneKnoten += 1;
      pfadOhneKnotenSlugs.push(`${slug} (kein Hub fuer: ${fehlend.join(', ')})`);
    }
    return fehlend;
  }

  const markdownFiles = await walkMarkdownFiles(SOURCE_VAULT);
  scannedFiles = markdownFiles.length;

  const candidates = [];
  for (const file of markdownFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const { hasFrontmatter, frontmatter, body } = parseFrontmatter(raw);
    if (!hasFrontmatter) {
      skippedNoFrontmatter += 1;
      addSkipSample(file, 'noFrontmatter');
      continue;
    }

    if (!Object.hasOwn(frontmatter, 'status') || String(frontmatter.status).trim() === '') {
      skippedStatusMissing += 1;
      addSkipSample(file, 'statusMissing');
      continue;
    }

    const status = String(frontmatter.status).trim();
    if (status === STATUS_REJECTED) {
      skippedStatusVerworfen += 1;
      addSkipSample(file, 'statusVerworfen');
      continue;
    }

    // New logic: MOCs (in 10_expertise_map) need "aktiv", others need "ki_ready"
    const isMoc = file.replace(/\\/g, '/').includes('/10_expertise_map/');
    const requiredStatus = isMoc ? STATUS_ACTIVE : STATUS_READY;

    if (status !== requiredStatus) {
      // Special case: Allow ki_ready for MOCs too (just in case), or actively enforce difference?
      // Requirement says: MOCs -> aktiv, IP-atoms -> ki_ready.
      // Let's be strict as requested:
      // "bei den moc (die dateien in 10_expertise_map) über aktiv und entwurf."

      // However, if an MOC is accidentally "ki_ready", we probably shouldn't block it?
      // User said: "Hinweis: Für MOCs ist „ki_ready“ nicht sinnvoll." -> So strict check is good.

      skippedStatusNotReady += 1;
      addSkipSample(file, `statusNotReady (expected ${requiredStatus}, got ${status})`);
      continue;
    }

    const parsed = path.parse(file);
    const sourceName = parsed.name;
    const rawId = String(frontmatter.id ?? '').trim();
    const slug = slugify(rawId || sourceName) || slugify(sourceName) || 'untitled';

    // Interne Vault-Seiten gehoeren nicht ins oeffentliche Wiki
    if (EXCLUDED_SLUGS.includes(slug)) {
      skippedInternal += 1;
      addSkipSample(file, 'internalVaultPage');
      continue;
    }

    const aliases = Array.isArray(frontmatter.aliases)
      ? frontmatter.aliases.map((value) => String(value).trim()).filter(Boolean)
      : [];

    // Kein Datum ohne Frontmatter-Angabe. Der Rueckfall auf die Dateizeit erzeugte
    // im CI-Checkout das Deploy-Datum statt einer echten Aenderung — eine
    // ueberpruefbare Falschangabe in strukturierten Daten.
    // Standards-Wiki, Abschnitt 4.
    const datePublished = frontmatter.created ? formatDate(frontmatter.created) : '';
    const dateModified = frontmatter.updated ? formatDate(frontmatter.updated) : '';

    if (!dateModified) {
      missingUpdated += 1;
      missingUpdatedSlugs.push(slug);
    }

    // Der Rueckfall auf die Dateizeit ist mit Paket 3 ersatzlos entfallen. Kein
    // sichtbares Datum stammt mehr aus dem Dateisystem: Die Komponente zeigt eine
    // Datumszeile nur, wenn updated gesetzt und echt groesser als created ist.
    // Standards-Wiki, Abschnitt 4, Entscheidung vom 28.08.2026.

    // Angebotsverweis: Inhalt je Notiz, Form aus der Komponente. Die H2 aus
    // offer_heading ist eine unverlinkte Ueberleitung, der Link steht als
    // Inline-Markdown in offer_text. Muster in Verlinkungsmatrix, Abschnitt
    // "Muster fuer den Verweis".
    const offerHeading = String(frontmatter.offer_heading ?? '').trim();
    const offerText = String(frontmatter.offer_text ?? '').trim();
    const offerLinks = offerText.match(/\[[^\]]+\]\([^)]*\)/g) ?? [];
    const offerTarget =
      offerLinks.length === 1 ? (offerLinks[0].match(/\(([^)]*)\)/)?.[1] ?? '').trim() : '';
    const offerTargetOk = offerTarget.startsWith('/') && offerTarget.endsWith('/');
    const hasOffer = Boolean(offerHeading && offerText && offerLinks.length === 1 && offerTargetOk);

    if (!hasOffer) {
      missingOffer += 1;
      let reason;
      if (!offerHeading && !offerText) reason = 'offer_heading und offer_text fehlen';
      else if (!offerHeading) reason = 'offer_heading fehlt';
      else if (!offerText) reason = 'offer_text fehlt';
      else if (offerLinks.length !== 1) reason = `genau ein Link noetig, gefunden: ${offerLinks.length}`;
      else reason = `Ziel muss mit / beginnen und enden: ${offerTarget}`;
      missingOfferSlugs.push(`${slug} (${reason})`);
    }

    const h1 = extractFirstH1(body);
    const title = frontmatter.title ? String(frontmatter.title) : (h1 || toTitleCase(sourceName));

    // Der Pfad aus den Ebenenfeldern. Er ersetzt parent_topic und subtopic
    // und steuert Artikelliste, semantic-context und Brotkruemel.
    const pfad = ebenenPfad(frontmatter);
    pruefePfad(pfad, slug);

    candidates.push({
      file,
      pfad,
      knoten: knotenSchluessel(pfad),
      id: rawId || sourceName,
      slug,
      rawId,
      sourceName,
      aliases,
      title,
      frontmatter,
      body,
      datePublished,
      dateModified,
      offerHeading,
      offerText,
      hasOffer,
    });
  }

  const routeMap = new Map();
  const keyOwnerMap = new Map();

  function addLookupKey(key, route, sourceRef) {
    const normalized = normalizeLookupKey(key);
    if (!normalized) return;
    const existing = routeMap.get(normalized);
    if (existing && existing !== route) {
      console.warn(
        `[warn] Key collision for "${normalized}" between ${keyOwnerMap.get(normalized)} and ${sourceRef}`
      );
      return;
    }
    routeMap.set(normalized, route);
    keyOwnerMap.set(normalized, sourceRef);
  }

  for (const candidate of candidates) {
    const route = buildRoute(candidate.slug);
    addLookupKey(candidate.slug, route, `${candidate.file} (id/slug)`);
    if (candidate.rawId) {
      addLookupKey(candidate.rawId, route, `${candidate.file} (raw id)`);
    }
    for (const alias of candidate.aliases) {
      addLookupKey(alias, route, `${candidate.file} (alias)`);
    }
    addLookupKey(candidate.sourceName, route, `${candidate.file} (sourceName)`);
    if (candidate.frontmatter.title) {
      addLookupKey(String(candidate.frontmatter.title), route, `${candidate.file} (title)`);
    }
  }
  // Artikel je Knoten. Frueher zwei getrennte Karten nach parent_topic und
  // subtopic, also genau zwei Ebenen. Jetzt ein Eintrag je Knotenpfad; die
  // Tiefe ist nicht mehr begrenzt.
  const artikelNachKnoten = new Map();

  for (const candidate of candidates) {
    const isMoc = candidate.file.replace(/\\/g, '/').includes('/10_expertise_map/');
    if (isMoc) continue;
    if (candidate.pfad.length === 0) continue;
    const knoten = candidate.knoten;
    if (!artikelNachKnoten.has(knoten)) artikelNachKnoten.set(knoten, []);
    artikelNachKnoten.get(knoten).push(candidate);
  }

  const nachTitel = (liste) =>
    liste.slice().sort((a, b) => a.title.localeCompare(b.title, 'de', { sensitivity: 'base' }));

  // Alle Artikel eines Knotens samt seiner untergeordneten Knoten.
  function artikelImTeilbaum(knoten) {
    const eigene = artikelNachKnoten.get(knoten) || [];
    const kinder = mocKinder.get(knoten) || [];
    return [...eigene, ...kinder.flatMap((kind) => artikelImTeilbaum(kind.knoten))];
  }

  for (const candidate of candidates) {
    const isMoc = candidate.file.replace(/\\/g, '/').includes('/10_expertise_map/');
    let body = cleanVaultArtifacts(candidate.body);

    // Strip .base embeds: ![[...base]] or ![[...base|alias]]
    body = body.replace(/!\[\[([^\]]+\.base(\|[^\]]*)?)\]\]/g, '');

    body = await (async () => {
      const pattern = /!\[\[([^\]]+)\]\]/g;
      let out = '';
      let lastIndex = 0;
      let match;
      while ((match = pattern.exec(body)) !== null) {
        out += body.slice(lastIndex, match.index);
        const inner = match[1].trim();
        const [embedTargetRaw] = inner.split('|');
        const filename = path.basename(extractLinkTarget(embedTargetRaw || '').trim());
        const resolved = await copyAttachmentByNameIfExists(filename, attachmentIndex);
        if (!resolved.copied) {
          missingAssetsCount += 1;
          console.warn(`[warn] Missing asset: ${filename} (source: ${candidate.file})`);
          out += match[0];
        } else {
          if (resolved.fuzzyMatched) {
            console.warn(
              `[warn] Fuzzy asset match: ${filename} -> ${resolved.sourceName} (source: ${candidate.file})`
            );
          }
          out += `![](${BASE_PREFIX}/wiki-assets/${encodeURIComponent(resolved.filename)})`;
        }
        lastIndex = pattern.lastIndex;
      }
      out += body.slice(lastIndex);
      return out;
    })();

    body = await (async () => {
      const pattern = /!\[([^\]]*)\]\(([^)\r\n]+)\)/g;
      let out = '';
      let lastIndex = 0;
      let match;
      while ((match = pattern.exec(body)) !== null) {
        out += body.slice(lastIndex, match.index);

        const rawTarget = match[2].trim();
        if (/^https?:\/\//i.test(rawTarget) || rawTarget.startsWith('/')) {
          out += match[0];
          lastIndex = pattern.lastIndex;
          continue;
        }

        const normalizedTarget =
          rawTarget.startsWith('<') && rawTarget.endsWith('>')
            ? rawTarget.slice(1, -1).trim()
            : rawTarget;
        const imageName = path.basename(normalizedTarget);
        const resolved = await copyAttachmentByNameIfExists(imageName, attachmentIndex);
        if (!resolved.copied) {
          missingAssetsCount += 1;
          console.warn(`[warn] Missing asset: ${imageName} (source: ${candidate.file})`);
          out += match[0];
        } else {
          if (resolved.fuzzyMatched) {
            console.warn(
              `[warn] Fuzzy asset match: ${imageName} -> ${resolved.sourceName} (source: ${candidate.file})`
            );
          }
          out += `![](${BASE_PREFIX}/wiki-assets/${encodeURIComponent(resolved.filename)})`;
        }

        lastIndex = pattern.lastIndex;
      }

      out += body.slice(lastIndex);
      return out;
    })();

    body = body.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
      const [targetRaw, aliasRaw] = inner.split('|');
      const { target, heading } = splitWikilinkTarget(targetRaw || '');
      const label = (aliasRaw || target || heading || '').trim();
      if (/^https?:\/\//i.test(target)) {
        const externalHref = heading ? `${target}#${headingSlug(heading)}` : target;
        const externalText = label || target;
        return `[${externalText}](${externalHref})`;
      }

      const route = resolveInternalRoute(routeMap, target);
      if (!route) {
        brokenWikilinksCount += 1;
        console.warn(`[warn] Broken wikilink: [[${inner}]] (source: ${candidate.file})`);
        const fallback = label || target || 'Link';
        return `[${fallback}](#)`;
      }
      const text = label || target;
      const anchor = heading ? `#${headingSlug(heading)}` : '';
      return `[${text}](${route}${anchor})`;
    });

    // Artikelliste am Ende der Hub-Seite.
    //
    // Frueher gab es hier einen Sonderweg fuer /wiki/prozessmanagement/: Die
    // Links wurden an fuenf Ueberschriften im Body eingehaengt, gesteuert
    // ueber intent, und die Stelle wurde ueber die Adresse erkannt. Das war
    // auf eine Doppelung der Ueberschriften im Notiz-Body angewiesen.
    //
    // Jetzt gilt fuer jede Hub-Seite dieselbe Regel, ohne Sonderfall und ohne
    // Suche im Body: Der Hub listet seine eigenen Artikel und die aller
    // untergeordneten Knoten, gruppiert nach Bereich.
    if (isMoc && candidate.pfad.length > 0) {
      const eigene = nachTitel(artikelNachKnoten.get(candidate.knoten) || []);
      // Dieselbe Sortierung wie in der Seitenleiste. Beide muessen dieselbe
      // Reihenfolge zeigen, sonst widersprechen sich Navigation und
      // Seiteninhalt.
      const kinder = sortiereGeschwister(mocKinder.get(candidate.knoten) || []);
      const gruppen = kinder
        .map((kind) => ({ label: kind.label, artikel: nachTitel(artikelImTeilbaum(kind.knoten)) }))
        .filter((gruppe) => gruppe.artikel.length > 0);

      if (eigene.length > 0 || gruppen.length > 0) {
        body += '\n\n## Zugehörige Artikel\n';

        // Artikel, die unmittelbar am Hub haengen, stehen ohne
        // Bereichsueberschrift und vor den Gruppen.
        if (eigene.length > 0) {
          body += '\n';
          for (const ip of eigene) {
            body += `- [[${ip.id}|${ip.title}]]\n`;
          }
        }

        // Je untergeordnetem Knoten eine Ueberschrift mit dem Titel des
        // Unterhubs. Artikel tieferer Knoten stehen in der Gruppe ihres
        // Unterhubs mit, damit die uebergeordnete Seite vollstaendig bleibt.
        for (const gruppe of gruppen) {
          body += `\n### ${gruppe.label}\n\n`;
          for (const ip of gruppe.artikel) {
            body += `- [[${ip.id}|${ip.title}]]\n`;
          }
        }

        // Die eben eingefuegten Wikilinks aufloesen.
        body = body.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
          const [targetRaw, aliasRaw] = inner.split('|');
          const { target, heading } = splitWikilinkTarget(targetRaw || '');
          const label = (aliasRaw || target || heading || '').trim();
          const route = resolveInternalRoute(routeMap, target);
          if (!route) return `[${label || target}](#)`;
          const anchor = heading ? `#${headingSlug(heading)}` : '';
          return `[${label || target}](${route}${anchor})`;
        });
      }
    }

    const sourceDescription = String(candidate.frontmatter.description ?? '').trim();
    const sourceSummary = String(candidate.frontmatter.summary ?? '').trim();
    let description = '';
    if (sourceDescription) {
      const sanitizedDescription = sanitizeDescription(sourceDescription);
      if (sanitizedDescription) {
        description = sanitizedDescription;
        descriptionsFromDescription += 1;
      }
    }
    if (!description && sourceSummary) {
      description = sanitizeDescription(sourceSummary);
      if (description) {
        descriptionsFromSummary += 1;
      }
    }
    if (!description) {
      descriptionsMissing += 1;
      console.warn(`[warn] Missing description/summary (source: ${candidate.file})`);
    }

    const sourceOrder = candidate.frontmatter.sidebar_order ?? candidate.frontmatter.order;
    const sourceHidden = candidate.frontmatter.sidebar_hidden ?? candidate.frontmatter.hidden;
    const sidebarOrder = toNumber(sourceOrder);
    const sidebarHidden = toBool(sourceHidden);

    const canonicalHref = `${SITE}${buildRoute(candidate.slug)}`;

    // type traegt seit der Struktur-Migration die schema.org-Namen und
    // erreicht damit erstmals die Ausgabe. Vorher stand hier fest Article,
    // auch fuer die Hub-Seiten.
    const TYPEN_ERLAUBT = ['Article', 'HowTo', 'CollectionPage'];
    const sourceType = String(candidate.frontmatter.type ?? '').trim();
    if (sourceType && !TYPEN_ERLAUBT.includes(sourceType)) {
      console.warn(`[warn] type unbekannt, Article gesetzt: ${sourceType} (source: ${candidate.file})`);
    }
    const schemaType = TYPEN_ERLAUBT.includes(sourceType) ? sourceType : 'Article';
    // HowTo stammt direkt von CreativeWork ab und traegt articleSection
    // nicht. Deshalb beide Typen, damit die Angabe gueltig bleibt.
    const jsonLdType = schemaType === 'HowTo' ? ['Article', 'HowTo'] : schemaType;
    // articleSection kommt aus der tiefsten gefuellten Ebene.
    const articleSection = candidate.pfad.length > 1 ? candidate.pfad[candidate.pfad.length - 1] : '';
    const sourceImage = String(candidate.frontmatter.image ?? '').trim();

    // Expanded JSON-LD
    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': jsonLdType,
          '@id': `${canonicalHref}#article`,
          headline: candidate.title,
          url: canonicalHref,
          author: {
            '@type': 'Person',
            '@id': AUTHOR_DATA.personId,
            name: AUTHOR_DATA.name,
            url: AUTHOR_DATA.url,
            sameAs: [AUTHOR_DATA.linkedin],
            jobTitle: AUTHOR_DATA.expertise
          },
          publisher: {
            '@type': 'Organization',
            '@id': AUTHOR_DATA.organizationId,
            name: AUTHOR_DATA.organization,
            url: AUTHOR_DATA.organizationUrl,
            logo: {
              '@type': 'ImageObject',
              url: AUTHOR_DATA.organizationLogo,
              width: 512,
              height: 512
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalHref
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalHref}#breadcrumb`,
          itemListElement: buildBreadcrumbs(candidate.slug, candidate.title, candidate.pfad, mocNachKnoten)
        }
      ]
    };

    if (description) {
      jsonLd['@graph'][0].description = description;
    }

    // articleSection nur, wo es eine Fachebene gibt. CollectionPage traegt
    // die Eigenschaft nicht, Hub-Seiten bekommen sie deshalb nicht.
    if (articleSection && schemaType !== 'CollectionPage') {
      jsonLd['@graph'][0].articleSection = articleSection;
    }

    // image nur, wenn im Frontmatter etwas steht. Ein leeres Feld erzeugt
    // keine Angabe.
    if (sourceImage) {
      jsonLd['@graph'][0].image = sourceImage;
    }

    // Nur ausgeben, was im Frontmatter tatsaechlich steht — kein Datum ist
    // besser als ein falsches.
    if (candidate.datePublished) {
      jsonLd['@graph'][0].datePublished = candidate.datePublished;
    }
    if (candidate.dateModified) {
      jsonLd['@graph'][0].dateModified = candidate.dateModified;
    }

    // Add DefinedTerm logic for MOCs or definitions
    if (isMoc || candidate.title.toLowerCase().includes('definition')) {
      jsonLd['@graph'].push({
        '@type': 'DefinedTerm',
        '@id': `${canonicalHref}#term`,
        name: candidate.title,
        description: description,
        inDefinedTermSet: `${SITE}${BASE}/`
      });
    }

    const ragContext = extractRagContext(candidate.body);

    // Der semantic-context kommt aus dem tiefsten gefuellten Ebenenfeld.
    // Das Feld semantic_context bleibt als Handuebersteuerung bestehen und
    // wird in keiner Notiz gepflegt; es hat Vorrang, wenn es doch einmal
    // gesetzt wird.
    let semanticContext = String(candidate.frontmatter.semantic_context ?? '').trim();
    if (!semanticContext) {
      semanticContext = semantischerKontextAusPfad(candidate.pfad);
    }

    const frontmatterLines = ['---', `title: ${yamlQuote(candidate.title)}`];
    if (description) {
      frontmatterLines.push(`description: ${yamlQuote(description)}`);
    }
    frontmatterLines.push(`slug: ${yamlQuote(candidate.slug)}`);

    // Durchreichen nach src/content/docs, damit die Artikelfuss-Komponente die
    // Werte lesen kann. Die JSON-LD-Erzeugung weiter unten bleibt davon
    // unberuehrt und zieht ihre Werte weiterhin aus denselben Variablen.
    if (candidate.datePublished) {
      frontmatterLines.push(`created: ${yamlQuote(candidate.datePublished)}`);
    }
    if (candidate.dateModified) {
      frontmatterLines.push(`updated: ${yamlQuote(candidate.dateModified)}`);
    }
    if (candidate.hasOffer) {
      frontmatterLines.push(`offer_heading: ${yamlQuote(candidate.offerHeading)}`);
      frontmatterLines.push(`offer_text: ${yamlQuote(candidate.offerText)}`);
    }

    // type, image und die Ebenenfelder durchreichen. Ohne die Erweiterung in
    // src/content.config.ts weist Astro sie zurueck; beide Haelften gehoeren
    // zusammen.
    frontmatterLines.push(`type: ${yamlQuote(schemaType)}`);
    if (sourceImage) {
      frontmatterLines.push(`image: ${yamlQuote(sourceImage)}`);
    }
    candidate.pfad.forEach((wert, i) => {
      frontmatterLines.push(`ebene_${i + 1}: ${yamlQuote(wert)}`);
    });

    frontmatterLines.push('head:');
    // Reiner Inhaltstitel ohne den Zusatz "| Wissen & Werkzeug Wiki"
    frontmatterLines.push('  - tag: title');
    frontmatterLines.push(`    content: ${yamlQuote(candidate.title)}`);
    frontmatterLines.push('  - tag: link');
    frontmatterLines.push('    attrs:');
    frontmatterLines.push('      rel: canonical');
    frontmatterLines.push(`      href: ${yamlQuote(canonicalHref)}`);

    if (EXCLUDED_SLUGS.includes(candidate.slug)) {
      frontmatterLines.push('  - tag: meta');
      frontmatterLines.push('    attrs:');
      frontmatterLines.push('      name: "robots"');
      frontmatterLines.push('      content: "noindex, nofollow"');
    }
    frontmatterLines.push('  - tag: script');
    frontmatterLines.push('    attrs:');
    frontmatterLines.push('      type: application/ld+json');
    frontmatterLines.push(`    content: ${yamlQuote(JSON.stringify(jsonLd))}`);

    if (semanticContext) {
      frontmatterLines.push('  - tag: meta');
      frontmatterLines.push('    attrs:');
      frontmatterLines.push('      name: semantic-context');
      frontmatterLines.push(`      content: ${yamlQuote(semanticContext)}`);
    }

    if (ragContext) {
      frontmatterLines.push('  - tag: meta');
      frontmatterLines.push('    attrs:');
      frontmatterLines.push('      name: rag-context');
      frontmatterLines.push(`      content: ${yamlQuote(ragContext)}`);
    }

    if (sidebarOrder !== undefined || sidebarHidden !== undefined) {
      frontmatterLines.push('sidebar:');
      if (sidebarOrder !== undefined) {
        frontmatterLines.push(`  order: ${sidebarOrder}`);
      }
      if (sidebarHidden !== undefined) {
        frontmatterLines.push(`  hidden: ${sidebarHidden}`);
      }
    }

    // Strip the RAG context block from the body so it's not visible to readers
    let bodyWithoutRag = body.replace(/%%\r?\n\s*RAG-CONTEXT-ANCHOR:\s*\r?\n[\s\S]*?\r?\n\s*%%/g, '').trim();

    // Remove the first H1 from the body (it's already in the frontmatter as 'title' and rendered by Starlight)
    bodyWithoutRag = bodyWithoutRag.replace(/^#\s+.+\r?\n?/, '').trim();

    // Der Lead-Absatz der Designvorlage. Er steht im Bestand als Blockzitat
    // unter einer H2 "Zusammenfassung"; beides wandert ins Frontmatter und
    // wird von ArticleLead.astro oberhalb des Inhalts ausgegeben. Damit faellt
    // auch der Eintrag "Zusammenfassung" aus dem Verzeichnis der Seite weg.
    const { lead, body: bodyOhneLead } = extractLead(bodyWithoutRag);
    if (lead) {
      frontmatterLines.push(`lead: ${yamlQuote(lead)}`);
      bodyWithoutRag = bodyOhneLead;
      leadsFromSummary += 1;
    }

    // Der Autorenblock wird nicht mehr in den Body geschrieben. Er entsteht seit
    // Paket 3 zentral in src/components/ArticleFooter.astro, gemeinsam mit dem
    // Angebotsverweis. AUTHOR_DATA bleibt die Quelle der maschinenlesbaren
    // Autorenangabe im JSON-LD oben.
    frontmatterLines.push('---');
    const output = `${frontmatterLines.join('\n')}\n\n${bodyWithoutRag}\n`;
    const outputFile = path.join(OUT_DOCS_DIR, `${candidate.slug}.md`);
    await fs.writeFile(outputFile, output, 'utf8');
    exportedFiles += 1;
  }

  const bestandsaufnahme = await writeBestandsaufnahme(candidates, missingUpdatedSlugs);

  console.log(`[summary] scannedFiles: ${scannedFiles}`);
  console.log(`[summary] exportedFiles: ${exportedFiles}`);
  console.log(`[summary] skipped.noFrontmatter: ${skippedNoFrontmatter}`);
  console.log(`[summary] skipped.internalVaultPage: ${skippedInternal}`);
  console.log(`[summary] skipped.statusMissing: ${skippedStatusMissing}`);
  console.log(`[summary] skipped.statusNotReady: ${skippedStatusNotReady}`);
  console.log(`[summary] skipped.statusVerworfen: ${skippedStatusVerworfen}`);
  console.log(`[summary] brokenWikilinksCount: ${brokenWikilinksCount}`);
  console.log(`[summary] missingAssetsCount: ${missingAssetsCount}`);
  console.log(`[summary] descriptionsFromSummary: ${descriptionsFromSummary}`);
  console.log(`[summary] leadsFromSummary: ${leadsFromSummary}`);
  console.log(`[summary] descriptionsFromDescription: ${descriptionsFromDescription}`);
  console.log(`[summary] descriptionsMissing: ${descriptionsMissing}`);
  console.log(`[summary] missingUpdated: ${missingUpdated}`);
  console.log(`[summary] missingOffer: ${missingOffer}`);
  console.log(`[summary] pfadOhneKnoten: ${pfadOhneKnoten}`);
  console.log(`[summary] bestandsaufnahme.articlesWithQuestions: ${bestandsaufnahme.articlesWithQuestions}`);
  console.log(`[summary] bestandsaufnahme.questionsTotal: ${bestandsaufnahme.questionsTotal}`);
  console.log(`[summary] bestandsaufnahme.relatedEntries: ${bestandsaufnahme.relatedTotal}`);
  console.log(`[summary] bestandsaufnahme.shortDescriptions: ${bestandsaufnahme.shortDescriptions}`);
  console.log(`[summary] bestandsaufnahme.report: ${REPORT_FILE}`);
  console.log(`[summary] mocs.total: ${mocSummary.totalMocs}`);
  console.log(`[summary] mocs.ebene1: ${mocSummary.ebene1Count}`);
  console.log(`[summary] mocs.ebene2: ${mocSummary.ebene2Count}`);
  console.log(`[summary] mocs.ebene3: ${mocSummary.ebene3Count}`);
  console.log(`[summary] mocs.verwaist: ${mocSummary.orphanCount}`);
  console.log(`[summary] mocs.ohneEbene: ${mocSummary.missingEbeneCount}`);
  console.log(`[summary] mocs.inSidebar: ${mocSummary.adoptedCount}`);
  console.log(`[summary] mocs.fallbackUsed: ${mocSummary.fallbackUsed}`);
  console.log(`[summary] mocs.yamlWarnings: ${mocSummary.yamlWarningsCount}`);
  if (mocSummary.yamlWarningFiles.length > 0) {
    const maxWarnings = 20;
    console.log(`[summary] mocs.yamlWarningFiles (max ${maxWarnings}):`);
    const sampleWarnings = mocSummary.yamlWarningFiles.slice(0, maxWarnings);
    for (const warningFile of sampleWarnings) {
      console.log(`- ${warningFile}`);
    }
    if (mocSummary.yamlWarningFiles.length > maxWarnings) {
      console.log(`... +${mocSummary.yamlWarningFiles.length - maxWarnings} more`);
    }
  }
  // Warnliste, kein Abbruch: diese Notizen erhalten kein dateModified und sind
  // zugleich die Arbeitsliste fuer die Artikelueberarbeitung.
  if (missingUpdatedSlugs.length > 0) {
    console.log(`[warn] Notizen ohne updated: (${missingUpdatedSlugs.length}) — kein dateModified:`);
    for (const slug of [...missingUpdatedSlugs].sort()) {
      console.log(`- ${slug}`);
    }
  }
  // Zweite Warnliste, bewusst getrennt gefuehrt: missingUpdated ist ein
  // dokumentierter Pruefwert aus Paket 1 und darf nicht zwei Sachverhalte
  // vermischen. Fehlt eines der drei offer_-Felder, entfaellt der Block.
  // Waechter: der Pfad steht in der Notiz und im MOC-Baum. Weicht er ab,
  // haengt die Notiz an einer Kette mit Luecke und verschwindet aus der
  // Artikelliste ihres Hubs, ohne dass etwas fehlschlaegt.
  if (pfadOhneKnotenSlugs.length > 0) {
    console.log(`[warn] Notizen, deren Ebenenfelder auf einen Knoten ohne Hub zeigen (${pfadOhneKnotenSlugs.length}):`);
    for (const eintrag of pfadOhneKnotenSlugs) {
      console.log(`  - ${eintrag}`);
    }
  }

  if (missingOfferSlugs.length > 0) {
    console.log(`[warn] Notizen ohne vollstaendigen Angebotsverweis (${missingOfferSlugs.length}) — offer_heading, offer_text und offer_link noetig:`);
    for (const slug of [...missingOfferSlugs].sort()) {
      console.log(`- ${slug}`);
    }
  }
  if (skippedSamples.length > 0) {
    console.log('[summary] skipSamples (max 10):');
    for (const sample of skippedSamples) {
      console.log(`- ${sample}`);
    }
  }
}

main().catch((error) => {
  console.error('[error] export failed');
  console.error(error);
  process.exit(1);
});

