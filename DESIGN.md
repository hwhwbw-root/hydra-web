# Hydra — Design Document

_Workforce monitoring console. Admins track field crews by their phones and
(later) review the reports those crews submit._

This document captures the brainstorming outcome that produced the current
prototype. It is the source of truth for intent, assumptions, and decisions.

---

## 1. Understanding Summary

- **What:** An admin web app to monitor field workers by tracking their phones
  (location), and later to review worker reports. Conceptually like the sibling
  `asset-tracker` project, but tracking **workers instead of vehicles**, and with
  **no landing pages and no payments**.
- **Why:** Give admins one calm place to see where workers are across **4 teams**
  and stay ahead of every report.
- **Who:** Admins / supervisors. Workers do **not** use this web app — they use a
  **companion mobile app**.
- **Companion mobile app (worker side):** Workers run a mobile app on their phones.
  It is the **source of truth** for this console — it emits the **location pings**
  shown on the map and **submits the reports** admins review here. Hydra-web is the
  read/review counterpart; admins do not author reports, they triage what the app
  sends. Both clients will share one backend/API.
- **Scope of this build:** UI shell only — clickable, real-feeling, **mock data**,
  **no backend / DB / real auth yet**.
- **Org model:** One organization ("Hydra") containing **4 teams**: Adia A,
  Adia B, Meranti, Premix.

## 2. Assumptions

1. **Framework:** Next.js (App Router) + React 19 + Tailwind v4, so the real
   backend can later be wired in the same way as `asset-tracker`. "Simpler stack"
   = no Prisma/Neon/NextAuth yet; data is in-repo TypeScript fixtures.
2. **Workers & Teams are not top-level nav.** A worker is reached by clicking a
   map pin or a roster row; teams act as a **filter** (`?team=`) surfaced in the
   topbar and sidebar. (Confirmed with user.)
3. **Reports** is a visible but **stubbed** section — a designed "coming soon"
   preview, because the report spec lands later.
4. **Worker detail** centers on **location + recent movement trail**, kept minimal.
5. **Map** uses Leaflet (CARTO light tiles) with mock pins, no real GPS feed.
6. **Auth** is a **mock sign-in** page accepting any credentials.
7. Timestamps are stored as **relative minutes** (not absolute ISO) so server and
   client render identically — avoids hydration drift in a no-backend prototype.

## 3. Decision Log

| Decision | Alternatives considered | Why |
|---|---|---|
| Next.js App Router | Plain Vite SPA | Continuity with `asset-tracker`; easy to attach the real backend later. |
| In-repo TS mock fixtures | Wire a DB now | Matches "UI shell first" scope; zero infra to run. |
| One org / 4 teams | 4 separate tenants | Simplest model for a single admin monitoring everyone (user choice). |
| Workers/Teams as drill-in + filter | Dedicated nav pages | User deselected them as nav; keeps the shell focused on Overview + Live Map. |
| Leaflet + CARTO light tiles | Mapbox / Google Maps | No API key needed; light basemap blends with the theme; same lib family as reference. |
| Relative-minute timestamps | Absolute ISO + `Date.now()` | Deterministic, hydration-safe without a server clock. |
| Deep desaturated plum over zinc | Bright "AI purple" | Honors the requested purple identity while staying premium (taste-skill guidance). |

## 4. Final Design

### Visual identity
Deep, desaturated violet/plum (`#6e56cf`) as the single accent over a warm-neutral
zinc base. Dark plum sidebar, light content. Geist + Geist Mono fonts, tabular
numerals for data. Tinted diffusion shadows, no neon glows. Each team carries an
on-brand accent in the violet/indigo family so map pins read distinctly.

### Routes
```
/                          Mock purple sign-in (any creds) → /dashboard
/dashboard                 Overview — KPIs, recent activity, team coverage, roster
/dashboard/map             Live Map — all phones (team filter via ?team=) + side list
/dashboard/workers/[id]    Worker detail — location + trail, phone health, pings
/dashboard/reports         Field-report review queue — KPIs + status/type/team filters
/dashboard/reports/[id]    Report detail — timing, damage type, materials, documentation checklist, approve/reject
```

### App shell
Dark plum sidebar (logo, nav: Overview · Live Map · Reports, team quick-filters,
admin card) + sticky topbar (mobile menu, page title, search, team filter, alerts).
Responsive: sidebar collapses to a slide-in drawer below `lg`.

### Data model (mock, `lib/mock/`)
- `Team` — id, name, accent, focus, lead (4 teams).
- `Worker` — name, team, role, status (online/idle/offline), `lastSeenMins`,
  battery, signal, phone model/number, `location`, deterministic `trail[]`.
- `ActivityEvent` — report / check-in / geofence / offline / battery events.
- `Report` — modelled on the worker mobile app (SYABAS field ops): `activityId`,
  category (`maintenance` / `premix` / `general`), timing (date/day/start/end/
  duration), `damageTypes` (Electrical…Other), `materials`, a bilingual
  **photo checklist** (`PhotoItem[]`, Malay + English labels per the app's
  templates), `status` (pending/approved/rejected) + reviewer note.
- `computeKpis()` / `computeReportKpis()` — workforce + report analytics
  (totals, man-hours, avg repair time, damage-type and status breakdowns).

### Reports (review side)
Admins triage what the app submits. The queue filters by status / type / team;
the detail view renders the full submission (timing, damage type, materials, and a
bilingual **documentation checklist** showing which required site items were
captured — no photo images in the web prototype) with **Approve / Reject +
reviewer note**. Review actions
are local-only in the prototype and will persist once the shared backend lands.

## 5. Open / Deferred

- **Shared backend / API** — auth (NextAuth), DB (Prisma/Neon), and ingestion
  endpoints the **mobile app** posts to: location pings + report submissions. The
  web app reads from the same store, and review decisions (approve/reject + note)
  write back to it.
- **Report spec confirmation** — the `Report` model + photo-checklist templates
  were reverse-engineered from app screenshots; confirm field names / extra report
  categories with the mobile team when wiring the real API.
- **Live updates** — polling / websockets for real-time movement.

## 6. Running it

```bash
npm install
npm run dev      # http://localhost:3000
```
Sign in with any email + password to enter the console.
