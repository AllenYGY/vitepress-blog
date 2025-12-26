import { createContentLoader } from 'vitepress';

export default createContentLoader('posts/**/*.md', {
  includeSrc: false,
  render: false,
  excerpt: true,
  transform(rawData) {
    return rawData
      .map((page) => {
        const mergedFrontmatter = Object.assign(
          { title: 'Default Title', date: '1900-01-01' },
          Object.keys(page.frontmatter).reduce((acc, key) => {
            acc[key.toLowerCase()] = page.frontmatter[key];
            return acc;
          }, {})
        );
        if (mergedFrontmatter.tags) {
          mergedFrontmatter.tags = Array.isArray(mergedFrontmatter.tags)
            ? mergedFrontmatter.tags
            : [mergedFrontmatter.tags];
        }
        return {
          frontmatter: mergedFrontmatter,
          excerpt: page.excerpt,
          url: page.url,
        };
      })
      .sort((a, b) => {
        if (a.frontmatter.pin && !b.frontmatter.pin) {
          return -1;
        }
        if (!a.frontmatter.pin && b.frontmatter.pin) {
          return 1;
        }
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date);
      });
  },
});
