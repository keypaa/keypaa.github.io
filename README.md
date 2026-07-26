# keypaa.github.io

Personal site of **Keylhan Paumard–André** — engineering student at EFREI Paris, AI tinkerer, reader.
Live at **[keypaa.github.io](https://keypaa.github.io/)**.

A warm-dark, editorial single-page site: a quiet intro, a "now" snapshot, a reading
log, a workbench of experiments, and where to find me elsewhere. Built with Next.js,
shipped as a static export to GitHub Pages via GitHub Actions.

---

## Stack

- **Next.js 16** (App Router, static export)
- **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** for reveal + hover animations
- **Fonts**: Fraunces (serif), JetBrains Mono (mono), Geist (sans)
- Deployed to **GitHub Pages** via a GitHub Actions workflow

## Project structure

```
src/
├── app/
│   ├── globals.css      # warm-dark theme, fonts, utilities
│   ├── layout.tsx       # root layout, fonts, metadata
│   └── page.tsx         # the single page (composes the sections)
├── components/
│   └── site/
│       ├── primitives.tsx     # Reveal, StaggerGroup, Eyebrow, StatusBadge…
│       ├── header.tsx
│       ├── hero.tsx
│       ├── now-section.tsx
│       ├── reading.tsx
│       ├── experiments.tsx
│       ├── elsewhere.tsx
│       └── footer.tsx
└── lib/
    └── content.ts       # ← EDIT THIS: profile, books, experiments
```

## Where to edit content

Almost everything lives in **`src/lib/content.ts`** — a single typed file.

- `profile` — name, handles, blurb, links
- `books` — reading log (status: `read` / `next` / `ongoing`, plus a `take`)
- `experiments` — workbench cards (status: `live` / `wip` / `planning`)
- `nowItems` — the "now" snapshot panel
- `getSchoolYearProgress()` — auto-computes "year N / 5" from the current date

The school counter flips itself every September — you never touch it.
In 2030 it becomes `graduated (2030)`.

## Develop locally

```bash
bun install
bun run dev      # http://localhost:3000
```

> Other runtimes work too (`npm install && npm run dev`). The GitHub Actions
> workflow uses Bun, but the lockfile isn't strictly required for local dev.

## Deploy

Deploys are automatic. Every push to `main` triggers the workflow at
`.github/workflows/deploy.yml`, which runs `next build` (static export to `out/`)
and publishes the result to GitHub Pages.

```bash
git add .
git commit -m "update content"
git push
```

~8 seconds later, it's live.

### Pages setup (one-time, already done)

Repo **Settings → Pages → Build and deployment → Source** must be set to
**"GitHub Actions"** (not "Deploy from a branch").

## Notes

- `output: "export"` in `next.config.ts` means no server / no API routes —
  the site is fully static, which is why it can live on GitHub Pages.
- `public/.nojekyll` prevents Pages from stripping `_next/` assets.
- `images.unoptimized: true` because the default image optimizer needs a Node server.
- Light theme CSS exists in `globals.css` but the site is dark-first (`<html class="dark">`).

## License

Personal content © Keylhan Paumard–André.
Code structure MIT — feel free to learn from it, don't copy my content.
