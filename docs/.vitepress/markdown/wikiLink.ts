import type MarkdownIt from 'markdown-it';
import path from 'node:path';
import { unified } from 'unified-legacy';
import remarkParse from 'remark-parse-legacy';
import remarkRehype from 'remark-rehype-legacy';
import rehypeStringify from 'rehype-stringify-legacy';
import remarkWikiLink, { getPermalinks } from '@portaljs/remark-wiki-link';
import wikiLinkOptions, { pathToPermalink } from '../wiki-link.config.js';

const WIKI_LINK_RE = /^!?\[\[[^\]]+\]\]/;
const contentRoot = path.resolve(process.cwd(), 'docs');
const basePermalinks = getPermalinks(contentRoot, [], pathToPermalink).filter(Boolean);
const processorCache = new Map<string, ReturnType<typeof unified>>();
const permalinksCache = new Map<string, string[]>();

const getDirPrefix = (relativePath: string) => {
  if (!relativePath) return '';
  const parts = relativePath.replace(/\\/g, '/').split('/');
  parts.pop();
  return `/${parts.join('/')}`.replace(/\/+$/, '');
};

const orderPermalinks = (relativePath: string) => {
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

const getProcessor = (relativePath: string) => {
  const key = relativePath || '';
  const cached = processorCache.get(key);
  if (cached) return cached;
  const processor = unified()
    .use(remarkParse)
    .use(remarkWikiLink, {
      ...wikiLinkOptions,
      permalinks: orderPermalinks(relativePath),
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true });
  processorCache.set(key, processor);
  return processor;
};

const renderWikiLink = (raw: string, relativePath: string) => {
  const processor = getProcessor(relativePath);
  const html = String(processor.processSync(raw));
  const trimmed = html.trim();
  const stripped = trimmed.match(/^<p>(.*)<\/p>$/s);
  return stripped ? stripped[1] : trimmed;
};

const wikiLinkPlugin = (md: MarkdownIt) => {
  md.inline.ruler.before('link', 'wiki-link', (state, silent) => {
    const pos = state.pos;
    const src = state.src;
    if (src.charCodeAt(pos) !== 0x5b && src.charCodeAt(pos) !== 0x21) return false;
    const match = src.slice(pos).match(WIKI_LINK_RE);
    if (!match) return false;
    if (!silent) {
      const envPath = typeof state.env?.relativePath === 'string' ? state.env.relativePath : '';
      const html = renderWikiLink(match[0], envPath);
      const token = state.push('html_inline', '', 0);
      token.content = html;
    }
    state.pos += match[0].length;
    return true;
  });
};

export default wikiLinkPlugin;
