# Hydra — Workforce Monitoring Console

Admin console for monitoring field teams by their phones in real time, and
(soon) reviewing the reports those teams submit. This is the **UI shell**: a
clickable, real-feeling prototype backed by **mock data** — no database, auth,
or live feed wired yet.

See [`DESIGN.md`](./DESIGN.md) for intent, assumptions, and decisions.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS v4
- Leaflet + react-leaflet (CARTO light tiles)
- Phosphor icons · Geist fonts

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 and sign in with **any** email + password.

## What's here

| Route | Purpose |
|---|---|
| `/` | Mock purple sign-in |
| `/dashboard` | Overview — KPIs, recent activity, team coverage, roster |
| `/dashboard/map` | Live Map of all phones, filterable by team (`?team=`) |
| `/dashboard/workers/[id]` | Worker detail — location + trail, phone health, pings |
| `/dashboard/reports` | Field-report review queue — KPIs + status/type/team filters |
| `/dashboard/reports/[id]` | Report detail — timing, damage type, materials, documentation checklist, approve/reject |

## Project layout

```
app/                 routes (sign-in, dashboard shell + pages)
components/          shell (sidebar, topbar), cards, map, worker rows
lib/mock/            mock teams, workers, activity + KPI helpers
lib/utils.ts         cn(), relative-time + initials helpers
app/globals.css      purple theme tokens + base styles
```

## Mock data

All data lives in `lib/mock/`. Timestamps are stored as **relative minutes** so
server and client render identically. Swap these fixtures for real queries when
the backend is wired (the shapes in `lib/mock/types.ts` are the contract).

## Companion mobile app

Workers don't use this web app — they use a **mobile app** that runs on their
phones. That app is the source of the **location pings** and the **reports** shown
here; Hydra-web is the admin/review side. Both clients will share one backend.

## Next steps

- Shared backend: auth (NextAuth), DB (Prisma/Neon), and ingestion endpoints the
  mobile app posts to (location pings + report submissions). Review decisions
  (approve/reject + note) then persist instead of being session-local.
- Confirm the `Report` model + photo-checklist templates (reverse-engineered from
  app screenshots) against the real mobile submission shape.
```
