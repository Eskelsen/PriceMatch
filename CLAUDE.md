# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

The repo currently contains only:
- `project.txt` — the brief (in Portuguese, see below)
- `appstore-images/` — PWA icons already prepared for Android, iOS, and Windows

No application code exists yet. The brief and the reference project below define the intended shape.

## What we're building — PriceMatch

A mobile-first PWA that computes the **price-per-unit ratio** of a product so the user can compare cost-effectiveness.

Inputs (editable): product name, price, weight/quantity (g/ml).
Output (read-only): ratio (price ÷ quantity).

Records of `{name, price, quantity, ratio}` must persist. The brief explicitly leaves the storage layer (`localStorage` vs `IndexedDB`) as a decision to be made — confirm with the user before picking.

Input formatting must normalize commas to dots so fractions parse cleanly (Brazilian decimal convention → JS-friendly).

The brief asks for "good names" for the persisted quantity and ratio properties — don't auto-pick generic ones without checking.

## Reference project — gradus

The architectural template is `/home/consulting/works/outworks/archive/gradus/`. Read `constituition.md` and `index.html` there before designing anything. Key conventions to mirror:

- **Single `index.html`** with HTML + CSS + JS inline. No build step, no JS frameworks.
- **PWA** via `manifest.webmanifest` + `sw.js` (cache-first for app shell). The service worker bumps `CACHE_NAME` to invalidate.
- **Auto-calculation on input** — no "Calculate" button.
- **Validation**: empty / invalid / non-positive inputs clear the outputs; never compute on garbage.
- **Mobile-first**: large inputs (`min-height: 56px`), `inputmode="decimal"`, generous spacing, viewport-fit layout via `100svh`.
- **Numbers**: `parseFloat`, round outputs with `Math.round`/`Math.floor`, render with `toLocaleString('pt-BR')`.
- **PT-BR** copy and labels.

The "constitution" rule of thumb: when in doubt between adding something and keeping it simple, keep it simple.

## Running locally

The brief specifies serving with PHP's built-in server on port 2727 (PHP is used only as a static file server — there is no PHP code):

```
php -S localhost:2727
```

Run from the project root so paths like `./manifest.webmanifest` and `./sw.js` resolve.

## Icons

PWA icons are already generated in `appstore-images/{android,ios,windows}/` plus the master `appstore-images/price-match.png`. Reference them from `manifest.webmanifest` rather than copying — at minimum wire up the Android `launchericon-192x192.png` and `launchericon-512x512.png` for the manifest, and pick an iOS size (e.g. `180.png`) for `apple-touch-icon`.
