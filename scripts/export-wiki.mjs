import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_VAULT = 'vault';
const MOC_ROOT_DIR = 'vault/10_expertise_map';
const ATTACHMENTS_DIR = 'vault/00_system/attachments';
const OUT_DOCS_DIR = 'src/content/docs';
const LEGACY_OUT_DOCS_DIR = 'src/content/docs/fach-expertise';
const OUT_ASSETS_DIR = 'public/wiki-assets';
const GENERATED_SIDEBAR_FILE = 'src/generated/sidebar.mjs';
const STATUS_READY = 'ki_ready';
const STATUS_REJECTED = 'verworfen';
const STATUS_ACTIVE = 'aktiv';
const STATUS_DRAFT = 'entwurf';
const SITE = 'https://www.wissen-und-werkzeug.de';
const BASE = '/wiki';
const BASE_PREFIX = BASE;

const SKIP_DIRS = new Set(['.obsidian', '.trash', '_private']);

function toTitleCase(input) {
  return input
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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

function slugify(input) {
  return String(input ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
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
    .join(' ');
}

function yamlQuote(input) {
  return `"${String(input).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ')}"`;
}

function sanitizeDescription(input) {
  let text = String(input ?? '');
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

function buildSidebarItemsFromMocs(mocs, includeDraft) {
  const parents = new Map();

  for (const moc of mocs) {
    const status = normalizeLookupKey(String(moc.status ?? ''));
    if (status === STATUS_REJECTED) continue;
    if (status !== STATUS_ACTIVE && !(includeDraft && status === STATUS_DRAFT)) continue;

    if (moc.level === 'parent') {
      const parentKey = moc.parentTopic || moc.id;
      const node = parents.get(parentKey) ?? {
        key: parentKey,
        label: toTitleCase(parentKey),
        parentMoc: null,
        subtopics: [],
      };
      node.label = moc.label || node.label;
      node.parentMoc = moc;
      parents.set(parentKey, node);
      continue;
    }

    if (moc.level === 'subtopic') {
      const parentKey = moc.parentTopic;
      const node = parents.get(parentKey) ?? {
        key: parentKey,
        label: toTitleCase(parentKey),
        parentMoc: null,
        subtopics: [],
      };
      node.subtopics.push(moc);
      parents.set(parentKey, node);
    }
  }

  const groups = Array.from(parents.values())
    .map((node) => {
      if (!node.parentMoc && node.subtopics.length === 0) return null;
      const items = [];
      if (node.parentMoc) {
        items.push({
          label: 'Uebersicht',
          link: buildRoute(node.parentMoc.slug).replace(BASE_PREFIX, '') || '/',
        });
      }

      const subtopics = node.subtopics
        .slice()
        .sort((a, b) => a.label.localeCompare(b.label, 'de', { sensitivity: 'base' }));
      for (const subtopic of subtopics) {
        items.push({
          label: subtopic.label,
          link: buildRoute(subtopic.slug).replace(BASE_PREFIX, '') || '/',
        });
      }

      return {
        label: node.label,
        items,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.label.localeCompare(b.label, 'de', { sensitivity: 'base' }));

  return groups;
}

async function generateSidebarFromMocs() {
  const mocFiles = await walkMarkdownFiles(MOC_ROOT_DIR);
  const mocs = [];
  const yamlWarningFiles = [];
  let parentCount = 0;
  let subtopicCount = 0;

  for (const file of mocFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = parseYamlFrontmatter(raw, { strict: true });
    if (!parsed.hasFrontmatter) continue;
    if (parsed.warnings.length > 0) {
      yamlWarningFiles.push(file);
      continue;
    }

    const level = normalizeLookupKey(String(parsed.frontmatter.moc_level ?? ''));
    if (level !== 'parent' && level !== 'subtopic') {
      continue;
    }

    const sourceName = path.parse(file).name;
    const id = String(parsed.frontmatter.id ?? '').trim() || sourceName;
    const slug = slugify(id) || slugify(sourceName) || 'untitled';
    const label = buildMocLabel(parsed.frontmatter, parsed.body, sourceName);
    const parentTopicRaw = String(parsed.frontmatter.parent_topic ?? '').trim();
    const parentTopic = slugify(parentTopicRaw || (level === 'parent' ? id : ''));
    const subtopic = String(parsed.frontmatter.subtopic ?? '').trim();

    if (level === 'subtopic' && (!parentTopic || !subtopic)) {
      yamlWarningFiles.push(file);
      continue;
    }

    if (level === 'parent') parentCount += 1;
    if (level === 'subtopic') subtopicCount += 1;

    mocs.push({
      file,
      id,
      slug,
      label,
      level,
      status: String(parsed.frontmatter.status ?? '').trim(),
      parentTopic,
      subtopic,
    });
  }

  let sidebar = buildSidebarItemsFromMocs(mocs, false);
  let fallbackUsed = false;
  let adoptedCount = mocs.filter((moc) => normalizeLookupKey(String(moc.status ?? '')) === STATUS_ACTIVE)
    .length;
  if (sidebar.length === 0) {
    sidebar = buildSidebarItemsFromMocs(mocs, true);
    fallbackUsed = true;
    adoptedCount = mocs.filter((moc) => {
      const status = normalizeLookupKey(String(moc.status ?? ''));
      return status === STATUS_ACTIVE || status === STATUS_DRAFT;
    }).length;
    if (sidebar.length > 0) {
      console.warn('[warn] Sidebar fallback: entwurf included');
    }
  }

  await fs.mkdir(path.dirname(GENERATED_SIDEBAR_FILE), { recursive: true });
  const sidebarModule = `// Auto-generated by scripts/export-wiki.mjs\nexport const sidebar = ${JSON.stringify(
    sidebar,
    null,
    2
  )};\n`;
  await fs.writeFile(GENERATED_SIDEBAR_FILE, sidebarModule, 'utf8');

  return {
    totalMocs: mocs.length,
    parentCount,
    subtopicCount,
    adoptedCount,
    fallbackUsed,
    yamlWarningsCount: yamlWarningFiles.length,
    yamlWarningFiles,
  };
}

async function main() {
  let scannedFiles = 0;
  let exportedFiles = 0;
  let skippedNoFrontmatter = 0;
  let skippedStatusMissing = 0;
  let skippedStatusNotReady = 0;
  let skippedStatusVerworfen = 0;
  let brokenWikilinksCount = 0;
  let missingAssetsCount = 0;
  let descriptionsFromSummary = 0;
  let descriptionsFromDescription = 0;
  let descriptionsMissing = 0;
  const skippedSamples = [];
  const mocSummary = {
    totalMocs: 0,
    parentCount: 0,
    subtopicCount: 0,
    adoptedCount: 0,
    fallbackUsed: false,
    yamlWarningsCount: 0,
    yamlWarningFiles: [],
  };

  function addSkipSample(file, reason) {
    if (skippedSamples.length < 10) {
      skippedSamples.push(`${file} (${reason})`);
    }
  }

  await cleanExportDocsDir();
  const attachmentIndex = await buildAttachmentIndex();
  Object.assign(mocSummary, await generateSidebarFromMocs());

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
    const aliases = Array.isArray(frontmatter.aliases)
      ? frontmatter.aliases.map((value) => String(value).trim()).filter(Boolean)
      : [];
    const title = frontmatter.title ? String(frontmatter.title) : toTitleCase(sourceName);
    candidates.push({
      file,
      id: rawId || sourceName,
      slug,
      rawId,
      sourceName,
      aliases,
      title,
      frontmatter,
      body,
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
  const ipsByParentTopic = new Map();
  const ipsBySubtopic = new Map();

  for (const candidate of candidates) {
    const isMoc = candidate.file.replace(/\\/g, '/').includes('/10_expertise_map/');
    if (!isMoc) {
      const parentTopicRaw = String(candidate.frontmatter.parent_topic ?? '').trim();
      const parentTopic = slugify(parentTopicRaw);
      const subtopicRaw = String(candidate.frontmatter.subtopic ?? '').trim();
      const subtopic = slugify(subtopicRaw);

      if (parentTopic) {
        if (!ipsByParentTopic.has(parentTopic)) ipsByParentTopic.set(parentTopic, []);
        ipsByParentTopic.get(parentTopic).push(candidate);
      }
      if (subtopic) {
        if (!ipsBySubtopic.has(subtopic)) ipsBySubtopic.set(subtopic, []);
        ipsBySubtopic.get(subtopic).push(candidate);
      }
    }
  }

  for (const candidate of candidates) {
    let body = candidate.body;

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
          out += `![](/wiki-assets/${encodeURIComponent(resolved.filename)})`;
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
          out += `![](/wiki-assets/${encodeURIComponent(resolved.filename)})`;
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

    // Append related modules list for MOCs
    const isMoc = candidate.file.replace(/\\/g, '/').includes('/10_expertise_map/');
    if (isMoc) {
      const mocLevel = normalizeLookupKey(String(candidate.frontmatter.moc_level ?? ''));
      const id = candidate.id;
      const subtopicValue = slugify(String(candidate.frontmatter.subtopic ?? ''));

      let relatedIps = [];
      if (mocLevel === 'parent') {
        relatedIps = ipsByParentTopic.get(slugify(id)) || [];
      } else if (mocLevel === 'subtopic') {
        relatedIps = ipsBySubtopic.get(subtopicValue) || [];
      }

      if (relatedIps.length > 0) {
        // Sort by title
        relatedIps.sort((a, b) => a.title.localeCompare(b.title, 'de', { sensitivity: 'base' }));

        body += '\n\n## Zugehörige Module\n\n';
        for (const ip of relatedIps) {
          body += `- [[${ip.id}|${ip.title}]]\n`;
        }

        // Re-process the newly added wikilinks
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
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: candidate.title,
      url: canonicalHref,
    };
    if (description) {
      jsonLd.description = description;
    }

    const ragContext = extractRagContext(candidate.body);

    const frontmatterLines = ['---', `title: ${yamlQuote(candidate.title)}`];
    if (description) {
      frontmatterLines.push(`description: ${yamlQuote(description)}`);
    }
    frontmatterLines.push(`slug: ${yamlQuote(candidate.slug)}`);
    frontmatterLines.push('head:');
    frontmatterLines.push('  - tag: link');
    frontmatterLines.push('    attrs:');
    frontmatterLines.push('      rel: canonical');
    frontmatterLines.push(`      href: ${yamlQuote(canonicalHref)}`);
    frontmatterLines.push('  - tag: script');
    frontmatterLines.push('    attrs:');
    frontmatterLines.push('      type: application/ld+json');
    frontmatterLines.push(`    content: ${yamlQuote(JSON.stringify(jsonLd))}`);

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

    frontmatterLines.push('---');
    const output = `${frontmatterLines.join('\n')}\n\n${body.replace(/^\s*\r?\n/, '')}`;
    const outputFile = path.join(OUT_DOCS_DIR, `${candidate.slug}.md`);
    await fs.writeFile(outputFile, output, 'utf8');
    exportedFiles += 1;
  }

  console.log(`[summary] scannedFiles: ${scannedFiles}`);
  console.log(`[summary] exportedFiles: ${exportedFiles}`);
  console.log(`[summary] skipped.noFrontmatter: ${skippedNoFrontmatter}`);
  console.log(`[summary] skipped.statusMissing: ${skippedStatusMissing}`);
  console.log(`[summary] skipped.statusNotReady: ${skippedStatusNotReady}`);
  console.log(`[summary] skipped.statusVerworfen: ${skippedStatusVerworfen}`);
  console.log(`[summary] brokenWikilinksCount: ${brokenWikilinksCount}`);
  console.log(`[summary] missingAssetsCount: ${missingAssetsCount}`);
  console.log(`[summary] descriptionsFromSummary: ${descriptionsFromSummary}`);
  console.log(`[summary] descriptionsFromDescription: ${descriptionsFromDescription}`);
  console.log(`[summary] descriptionsMissing: ${descriptionsMissing}`);
  console.log(`[summary] mocs.total: ${mocSummary.totalMocs}`);
  console.log(`[summary] mocs.parent: ${mocSummary.parentCount}`);
  console.log(`[summary] mocs.subtopic: ${mocSummary.subtopicCount}`);
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

