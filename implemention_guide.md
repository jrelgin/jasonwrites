# jasonmakes.co — Technical Design Doc (v0.1)

> Purpose: implementation-ready blueprint for a personal writing site. Fill TODOs, then build.

---

## 0. Goals & Constraints
- **Status:** Pending — capture hosting budget, auth, and privacy notes.
- **Primary goal:** Fast, simple writing site optimized for drafting → publishing.
- **Non-goals:** Complex marketing funnels; heavy CMS; ads.
- **Constraints:** _TODO (budget, host, SSO, privacy)_

---

## 1. Architecture Overview
- **Status:** Done — Astro 5 + Keystatic starter is live with Tailwind v4 (`@tailwindcss/vite`) and Vercel adapter; storage auto-selects GitHub creds when supplied, falling back to local for dev, and the Markdown pipeline runs without Markdoc.
- **Approach:** Static-first
- **Stack:** **Astro 5** + **Keystatic (self-hosted, Git-backed)**
- **Styling:** **Tailwind CSS v4** via **`@tailwindcss/vite`** (official v4 path)
- **Interactivity:** No React islands for MVP; vanilla JS only (theme toggle)
- **Hosting:** Vercel (Astro adapter)
- **Principles:** minimal runtime JS, cache everything, markdown-first content

---

## 2. Content Model
- **Status:** In progress — Astro content collection + Keystatic schema cover all planned fields, and summary auto-generation now mirrors the Markdown fallback; surfacing canonical/updated metadata remains.
- **Post**
  - `slug` (string; derived from filename, lowercase-hyphen)
  - `title` (string)
  - `date` (ISO) *(stored for feeds/SEO; **not displayed**)*
  - `updated` (ISO, optional) *(stored; **not displayed**)*
  - `summary` (string; auto-excerpt ~160 chars if empty; **strip Markdown/links/footnotes; add ellipsis**)
  - `category` (enum: `ideas` | `essays`)
  - `tags` (list, optional)
  - `draft` (bool)
  - `cover` (image, optional)
  - `canonical` (url, optional)
- **Pages**: None for MVP (About page deferred)
- **Collections**: **Ideas**, **Essays** (category-based views)
- **Taxonomy**: optional tags → tag archive pages (later)
- **Frontmatter schema validation:** zod (build-time) via `src/content/config.ts`

#### Codex Comment — Section 2
- Completed: `src/content/config.ts` now enforces the full schema with optional summaries, Keystatic mirrors those fields, and summary fallbacks auto-generate from body content.
- Next: surface canonical/updated metadata inside list/detail templates and wire them into SEO helpers.

---

## 3. Routing & URLs
- **Status:** In progress — `/`, `/page/{n}`, `/ideas`, `/essays`, and `/posts/{slug}` are implemented with consistent pagination; feeds and canonical metadata remain.
- **Homepage:** `/` = blog list (most recent posts), **20 posts per page** (paginated).
- **Pagination style:** `/page/2` (root) and `/ideas/page/2`, `/essays/page/2` for category archives.
- **Permalinks:** **`/posts/{slug}`** for MVP; reevaluate `/writing/{slug}` once the archive is live.
- **Category views:** `/ideas`, `/essays` (paginated: 20 per page)
- **Tags (later):** `/tag/{tag}` (paginated)
- **Feeds:** `/rss.xml` (MVP), `/sitemap.xml`
- **Redirects:** none for v1 (add `vercel.json` later if needed)
- **404:** simple branded 404 page.

#### Codex Comment — Section 3
- Completed: `/` rollup paginated with `/page/{n}` plus `/ideas` and `/essays` archives with matching pagination and category filters.
- Next: add canonical/link metadata to post detail pages, generate `/rss.xml` + `/sitemap.xml`, and document 404 strategy.

---

## 4. Theming & Layout
- **Status:** In progress — Tailwind v4 powers `src/styles/global.css`/`theme.css`, layout primitives use utilities, and the light/dark toggle ships; typography/forms plugins and component polish still to go.
- **Tailwind:** **v4.x** with **`@tailwindcss/vite`**; `src/styles/theme.css` imports Tailwind, layered into `global.css`.
- **Plugins (CSS @plugin):** `@tailwindcss/typography` for prose; `@tailwindcss/forms` for the MailerLite form.
- **Prettier:** `prettier-plugin-tailwindcss` (with `"tailwindStylesheet": "./src/styles/global.css"`), keep it last in Prettier plugins.
- **Typography:** self-hosted purchased fonts (WOFF2); fallback = system stack; tokens file ready for later.
- **Dark mode:** `prefers-color-scheme` + user toggle (class strategy), persisted to localStorage.
- **Components:** Tailwind-first; **Tailwind Plus** components (HTML variants) for UI blocks as needed.
- **Layout primitives:** centered container, responsive grid, `.prose` on articles, pagination, footer with MailerLite embed.

#### Codex Comment — Section 4
- Completed: Tailwind entry points live in `src/styles/theme.css`/`global.css`, and the layout ships with a persisted theme toggle.
- Next: add `@plugin '@tailwindcss/typography'` + `@tailwindcss/forms`, refine prose styles, and build footer/pagination primitives per design.

---

## 5. Content Pipeline
- **Status:** Done — Keystatic GitHub storage toggles are in place, posts now live as `.md`, remark/rehype plugins are configured, and Astro `<Image />` helpers power responsive covers.
- **Authoring:** Directly in **Keystatic** (no cloud).
- **Admin:** `/keystatic` with GitHub App/OAuth in production; local dev can fall back to local storage.
- **Storage:** Keystatic GitHub App (already provisioned) targeting the main repo; ensure tokens/keys are configured for Vercel.
- **Publish flow:** Publish = commit to `main`; Draft = `draft: true`.
- **Production authoring flow:**
  1. Navigate to `/keystatic` on the deployed site (consider Vercel password/allowlist while previewing).
  2. Authenticate with the GitHub App; Keystatic writes changes back to the repo via the app credentials.
  3. Drafts commit to a branch or `main` depending on GitHub App permissions (default = direct to `main`; adjust if PR review is preferred).
  4. Uploaded assets land in `src/assets/uploads/{slug}/` and are processed by Astro `<Image />`.
  5. Publishing in the UI commits to GitHub → triggers Vercel build → content is live once the deploy succeeds.
- **Files:**
  - `/content/posts/*.md` (filename = slug; lowercase-hyphen)
  - `/src/assets/uploads/...` (Keystatic writes here for Astro asset pipeline)
- **Images:** Use Astro **`<Image />`** for responsive images (e.g., widths 640/960/1280); no Git LFS initially.
- **Markdown:** Keystatic `fields.mdx` writes `.md` content; remark/rehype (footnotes, slug, autolink, toc, external-links) and smartypants run globally; summary fallback derives from Markdown body.
- **Drafts:** excluded from prod; optional local `/drafts` index in dev.

#### Codex Comment — Section 5
- Completed: Keystatic storage auto-configures against GitHub when env vars are present; entries save as `.md`, remark/rehype + smartypants run sitewide, post summaries fall back to generated excerpts, and post templates use Astro `<Image />` for covers. Added a temporary `.mdoc → .md` Vite alias so the legacy Markdoc loader no longer runs.
- Next: document the GitHub App/Vercel secret setup (App ID, private key, webhook secret, default branch behaviour), replace the alias once Keystatic exposes native `.md` lookups, and add tests around draft visibility once CI is wired.

---

## 6. SEO & Social
- **Status:** Not started — implement once routing/layout stabilize.
- **Meta:** per-page title/desc, canonical, robots.
- **OG images:** build-time generator (e.g., `astro-og-canvas`); 1200×630; system font fallback for now.
- **Structured data:** Article schema.
- **Feeds:** **`@astrojs/rss`** for `/rss.xml` (full content + cover) → MailerLite RSS Campaigns.
- **Sitemap:** **`@astrojs/sitemap`**.
- **Icons:** minimal (favicon.ico, apple-touch-icon 180×180).

---

## 7. Performance Budget
- **Status:** Not started — hold until templates and assets are in place.
- **Budgets (p75):** LCP ≤ 1.8s, INP ≤ 150ms, CLS ≤ 0.05.
- **Tactics:** responsive images (**640/960/1280** widths), lazy-load, font subsetting (WOFF2), prefetch critical routes, no client JS on index unless needed.

---

## 8. Accessibility
- **Status:** Not started — schedule after layout and components land.
- **Targets:** WCAG 2.2 AA; semantic HTML; skip links; focus states; color contrast ≥ 4.5:1 body.
- **Keyboard**: full nav, search, and pagination keyboard-operable.

---

## 9. Search
- **Status:** Deferred — revisit after MVP launch.
- **Plan:** **Defer for MVP** (no on-site search initially).
- **Future options:** client JSON index or Lunr prebuilt.

---

## 10. Comments / Reactions
- **Status:** Deferred — evaluate in post-MVP roadmap.
- **Choice:** **None** (no comments or reactions on MVP).
- **Future options:** webmentions, GitHub issues, Mastodon threads.

---

## 11. Analytics & Privacy
- **Status:** Not started — integrate GA4 after layout work.
- **Analytics:** **Standard GA4 snippet** placed in base layout (no custom consent logic).
- **Privacy posture:** rely on GA4 defaults; consider anon‑IP in GA settings.

---

## 12. Hosting, CI/CD, & Backups
- **Status:** In progress — GitHub repo is live; hook up Vercel build and secrets.
- **Repo:** GitHub → Vercel
- **CI:** default Vercel build for `main` (preview deploys on PRs optional)
- **Backups:** repo mirrors; periodic `/content` snapshot later (optional)

---

## 13. Local Dev
- **Status:** Done — pnpm/astro scripts run, Tailwind config is active, and local Keystatic works via `pnpm dev`.
- **Tooling:** pnpm; TypeScript strict; ESLint + Prettier (with `prettier-plugin-tailwindcss`)
- **Start:** `pnpm dev` / build: `pnpm build`
- **Files:** import `src/styles/global.css` in `src/layouts/Layout.astro`

---

## 14. Roadmap (MVP → v1.1)
- **Status:** Confirmed — use as sequencing guide once MVP tasks are underway.
- **MVP:** Home, Writing index, Ideas, Essays, Post detail, RSS, dynamic OG, dark mode, GA4.
- **v1.1:** JSON feed, tags + archives, search, webmanifest/app icons, image lightbox, typography refinements.

---

## 15. Task Board (build order)
- [x] Pick stack + repo init
- [x] Content dir + sample posts
- [x] Routing + **category pages**
- [x] Content pipeline (Keystatic GitHub + Markdown tooling complete; remark/rehype + `<Image />` running)
- [ ] Layout + typography (Tailwind + toggle shipped; typography/forms plugins + page chrome outstanding)
- [ ] SEO meta + feeds
- [ ] Analytics + consent
- [ ] Accessibility pass
- [ ] Perf audit
- [ ] Launch

---
