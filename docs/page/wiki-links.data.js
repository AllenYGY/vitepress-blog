import { createContentLoader } from 'vitepress';

const normalizeKey = (value) => {
  if (!value) return '';
  return String(value)
    .trim()
    .replace(/^\/+/, '')
    .replace(/\.md$/i, '')
    .replace(/#.*$/, '')
    .toLowerCase();
};

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

const getAliases = (page) => {
  const frontmatter = page.frontmatter || {};
  const aliases = frontmatter.aliases ?? frontmatter.alias ?? [];
  if (Array.isArray(aliases)) return aliases.filter(Boolean).map(String);
  if (typeof aliases === 'string') return [aliases];
  return [];
};

const getPathKeys = (relativePath) => {
  if (!relativePath) return [];
  const cleanPath = relativePath.replace(/\.md$/, '');
  const parts = cleanPath.split('/');
  const fileStem = parts[parts.length - 1];
  const keys = [cleanPath, fileStem];
  if (fileStem.toLowerCase() === 'index' && parts.length > 1) {
    const folderKey = parts[parts.length - 2];
    const folderPath = parts.slice(0, -1).join('/');
    keys.push(folderKey, folderPath);
  }
  return keys;
};

const parseWikiTarget = (raw) => {
  const pipeIndex = raw.indexOf('|');
  const targetPart = pipeIndex === -1 ? raw : raw.slice(0, pipeIndex);
  const hashIndex = targetPart.indexOf('#');
  const base = (hashIndex === -1 ? targetPart : targetPart.slice(0, hashIndex)).trim();
  return base;
};

const extractWikiTargets = (src) => {
  if (!src) return [];
  const matches = [];
  const regex = /\[\[([^\]]+)\]\]/g;
  let match = null;
  while ((match = regex.exec(src)) !== null) {
    const target = parseWikiTarget(match[1]);
    if (target) matches.push(target);
  }
  return matches;
};

const isPublished = (frontmatter) => {
  if (!frontmatter) return true;
  const value = frontmatter.publish;
  if (value === undefined) return true;
  if (typeof value === 'boolean') return value;
  return String(value).toLowerCase() !== 'false';
};

export default createContentLoader('**/*.md', {
  includeSrc: true,
  render: false,
  excerpt: false,
  transform(rawData) {
    const pages = rawData
      .filter((page) => isPublished(page.frontmatter || {}))
      .map((page) => ({
        url: page.url,
        title: getTitle(page),
        relativePath: page.relativePath || '',
        aliases: getAliases(page),
      }));

    const linkIndex = {};
    const urlIndex = {};

    pages.forEach((page) => {
      const pageUrlKey = normalizeUrl(page.url);
      if (pageUrlKey) urlIndex[pageUrlKey] = page.url;

      const keys = new Set([
        page.title,
        page.url,
        ...page.aliases,
        ...getPathKeys(page.relativePath),
      ]);
      keys.forEach((key) => {
        const normalized = normalizeKey(key);
        if (!normalized || linkIndex[normalized]) return;
        linkIndex[normalized] = page.url;
      });
    });

    const backlinks = {};

    rawData.forEach((page) => {
      if (!isPublished(page.frontmatter || {})) return;
      const pageUrlKey = normalizeUrl(page.url);
      const pageTitle = getTitle(page);
      const targets = extractWikiTargets(page.src || '');
      const seen = new Set();
      targets.forEach((target) => {
        if (/^https?:\/\//i.test(target)) return;
        const normalized = normalizeKey(target);
        const resolvedUrl = linkIndex[normalized] || null;
        if (!resolvedUrl) return;
        const resolvedKey = normalizeUrl(resolvedUrl);
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

    return { pages, backlinks };
  },
});
