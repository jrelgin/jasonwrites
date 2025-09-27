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
- **Status:** In progress — Astro + Keystatic starter running; Tailwind integration and prod storage still to wire up.
- **Approach:** Static-first
- **Stack:** **Astro 5** + **Keystatic (self-hosted, Git-backed)**
- **Styling:** **Tailwind CSS v4** via **`@tailwindcss/vite`** (official v4 path)
- **Interactivity:** No React islands for MVP; vanilla JS only (theme toggle)
- **Hosting:** Vercel (Astro adapter)
- **Principles:** minimal runtime JS, cache everything, markdown-first content

---

## 2. Content Model
- **Status:** Pending — expand schemas and content files to match plan.
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
- **Pages**: About (optional)
- **Collections**: **Ideas**, **Essays** (category-based views)
- **Taxonomy**: optional tags → tag archive pages (later)
- **Frontmatter schema validation:** zod (build-time) _TODO_

#### Codex Comment — Section 2
- Plan confirmed. Update `src/content/config.ts` to add the full schema (dates, category enum, summary, tags, draft, etc.).
- Ensure Keystatic fields mirror the schema so content editors can manage the metadata; migrate existing `.mdoc` entries accordingly.

---

## 3. Routing & URLs
- **Status:** In progress — homepage pagination and `/ideas` + `/essays` archives are live; post detail permalinks remain at `/posts/{slug}` for MVP.
- **Homepage:** `/` = blog list (most recent posts), **20 posts per page** (paginated).
- **Pagination style:** `/page/2` (root) and `/ideas/page/2`, `/essays/page/2` for category archives.
- **Permalinks:** **`/posts/{slug}`** for MVP; reevaluate `/writing/{slug}` once the archive is live.
- **Category views:** `/ideas`, `/essays` (paginated: 20 per page)
- **Tags (later):** `/tag/{tag}` (paginated)
- **Feeds:** `/rss.xml` (MVP), `/sitemap.xml`
- **Redirects:** none for v1 (add `vercel.json` later if needed)
- **404:** simple branded 404 page.

#### Codex Comment — Section 3
- Completed: `/` rollup paginated with `/page/{n}` plus `/ideas` and `/essays` archives with matching pagination.
- Next: wire detail-page metadata (canonical URLs, RSS feeds) and confirm `/posts/{slug}` remains the canonical pattern for now.

---

## 4. Theming & Layout
- **Status:** Pending — migrate starter styles to Tailwind v4 and add light/dark theming.
- **Tailwind:** **v4.x** with **`@tailwindcss/vite`**; global stylesheet `src/styles/global.css` contains `@import "tailwindcss"`.
- **Plugins (CSS @plugin):** `@tailwindcss/typography` for prose; `@tailwindcss/forms` for the MailerLite form.
- **Prettier:** `prettier-plugin-tailwindcss` (with `"tailwindStylesheet": "./src/styles/global.css"`), keep it last in Prettier plugins.
- **Typography:** self-hosted purchased fonts (WOFF2); fallback = system stack; tokens file ready for later.
- **Dark mode:** `prefers-color-scheme` + user toggle (class strategy), persisted to localStorage.
- **Components:** Tailwind-first; **Tailwind Plus** components (HTML variants) for UI blocks as needed.
- **Layout primitives:** centered container, responsive grid, `.prose` on articles, pagination, footer with MailerLite embed.

#### Codex Comment — Section 4
- Replace `src/styles.css` with Tailwind entrypoints and component partials, then wire Tailwind into Astro via `@tailwindcss/vite`.
- Implement the prefers-color-scheme + toggle flow after Tailwind is live so the layout primitives can rely on utility classes.

---

## 5. Content Pipeline
- **Status:** Pending — align Keystatic storage and Markdown tooling with the blueprint.
- **Authoring:** Directly in **Keystatic** (no cloud).
- **Admin:** `/keystatic` with GitHub App/OAuth in production; local dev can fall back to local storage.
- **Storage:** Keystatic GitHub App (already provisioned) targeting the main repo; ensure tokens/keys are configured for Vercel.
- **Publish flow:** Publish = commit to `main`; Draft = `draft: true`.
- **Files:**
  - `/content/posts/*.md` (filename = slug; lowercase-hyphen)
  - `/src/assets/uploads/...` (Keystatic writes here for Astro asset pipeline)
- **Images:** Use Astro **`<Image />`** for responsive images (e.g., widths 640/960/1280); no Git LFS initially.
- **Markdown:** remark/rehype (footnotes, slug, autolink, toc, external-links); **`remark-excerpt`** for ~160‑char summaries.
- **Drafts:** excluded from prod; optional local `/drafts` index in dev.

#### Codex Comment — Section 5
- Move Keystatic to GitHub storage (using the existing app credentials) and mirror the collection schema updates so content flows through commits.
- Add the remark/rehype pipeline and adopt Astro `<Image />` helpers alongside the Tailwind layout work. With Astro’s asset pipeline, keep uploads in `src/assets/uploads` so the `image()` schema can resolve metadata.

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
- **Status:** Done — pnpm scripts working from the starter; update configs once Tailwind is added.
- **Tooling:** pnpm; TypeScript strict; ESLint + Prettier (with `prettier-plugin-tailwindcss`)
- **Start:** `pnpm dev` / build: `pnpm build`
- **Files:** import `src/styles/global.css` in `src/layouts/Base.astro`

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
- [ ] Content pipeline (Keystatic GitHub + Markdown tooling)
- [ ] Layout + typography
- [ ] SEO meta + feeds
- [ ] Analytics + consent
- [ ] Accessibility pass
- [ ] Perf audit
- [ ] Launch

---
