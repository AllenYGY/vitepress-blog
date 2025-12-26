import { createContentLoader } from 'vitepress';

const toDateKey = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'string') {
    const match = value.match(/\d{4}-\d{2}-\d{2}/);
    if (!match) return null;
    return match[0];
  }
  return null;
};

export default createContentLoader('posts/**/*.md', {
  render: false,
  excerpt: false,
  includeSrc: false,
  transform(raw) {
    const counts = {};
    const postsByDate = {};
    raw.forEach((page) => {
      const fm = page.frontmatter || {};
      const publish = String(fm.publish ?? 'true').toLowerCase();
      if (publish === 'false') return;
      const dateKey = toDateKey(fm.date);
      if (!dateKey) return;
      counts[dateKey] = (counts[dateKey] || 0) + 1;
      const title = typeof fm.title === 'string' ? fm.title : page.url;
      postsByDate[dateKey] = postsByDate[dateKey] || [];
      postsByDate[dateKey].push({
        title,
        url: page.url,
      });
    });
    return { counts, postsByDate };
  },
});
