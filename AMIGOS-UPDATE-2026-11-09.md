# Amigos Mexican Grill — source update (9 November 2026)

This is an updated **Next.js 16 static-export** source project derived from the supplied `super admin amigos .zip` project. It is **not** an authenticated, production-ready ordering application and **has not been deployed to** `amigos-mexican-grill.onrender.com`.

## Included updates

- Imported the supplied menu data: **268 priced entries** representing **172 distinct named products**, grouped into **17 browsing categories**, including variants, source prices and descriptions. The retired demo menu remains backed up as `src/data/menu.legacy-demo.json`.
- Added **14 fixed-price combo deals** to the menu and to `/deals/`, with savings, included items, configurable bundle selections, Add to Cart, a new navigation link, and a homepage deals section. Imported combo prices: Rs 1,050; 799; 1,199; 1,399; 1,550; 2,050; 2,450; 3,050; 2,399; 2,299; 3,350; 4,699; 2,999; and 3,299. The original printed “Lock Down Deal” heading is not used.
- Created square 1:1 food cards (no oval crop) and resized the original reusable category JPG assets to **1080 × 1080** pixels.
- Made the category carousel manually scrollable with touch swipe, mouse drag, keyboard focus, previous/next arrows, optional auto-scroll and pause.
- Set **Build Your Perfect Meal** to hidden by default, but retained the section and its Super Admin toggle.
- Replaced the nonfunctional newsletter block with social-profile links in the footer and Contact page. **Real profile URLs were not supplied**, so the frontend shows a placeholder until they are configured in Admin > Settings.
- Added image file input to Admin > Menu > Edit dish and Admin > Website content > Category photos. Uploads are center-cropped to 1080 × 1080 and compressed to WebP in the browser.
- Added Admin > Website content controls for section visibility, section order, hero featured dishes and editable major section headings/text.
- Added Admin > Settings for delivery/pickup enabling, editable preparation and ETA minutes, service area, pickup address, opening hours, delivery fee and minimum order. The checkout price and minimum-order validation use these settings locally.
- Removed automatic accelerated tracking progress. Tracking now reflects manual browser-local staff status updates and estimates based on real timestamps plus configured minutes. No invented riders are attached to new orders.
- Removed fictional sample orders from the default Admin order queue. This does **not** connect orders from real customers.
- Kept percentage campaigns separate from 14 fixed-price deals. Fixed deals can be edited from Admin > Deals & Offers via their full menu item editor; configured option choices remain selectable on `/deals/`.

## Important limitations

**Local storage, not a backend.** The original ZIP only had static Next.js pages, no production API, account authentication, central database, or image storage. Admin edits, uploaded image data, checkout and order tracking still live in the current browser, not across browsers/devices. This project does not send actual orders to the restaurant and does not take payments.

**Live deployment not completed.** The connected Render workspace shows no service for the supplied onrender.com URL, and the connected GitHub account's available repositories do not include the Amigos repository. The live site was not altered. The code must be uploaded into the exact Git repository and branch connected to the existing Render service. Do not create a second service if you need to keep the current URL.

**Real launch requirements:** server-side authorization, persistent database and user accounts, staff-only order events, server-generated timestamps, secure object storage and media permissions, payment/notification integrations if required, configurable delivery-area validation, and verified restaurant details. A local static HTML site cannot meet these requirements just through client-side JavaScript. Do not enable real customer checkout before this work.

**Photos:** The supplied deal posters are advertising compositions, not isolated square photos of individual menu items. This import uses generic square category food photos as placeholders for many menu entries and deals. Upload matching real product/deal photography before launch. No Instagram/Facebook/TikTok/WhatsApp/YouTube addresses were invented.

**Menu review:** Prices and combinations were transcribed from posters and should be reviewed against the restaurant's current printed menu, especially BBQ portion sizes, combo choices and spelling. Validate before activating online orders.

## How to apply to the existing project

1. Keep a snapshot/backup of the *currently deployed* website and existing Git branch.
2. Overlay this package's `amigos/` source files onto the same repository **without deleting original font files**. This update archive excludes font binaries; retain the originals from your source repository.
3. In the app root run `npm ci`, `node scripts/check-control.mjs`, `node scripts/check-amigos-menu.mjs`, and `npm run build` on a machine with access to the npm registry.
4. Deploy **the same Render service** from its existing GitHub/GitLab branch. For a static site, publish `out/`; for the existing static-serving web service, use its established start configuration. Do not change production service type or add a new service without checking the current one.
5. Open the deployed storefront and `/admin/` on desktop/mobile; test menu, each deal option, categories, image upload, section toggles, checkout delivery fees, manual kitchen transitions, and tracking (all browser-local until real backend integrated).
6. Configure real socials and restaurant delivery hours in Super Admin. These settings currently apply **only to that browser**.
7. Review menu and deal values, replace generic photos, then implement the secure backend before accepting customer orders.

## Verification performed in this environment

- Parsed all 87 JavaScript/JSX source files using TypeScript's JavaScript/JSX syntax parser: no parse errors.
- `node scripts/check-control.mjs` passed after adjusting the tracking test to stub configurable estimate settings.
- `node scripts/check-amigos-menu.mjs` passed 268 menu lines, 14 fixed deals, category references and price checks.
- A full Next.js production build was **not run successfully** because the container could not fetch npm packages from the registry (`npm ci` stalled). Do not treat this as a runtime/browser QA pass.
