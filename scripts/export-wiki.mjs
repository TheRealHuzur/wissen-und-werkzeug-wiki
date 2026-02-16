import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_VAULT = 'vault';
const ATTACHMENTS_DIR = 'vault/00_system/attachments';
const OUT_DOCS_DIR = 'src/content/docs/fach-expertise';
const OUT_ASSETS_DIR = 'public/wiki-assets';
const AREA_ALLOW = 'fach_expertise';

const SKIP_DIRS = new Set(['.obsidian', '.trash', '_private']);

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

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

  for (const line of yamlRaw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    frontmatter[match[1]] = value;
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
  return `/fach-expertise/${slug}/`;
}

function normalizeLookupKey(input) {
  return input.trim().toLowerCase();
}

async function copyAttachmentIfExists(filename) {
  const source = path.join(ATTACHMENTS_DIR, filename);
  try {
    await fs.access(source);
  } catch {
    return false;
  }

  await fs.mkdir(OUT_ASSETS_DIR, { recursive: true });
  const target = path.join(OUT_ASSETS_DIR, filename);
  await fs.copyFile(source, target);
  return true;
}

function extractLinkTarget(rawTarget) {
  const cleaned = rawTarget.trim();
  const filePart = cleaned.split('#')[0].trim();
  return filePart;
}

async function main() {
  let scannedTotal = 0;
  let exportedTotal = 0;
  let skippedNoFrontmatter = 0;
  let skippedWrongArea = 0;
  let skippedMissingStatus = 0;
  let skippedNotKiReady = 0;
  let skippedVerworfen = 0;
  let brokenWikilinksCount = 0;
  let missingAssetsCount = 0;
  const missingStatusPaths = [];

  await ensureCleanOutDir(OUT_DOCS_DIR);

  const markdownFiles = await walkMarkdownFiles(SOURCE_VAULT);
  scannedTotal = markdownFiles.length;

  const candidates = [];
  for (const file of markdownFiles) {
    const raw = await fs.readFile(file, 'utf8');
    const { hasFrontmatter, frontmatter, body } = parseFrontmatter(raw);
    if (!hasFrontmatter) {
      skippedNoFrontmatter += 1;
      continue;
    }

    if (frontmatter.area !== AREA_ALLOW) {
      skippedWrongArea += 1;
      continue;
    }

    if (!Object.hasOwn(frontmatter, 'status') || String(frontmatter.status).trim() === '') {
      skippedMissingStatus += 1;
      if (missingStatusPaths.length < 20) {
        missingStatusPaths.push(file);
      }
      continue;
    }

    const status = String(frontmatter.status).trim();
    if (status === 'verworfen') {
      skippedVerworfen += 1;
      continue;
    }
    if (status !== 'ki_ready') {
      skippedNotKiReady += 1;
      continue;
    }

    const parsed = path.parse(file);
    const sourceName = parsed.name;
    const slug = slugify(sourceName);
    const title = frontmatter.title ? String(frontmatter.title) : toTitleCase(sourceName);
    candidates.push({
      file,
      sourceName,
      slug,
      title,
      frontmatter,
      body,
    });
  }

  const routeMap = new Map();
  for (const candidate of candidates) {
    const route = buildRoute(candidate.slug);
    routeMap.set(normalizeLookupKey(candidate.sourceName), route);
    if (candidate.frontmatter.title) {
      routeMap.set(normalizeLookupKey(String(candidate.frontmatter.title)), route);
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
        const filename = extractLinkTarget(inner).split('|')[0].trim();
        const copied = await copyAttachmentIfExists(filename);
        if (!copied) {
          missingAssetsCount += 1;
          console.warn(`[warn] Missing asset: ${filename} (source: ${candidate.file})`);
          out += match[0];
        } else {
          out += `![](/wiki-assets/${filename})`;
        }
        lastIndex = pattern.lastIndex;
      }
      out += body.slice(lastIndex);
      return out;
    })();

    body = body.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
      const [targetRaw, aliasRaw] = inner.split('|');
      const target = extractLinkTarget(targetRaw || '');
      const label = (aliasRaw || target || '').trim();
      const key = normalizeLookupKey(path.parse(target).name || target);
      const route = routeMap.get(key);
      if (!route) {
        brokenWikilinksCount += 1;
        console.warn(`[warn] Broken wikilink: [[${inner}]] (source: ${candidate.file})`);
        const fallback = label || target || 'Link';
        return `[${fallback}](#)`;
      }
      const text = label || target;
      return `[${text}](${route})`;
    });

    const output = `---\ntitle: ${candidate.title}\n---\n\n${body.replace(/^\s*\r?\n/, '')}`;
    const outputFile = path.join(OUT_DOCS_DIR, `${candidate.slug}.md`);
    await fs.writeFile(outputFile, output, 'utf8');
    exportedTotal += 1;
  }

  console.log(`[summary] scannedTotal: ${scannedTotal}`);
  console.log(`[summary] exportedTotal: ${exportedTotal}`);
  console.log(`[summary] skippedNoFrontmatter: ${skippedNoFrontmatter}`);
  console.log(`[summary] skippedWrongArea: ${skippedWrongArea}`);
  console.log(`[summary] skippedMissingStatus: ${skippedMissingStatus}`);
  console.log(`[summary] skippedNotKiReady: ${skippedNotKiReady}`);
  console.log(`[summary] skippedVerworfen: ${skippedVerworfen}`);
  console.log(`[summary] brokenWikilinksCount: ${brokenWikilinksCount}`);
  console.log(`[summary] missingAssetsCount: ${missingAssetsCount}`);
  if (missingStatusPaths.length > 0) {
    console.log('[summary] missingStatusPaths (max 20):');
    for (const file of missingStatusPaths) {
      console.log(`- ${file}`);
    }
  }
}

main().catch((error) => {
  console.error('[error] export failed');
  console.error(error);
  process.exit(1);
});
