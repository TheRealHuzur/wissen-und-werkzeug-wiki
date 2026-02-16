import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_VAULT = 'vault';
const ATTACHMENTS_DIR = 'vault/00_system/attachments';
const OUT_DOCS_DIR = 'src/content/docs/fach-expertise';
const OUT_ASSETS_DIR = 'public/wiki-assets';
const AREA_ALLOW = 'fach_expertise';
const STATUS_READY = 'ki_ready';
const STATUS_REJECTED = 'verworfen';
const BASE_PREFIX = '/wiki';

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

async function ensureCleanOutDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
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
  return `${BASE_PREFIX}/fach-expertise/${slug}/`;
}

function normalizeLookupKey(input) {
  return input.trim().toLowerCase();
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

async function copyAttachmentIfExists(filename) {
  const safeName = path.basename(filename);
  const source = path.join(ATTACHMENTS_DIR, safeName);
  try {
    await fs.access(source);
  } catch {
    return false;
  }

  await fs.mkdir(OUT_ASSETS_DIR, { recursive: true });
  const target = path.join(OUT_ASSETS_DIR, safeName);
  try {
    await fs.access(target);
  } catch {
    await fs.copyFile(source, target);
  }
  return true;
}

async function buildAttachmentIndex() {
  const index = new Map();
  let entries = [];
  try {
    entries = await fs.readdir(ATTACHMENTS_DIR, { withFileTypes: true });
  } catch {
    return index;
  }

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const key = normalizeLookupKey(entry.name);
    if (!index.has(key)) {
      index.set(key, entry.name);
    }
  }
  return index;
}

async function copyAttachmentByNameIfExists(filename, attachmentIndex) {
  const safeName = path.basename(filename);
  const key = normalizeLookupKey(safeName);
  const matchedName = attachmentIndex.get(key);
  if (!matchedName) {
    return false;
  }

  const source = path.join(ATTACHMENTS_DIR, matchedName);
  await fs.mkdir(OUT_ASSETS_DIR, { recursive: true });
  const target = path.join(OUT_ASSETS_DIR, safeName);
  try {
    await fs.access(target);
  } catch {
    await fs.copyFile(source, target);
  }
  return true;
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
  let skippedWrongArea = 0;
  let skippedStatusMissing = 0;
  let skippedStatusNotReady = 0;
  let skippedStatusVerworfen = 0;
  let skippedIdMissing = 0;
  let brokenWikilinksCount = 0;
  let missingAssetsCount = 0;
  const skippedSamples = [];

  function addSkipSample(file, reason) {
    if (skippedSamples.length < 10) {
      skippedSamples.push(`${file} (${reason})`);
    }
  }

  await ensureCleanOutDir(OUT_DOCS_DIR);
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

    if (frontmatter.area !== AREA_ALLOW) {
      skippedWrongArea += 1;
      addSkipSample(file, 'wrongArea');
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

    const rawId = String(frontmatter.id ?? '').trim();
    const canonicalId = rawId;
    if (!canonicalId) {
      skippedIdMissing += 1;
      addSkipSample(file, 'idMissing');
      continue;
    }

    const parsed = path.parse(file);
    const sourceName = parsed.name;
    const aliases = Array.isArray(frontmatter.aliases)
      ? frontmatter.aliases.map((value) => String(value).trim()).filter(Boolean)
      : [];
    const title = frontmatter.title ? String(frontmatter.title) : toTitleCase(sourceName);
    candidates.push({
      file,
      id: canonicalId,
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
    const route = buildRoute(candidate.id);
    addLookupKey(candidate.id, route, `${candidate.file} (id)`);
    if (candidate.rawId && candidate.rawId !== candidate.id) {
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
        const copied = await copyAttachmentIfExists(filename);
        if (!copied) {
          missingAssetsCount += 1;
          console.warn(`[warn] Missing asset: ${filename} (source: ${candidate.file})`);
          out += match[0];
        } else {
          out += `![](${BASE_PREFIX}/wiki-assets/${encodeURIComponent(filename)})`;
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

        const altText = match[1];
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
        const copied = await copyAttachmentByNameIfExists(imageName, attachmentIndex);
        if (!copied) {
          missingAssetsCount += 1;
          console.warn(`[warn] Missing asset: ${imageName} (source: ${candidate.file})`);
          out += match[0];
        } else {
          out += `![${altText}](${BASE_PREFIX}/wiki-assets/${imageName})`;
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

    const description = candidate.frontmatter.summary
      ? `\ndescription: ${yamlQuote(candidate.frontmatter.summary)}`
      : '';
    const output = `---\ntitle: ${yamlQuote(candidate.title)}${description}\n---\n\n${body.replace(/^\s*\r?\n/, '')}`;
    const outputFile = path.join(OUT_DOCS_DIR, `${candidate.id}.md`);
    await fs.writeFile(outputFile, output, 'utf8');
    exportedFiles += 1;
  }

  console.log(`[summary] scannedFiles: ${scannedFiles}`);
  console.log(`[summary] exportedFiles: ${exportedFiles}`);
  console.log(`[summary] skipped.noFrontmatter: ${skippedNoFrontmatter}`);
  console.log(`[summary] skipped.wrongArea: ${skippedWrongArea}`);
  console.log(`[summary] skipped.statusMissing: ${skippedStatusMissing}`);
  console.log(`[summary] skipped.statusNotReady: ${skippedStatusNotReady}`);
  console.log(`[summary] skipped.statusVerworfen: ${skippedStatusVerworfen}`);
  console.log(`[summary] skipped.idMissing: ${skippedIdMissing}`);
  console.log(`[summary] brokenWikilinksCount: ${brokenWikilinksCount}`);
  console.log(`[summary] missingAssetsCount: ${missingAssetsCount}`);
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
