# AllenYGY Blog

Personal technical blog for Junya Yang, built with VitePress and published at [blog.allenygy.vip](https://blog.allenygy.vip/).

## Repository structure

- `docs/index.md` and `docs/page/` define the homepage and blog index pages.
- `docs/.vitepress/config.ts` contains site metadata, navigation, feed, comments, and theme configuration.
- `docs/.vitepress/theme/` and `docs/components/` contain the custom layout and reusable Vue components.
- `docs/public/` contains source-controlled static assets such as the light and dark SVG logos.
- `docs/posts/` is generated locally from the separate `NOTE` repository and is intentionally ignored by Git.
- `movefolder.py` synchronizes publishable Markdown from `docs/NOTE` into `docs/posts` in the update workflow.
- `scripts/` contains frontmatter normalization and Slidev build tooling.

## Development

This repository uses npm and `package-lock.json` as its single package-manager source of truth.

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:8090`.

## Build and verification

```bash
npm run build
npm run preview
```

`npm run build` normalizes frontmatter, builds Slidev decks into `docs/public/slides/`, and writes the VitePress output to `public/`. Both directories are generated and ignored by Git.

Before publishing, verify that these generated routes exist:

```text
public/index.html
public/page/blog.html
public/page/tags.html
public/page/archive.html
public/page/friend.html
public/posts/
```

## Content synchronization and deployment

The GitHub Actions workflow on `master` clones the private content source from `AllenYGY/NOTE`, runs `movefolder.py`, builds the site, and force-updates the generated `page` branch. GitHub Pages serves `/docs` from that branch with the custom domain declared in `CNAME`.

Do not commit generated content from `docs/posts/`, `docs/public/slides/`, `public/`, VitePress caches, or timestamped Vite config bundles.
