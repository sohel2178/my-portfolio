# Sohel Ahmed — Portfolio

Single-page portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (lint + type-check)
```

## Editing content

- `lib/site.ts`: name, role, email, GitHub URL. An empty link is hidden everywhere.
- `lib/content.ts`: capabilities, architecture stages, projects, skills, principles, and journey.
  To show **Live** or **Source** buttons on a project, add `url` or `repo` to it.

## Structure

- `app/`: layout and metadata, the page, the generated OG image, the favicon, robots, and sitemap
- `sections/`: one component per page section
- `components/`: shared UI (buttons, badges, reveal-on-scroll, the terminal line, system status, icons)

## Deploy

Push to GitHub and import the repo in Vercel. Once you have a custom domain, set `NEXT_PUBLIC_SITE_URL`
(e.g. `https://sohelahmed.dev`) so canonical and Open Graph URLs point at it.

The System Status panel in the hero is decorative and labelled "Demo data". It is not connected to any service.
