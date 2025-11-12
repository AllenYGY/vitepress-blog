# AllenYGY's BLOG

## Project Structure & Module Organization

- `docs/` hosts all site content; `index.md`, `guide/*`, and `page/*` define the landing page, documentation, and blog listings.
- `docs/.vitepress/config.ts` controls site metadata, sidebar generation, and theme settings; `docs/.vitepress/theme/` extends `vitepress-theme-open17` and registers shared Vue components.
- Shared building blocks live in `docs/components/` (e.g., `Slides.vue`, `Link.vue`); import them in Markdown through `<Slides />` syntax.
- Static assets belong in `docs/public/`; reference them with absolute paths such as `/logo.png` to benefit from VitePress asset handling.
- Python helpers (`addmeta.py`, `movefolder.py`) tidy Markdown metadata and migrate legacy notes into `docs/posts`; run them from the repo root when bulk-updating content.

## Build, Test, and Development Commands

- `npm install` or `yarn install` installs the VitePress theme stack (both lockfiles are committed; keep them in sync).
- `npm run dev` starts the local server on `http://localhost:8090` with hot reload for Markdown and Vue components.
- `npm run build` emits the static site into `docs/public/`; treat warnings here as blockers before releasing.
- `npm run preview` serves the production build and is the quickest way to sanity-check routes before a PR.

## Coding Style & Naming Conventions

- Begin Markdown with YAML front matter including `title`, `date`, and `publish`; keep list indentation at two spaces to match existing files.
- Name directories in kebab-case or ordered prefixes (`0-intro`, `1-config`) to control navigation weight.
- Author Vue components in PascalCase and register them once in `docs/.vitepress/theme/index.js`.
- Use ES module syntax in config files, and prefer relative imports rooted at `docs/` for clarity.

## Testing Guidelines

- There is no automated test suite; rely on `npm run build` for structural validation and `npm run preview` for visual QA.
- When editing front matter in bulk, run `python addmeta.py` to auto-inject missing `publish: True` flags, then spot-check rendered pages.
- Validate that new assets load by visiting affected routes locally and checking the browser console for 404s.

## Commit & Pull Request Guidelines

- Write concise, imperative commit subjects (`Add open graph images`, `Fix nav link casing`); squash exploratory commits before requesting review.
- Describe PR scope, list impacted sections or components, and attach screenshots or recordings for visual tweaks.
- Link related issues or discussion threads and mention any required follow-up (CDN uploads, config secrets) so maintainers can coordinate deployments.

## Theme supported by [open17](https://github.com/open17)
