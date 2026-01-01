const isExternalHref = (value) => /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value);

const normalizeWikiHref = (value) => {
  if (!value) return value;
  const trimmed = String(value).trim();
  if (!trimmed) return trimmed;
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../') ||
    trimmed.startsWith('#') ||
    isExternalHref(trimmed)
  ) {
    return trimmed;
  }
  return `./${trimmed}`;
};

export const wikiLinkOptions = {
  pathFormat: 'obsidian-short',
  aliasDivider: '|',
  wikiLinkClassName: 'internal',
  newClassName: 'new',
  hrefTemplate: normalizeWikiHref,
};

export const pathToPermalink = (filePath, markdownFolder) => {
  if (!/\.mdx?$/i.test(filePath)) return null;
  const permalink = filePath
    .replace(markdownFolder, '')
    .replace(/\.(mdx|md)/i, '')
    .replace(/\\/g, '/')
    .replace(/\/index$/i, '');
  return permalink.length > 0 ? permalink : '/';
};

export default wikiLinkOptions;
