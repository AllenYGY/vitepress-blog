---
title: Slidev Slides
date: 2025-11-26
publish: True
---

Use Slidev to author decks in plain Markdown and embed them in VitePress pages with a custom layout.

## 1) Create a Slidev deck

Store decks alongside your notes (recommended under `docs/posts`) as normal Markdown files.
Use `slidev: true` in frontmatter. Add `exclude: true` only if you want to hide the
deck from the sidebar.

Example:

- `docs/posts/example.md`

The build script scans `docs/` and picks up any file with `slidev: true`.

```md
---
title: My Deck
date: 2025-11-26
publish: True
theme: default
slidev: true
# slidevFullscreen: true
# slidevFullscreenHotkey: f
---

# My Deck

---

## Another Slide
```

## 2) Build Slidev output

```bash
npm run build:slides
```

This writes static output to `docs/public/slides/<relative-path>/` so the iframe
can load the deck in dev/preview.

## 3) Open the slide page

The same Markdown file becomes the slide page. Example URL:

- `http://localhost:8090/posts/example.html`

If you prefer clean URLs without `.html`, set `cleanUrls: true` in
`docs/.vitepress/config.ts`.

Example in this repo:

- Deck and page: `docs/posts/example.md`

Path mapping example:

- Deck and page: `docs/posts/Algorithm/intro.md`
- URL: `/posts/Algorithm/intro.html`

Note: Slidev renders its own Markdown pipeline, so VitePress-only plugins (like pseudocode fences) will not apply inside decks unless you add them to Slidev separately.

Tip: run `npm run build:slides` after editing decks so the iframe can load the latest output.
If you add a brand-new deck file while the dev server is running, restart `npm run dev`
so VitePress can pick up the new route.

Optional: bind a hotkey to toggle fullscreen mode:

```md
---
slidev: true
slidevFullscreenHotkey: f
---
```
