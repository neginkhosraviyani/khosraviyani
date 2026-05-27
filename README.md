# نگین خسرویانی — پورتفولیو هنری

پورتفولیوی شخصی نگین خسرویانی در [khosraviyani.ir](https://khosraviyani.ir/).

Astro 5 static site, Tailwind v4, deploys to Cloudflare Pages. Forked from [MorrisGlr/creative](https://github.com/MorrisGlr/creative) (MIT-licensed code; original artwork content removed).

## Sections

- `/ai/` — هوش مصنوعی (AI-generated work)
- `/miniature/` — نگارگری و گل و مرغ (Persian miniature & gol-o-morgh)
- `/graphic/` — گرافیک (graphic design)
- `/other/` — سایر (other work)

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Adding a project

Each project lives at `src/content/<section>/<slug>/`:

1. Add media files to `src/content/<section>/<slug>/media/`
2. Add a `page.json` in `src/content/<section>/<slug>/` with `title`, `slug`, `cover`, and a `media` array
3. The build picks it up automatically; the placeholder card (if any) is replaced

Placeholders (cards shown while work is not yet published) are defined in `src/content/placeholders.ts`.

## Deployment

Static build output goes to `dist/`. Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 20 or 22

The original template targets Cloudflare Workers; the `wrangler.jsonc` has been removed in favor of Pages.

## i18n status

The site renders Persian (RTL) by default. The `Layout.astro` accepts a `lang` prop (`'fa' | 'en'`) and switches `<html lang dir>` accordingly. English routes are not yet built — when added, mirror each page under `/en/...` and pass `lang="en"` to the layout.
