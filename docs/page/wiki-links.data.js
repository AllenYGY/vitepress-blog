import { createContentLoader } from 'vitepress';
import path from 'node:path';
import crypto from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { unified } from 'unified-legacy';
import remarkParse from 'remark-parse-legacy';
import remarkWikiLink, { getPermalinks } from '@portaljs/remark-wiki-link';
import { visit } from 'unist-util-visit';
import wikiLinkOptions, { pathToPermalink } from '../.vitepress/wiki-link.config.js';

const normalizeUrl = (value) => {
  if (!value) return '';
  let url = String(value).trim().replace(/\.html$/, '');
  if (url.length > 1) url = url.replace(/\/$/, '');
  return url;
};

const getTitle = (page) => {
  const frontmatter = page.frontmatter || {};
  if (typeof frontmatter.title === 'string' && frontmatter.title.trim()) {
    return frontmatter.title.trim();
  }
  if (typeof page.title === 'string' && page.title.trim()) {
    return page.title.trim();
  }
  if (page.src) {
    const match = page.src.match(/^#\s+(.+)$/m);
    if (match) return match[1].trim();
  }
  return page.url;
};

const isPublished = (frontmatter) => {
  if (!frontmatter) return true;
  const value = frontmatter.publish;
  if (value === undefined) return true;
  if (typeof value === 'boolean') return value;
  return String(value).toLowerCase() !== 'false';
};

const contentRoot = path.resolve(process.cwd(), 'docs');
const basePermalinks = getPermalinks(contentRoot, [], pathToPermalink).filter(Boolean);
const permalinkSignature = hashText(basePermalinks.join('|'));
const cacheVersion = 1;
const cacheDir = path.join(contentRoot, '.vitepress', 'cache');
const cacheFile = path.join(cacheDir, 'wiki-links.json');
const wikiCache = loadCache();
const processorCache = new Map();
const permalinksCache = new Map();

const getDirPrefix = (relativePath) => {
  if (!relativePath) return '';
  const parts = String(relativePath).replace(/\\/g, '/').split('/');
  parts.pop();
  return `/${parts.join('/')}`.replace(/\/+$/, '');
};

const orderPermalinks = (relativePath) => {
  const cacheKey = relativePath || '';
  const cached = permalinksCache.get(cacheKey);
  if (cached) return cached;
  const dirPrefix = getDirPrefix(relativePath);
  if (!dirPrefix) {
    permalinksCache.set(cacheKey, basePermalinks);
    return basePermalinks;
  }
  const local = [];
  const rest = [];
  basePermalinks.forEach((permalink) => {
    const isSameDir =
      permalink === dirPrefix || path.posix.dirname(permalink) === dirPrefix;
    if (isSameDir) {
      local.push(permalink);
    } else {
      rest.push(permalink);
    }
  });
  const ordered = [...local, ...rest];
  permalinksCache.set(cacheKey, ordered);
  return ordered;
};

const getProcessor = (relativePath) => {
  const key = relativePath || '';
  const cached = processorCache.get(key);
  if (cached) return cached;
  const processor = unified()
    .use(remarkParse)
    .use(remarkWikiLink, {
      ...wikiLinkOptions,
      permalinks: orderPermalinks(relativePath),
    });
  processorCache.set(key, processor);
  return processor;
};

const extractWikiPermalinks = (src, relativePath) => {
  if (!src || !src.includes('[[')) return [];
  const processor = getProcessor(relativePath);
  const tree = processor.parse(src);
  const mdast = processor.runSync(tree);
  const links = [];
  visit(mdast, 'wikiLink', (node) => {
    const permalink = node?.data?.permalink;
    const exists = node?.data?.exists;
    if (exists === false) return;
    if (typeof permalink === 'string' && permalink.trim()) {
      links.push(permalink.trim());
    }
  });
  return links;
};

export default createContentLoader('**/*.md', {
  includeSrc: true,
  render: false,
  excerpt: false,
  transform(rawData) {
    const cachedFiles = wikiCache.files || {};
    const nextCache = {
      version: cacheVersion,
      permalinkSignature,
      files: {},
    };
    const pages = rawData
      .filter((page) => isPublished(page.frontmatter || {}))
      .map((page) => ({
        url: page.url,
        title: getTitle(page),
        relativePath: page.relativePath || '',
      }));

    const backlinks = {};

    rawData.forEach((page) => {
      if (!isPublished(page.frontmatter || {})) return;
      const pageUrlKey = normalizeUrl(page.url);
      const pageTitle = getTitle(page);
      const src = page.src || '';
      const relativePath = page.relativePath || '';
      const cacheKey = relativePath || page.url || '';
      const srcHash = hashText(src);
      const cachedEntry = cachedFiles[cacheKey];
      const targets =
        cachedEntry && cachedEntry.hash === srcHash
          ? cachedEntry.targets || []
          : extractWikiPermalinks(src, relativePath);
      if (cacheKey) {
        nextCache.files[cacheKey] = { hash: srcHash, targets };
      }
      const seen = new Set();
      targets.forEach((target) => {
        if (/^https?:\/\//i.test(target)) return;
        const resolvedKey = normalizeUrl(target);
        if (!resolvedKey || resolvedKey === pageUrlKey) return;
        if (seen.has(resolvedKey)) return;
        seen.add(resolvedKey);
        backlinks[resolvedKey] = backlinks[resolvedKey] || [];
        backlinks[resolvedKey].push({
          title: pageTitle,
          url: page.url,
        });
      });
    });

    writeCache(nextCache);
    return { pages, backlinks };
  },
});

function hashText(value) {
  return crypto.createHash('sha1').update(value).digest('hex');
}

function loadCache() {
  if (!existsSync(cacheFile)) return { files: {} };
  try {
    const raw = readFileSync(cacheFile, 'utf8');
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      parsed.version !== cacheVersion ||
      parsed.permalinkSignature !== permalinkSignature ||
      !parsed.files
    ) {
      return { files: {} };
    }
    return parsed;
  } catch (_error) {
    return { files: {} };
  }
}

function writeCache(payload) {
  try {
    mkdirSync(cacheDir, { recursive: true });
    writeFileSync(cacheFile, JSON.stringify(payload, null, 2), 'utf8');
  } catch (_error) {
    return;
  }
}
