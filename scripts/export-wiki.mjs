import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_VAULT = 'vault';
const ATTACHMENTS_DIR = 'vault/00_system/attachments';
const OUT_DOCS_DIR = 'src/content/docs';
const LEGACY_OUT_DOCS_DIR = 'src/content/docs/fach-expertise';
const OUT_ASSETS_DIR = 'public/wiki-assets';
const STATUS_READY = 'ki_ready';
const STATUS_REJECTED = 'verworfen';
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
  if (!content.startsWith('---')) {
    return { hasFrontmatter: false, frontmatter: {}, body: content };
  }

  const endMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (!endMatch) {
    return { hasFrontmatter: false, frontmatter: {}, body: content };
  }

  const block = endMatch[0];
  const yamlRaw = block.replace(/^---\r?\n/, '').replace(/\r?\n---\r?\n?$/, '');
  const body = content.slice(block.length);
  const frontmatter = {};
  const lines = yamlRaw.split(/\r?\n/);

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
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;

    const key = match[1];
    const rawValue = match[2] ?? '';
    if (key === 'aliases') {
      const aliases = [];
      const trimmed = rawValue.trim();
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        const inner = trimmed.slice(1, -1).trim();
        if (inner.length > 0) {
          for (const part of inner.split(',')) {
            const alias = parseYamlString(part);
            if (alias) aliases.push(alias);
          }
        }
      } else if (trimmed.length > 0) {
        aliases.push(parseYamlString(trimmed));
      } else {
        while (i + 1 < lines.length) {
          const next = lines[i + 1];
          const itemMatch = next.match(/^\s*-\s+(.+)$/);
          if (!itemMatch) break;
          const alias = parseYamlString(itemMatch[1]);
          if (alias) aliases.push(alias);
          i += 1;
        }
      }
      frontmatter.aliases = aliases;
      continue;
    }

    frontmatter[key] = parseYamlString(rawValue);
  }

  return { hasFrontmatter: true, frontmatter, body };
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

  function addSkipSample(file, reason) {
    if (skippedSamples.length < 10) {
      skippedSamples.push(`${file} (${reason})`);
    }
  }

  await cleanExportDocsDir();
  const attachmentIndex = await buildAttachmentIndex();

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
    if (status !== STATUS_READY) {
      skippedStatusNotReady += 1;
      addSkipSample(file, 'statusNotReady');
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

  for (const candidate of candidates) {
    let body = candidate.body;

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

