# Amigos Control — November 11, 2026 UX improvements

## Backup and safe deployment
- The upstream commit before these changes is `3d7ccc6cba8e68c3f4f96bcaad759aed67f1a6b6`.
- An untouched backup lives on the `main` branch at https://github.com/Moeed221/amigos-superadmin
- Source changes are made on `ux-audit-improvements-2026-11-11` and do not overwrite upstream.
- The matching pre-change source ZIP was separately archived.

## Implemented
1. Completed orders are attributed to their completion dates for sales metrics and daily charts; cancelled orders use the cancellation event date.
2. Order receipt totals show delivery fees separately.
3. Opt-in clearly labeled sample orders and a remove-samples action, rather than silently mixing fake sales into live metrics.
4. Order details show an owner/manager-only 3-minute undo for the last status step and confirmation for physical handoffs.
5. Operational page title, larger legible table typography, responsive mobile cards, strong keyboard focus, and improved error notification styling.
6. Global search also finds guest names and phone numbers, and supports Ctrl/Cmd+K.
7. Newest/oldest order sorting and explicit dates alongside times.
8. Expired/scheduled offers are labeled correctly. Expired offers require editing dates instead of a misleading Activate button.
9. Food-photo upload offers user-adjustable horizontal and vertical crop position before applying.
10. Category photo uploads remain drafts until content is published (drafts can be saved).
11. Added regression tests for completion-date reporting and opt-in sample data.

## What this does NOT solve
This is deliberately still a static browser-local demonstration. It has no authenticated user accounts, authorization enforcement on a server, cross-device synchronization, persistent shared database, payment gateway or verified real-time ticket notifications. Demo role previews are not security controls. **Do not take real customer orders or store real customer private data with this version.**

To turn the portal into a production restaurant system, provision and secure a backend, shared PostgreSQL database, authentication and role enforcement, and an order-event channel (SSE or WebSockets). Key architectural references:
- https://github.com/Kiranism/next-shadcn-dashboard-starter (forms, state, table and keyboard patterns; MIT)
- https://github.com/Nishan-noob/mise (KDS and real-time order lifecycles, API architecture)
- https://github.com/Adminiumjs/point-of-sale (restaurant cashier interaction patterns)
- https://github.com/elitale/restro (restaurant modules; **AGPL-3.0**, do not copy implementation into a differently licensed project without review)

These were consulted as UX/architecture inspiration; this change set does **not** incorporate copied source code from them.

## Validation
- `node scripts/check-control.mjs`
- `node scripts/check-amigos-menu.mjs`
- `npm ci && npm run build` on Render
- Mobile and desktop hands-on browser QA are still recommended, particularly order corrections and file uploads.

## Rollback
Point Render back to `https://github.com/ahmadwaseembutt2005-eng/amigos-superadmin`, branch `main`, or redeploy the original SHA from the backup fork. Never force-push the original upstream history.
