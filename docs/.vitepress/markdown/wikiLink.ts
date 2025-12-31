import type MarkdownIt from 'markdown-it';

const WIKI_LINK_RE = /^\[\[([^\]]+)\]\]/;

const parseWikiText = (raw: string) => {
  const pipeIndex = raw.indexOf('|');
  const targetPart = pipeIndex === -1 ? raw : raw.slice(0, pipeIndex);
  const textPart = pipeIndex === -1 ? raw : raw.slice(pipeIndex + 1);
  const target = targetPart.trim();
  const text = textPart.trim() || target;
  return { target, text };
};

const wikiLinkPlugin = (md: MarkdownIt) => {
  md.inline.ruler.before('link', 'wiki-link', (state, silent) => {
    const pos = state.pos;
    const src = state.src;
    if (src.charCodeAt(pos) !== 0x5b || src.charCodeAt(pos + 1) !== 0x5b) return false;
    const match = src.slice(pos).match(WIKI_LINK_RE);
    if (!match) return false;
    if (!silent) {
      const token = state.push('wiki_link', '', 0);
      token.meta = parseWikiText(match[1]);
    }
    state.pos += match[0].length;
    return true;
  });

  md.renderer.rules.wiki_link = (tokens, idx) => {
    const meta = tokens[idx].meta || {};
    const target = typeof meta.target === 'string' ? meta.target : '';
    const text = typeof meta.text === 'string' ? meta.text : target;
    const safeTarget = md.utils.escapeHtml(target);
    const safeText = md.utils.escapeHtml(text);
    return `<WikiLink target="${safeTarget}" text="${safeText}" />`;
  };
};

export default wikiLinkPlugin;
