# API Image Fetching, Mapping & Rendering

This document explains how NovaNest loads listing photos from RealtyAPI (and Zillow-style payloads), normalizes them into a single gallery shape, and renders them on the landing page.

## End-to-end flow

```text
.env.local (REAL_ESTATE_API_KEY + REAL_ESTATE_API_BASE_URL)
        │
        ▼
getPropertiesData()          ← src/lib/api.js (server only)
        │  fetch + auth headers
        ▼
Provider JSON (detail | searchResults | list)
        │
        ▼
extractPropertyImages()      ← normalizes all photo shapes
        │
        ▼
Property { image, images[], captions[], bgImage1, bgImage2 }
        │
        ├── PopularAds → PropertyCard (image) → PropertyModal (images gallery)
        └── ExclusiveOffers (image + bgImage1 + bgImage2 stacked layers)
```

Credentials never reach the browser. Client refreshes call `/api/properties`, which reuses the same server mapper.

## What the API returns

### 1. Zillow-style `originalPhotos` (mixedSources)

Some detail payloads expose a responsive gallery:

```json
{
  "originalPhotos": [
    {
      "caption": "",
      "mixedSources": {
        "jpeg": [
          { "url": "https://photos.zillowstatic.com/fp/...-d_d.jpg", "width": 800 },
          { "url": "https://photos.zillowstatic.com/fp/...-o_a.jpg", "width": 1024 },
          { "url": "https://photos.zillowstatic.com/fp/...-uncropped_scaled_within_1344_1008.jpg", "width": 1344 },
          { "url": "https://photos.zillowstatic.com/fp/...-uncropped_scaled_within_1536_1152.jpg", "width": 1536 }
        ],
        "webp": [
          { "url": "https://photos.zillowstatic.com/fp/...-d_d.webp", "width": 800 },
          { "url": "https://photos.zillowstatic.com/fp/...-o_a.webp", "width": 1024 }
        ]
      }
    }
  ]
}
```

**Mapping rule:** for each `originalPhotos[]` item:

1. Prefer `mixedSources.jpeg` (Next.js `Image` + optimizer friendly).
2. Fall back to `mixedSources.webp` if jpeg is missing.
3. Pick the variant whose `width` is closest to **1344** (good balance for cards/modal).
4. Keep `caption` aligned by index in `captions[]`.

One gallery URL is produced per original photo (not one URL per width variant).

### 2. Realtor / RealtyAPI `photos`

Detail responses often look like:

```json
{
  "photos": [
    { "href": "https://ap.rdcpix.com/...od.jpg", "tags": ["house_view"] }
  ]
}
```

Search cards often look like:

```json
{
  "primary_photo": "https://ap.rdcpix.com/...od.jpg",
  "photos": [
    "http://ap.rdcpix.com/...od.jpg",
    "http://ap.rdcpix.com/...od.jpg"
  ]
}
```

**Mapping rule:**

- Accept string URLs, `{ href }`, `{ url }`, or `{ src }`.
- Upgrade `http://` → `https://`.
- Deduplicate while preserving order.
- Also harvest extra URLs from `property_history[].photos` when present.
- Use `primary_photo` / `image` / `photo` / `imgSrc` as backups.

## Normalized NovaNest property fields

| Field | Meaning | Used by |
| --- | --- | --- |
| `image` | First gallery URL (hero/thumbnail) | `PropertyCard`, Exclusive front layer |
| `images[]` | Full ordered gallery | `PropertyModal` carousel + thumbs |
| `captions[]` | Optional captions parallel to `images` | Modal alt text |
| `bgImage1` | Second shot (or repeat of first) | Exclusive Offers mid layer |
| `bgImage2` | Third shot (or previous fallback) | Exclusive Offers back layer |

If no usable remote photos exist, all of these fall back to `/images/popular-urban-oasis.jpg` (or curated local assets for static demo cards).

## Where rendering happens

### Popular Ads cards

`PopularAds` passes `prop.image` into `PropertyCard`. The card uses `next/image` with `fill` + `object-cover`.

Clicking a card opens `PropertyModal` with the full property object (including `images`).

### Property modal gallery

When `images.length > 1`, the modal shows:

- Prev / next controls (also ← / → keys)
- `n / total` counter
- Horizontal thumbnail strip

When only one image exists, it behaves as a single hero photo.

### Exclusive Offers stacked composition

`ExclusiveOffers` reads:

- `offer.image` → front layer
- `offer.bgImage1` → mid rotated layer
- `offer.bgImage2` → back rotated layer

Live API rows now populate those fields from `images[0..2]`, so stacked layers come from real listing photos instead of only hardcoded locals.

## Remote image config

`next.config.mjs` allows remote hosts via:

```js
images: { remotePatterns: [{ protocol: "https", hostname: "**" }, ...] }
```

That covers `photos.zillowstatic.com`, `ap.rdcpix.com`, and other CDN hosts returned by the provider.

## Source of truth in code

| Concern | File |
| --- | --- |
| Fetch + normalize | `src/lib/api.js` (`getPropertiesData`, `extractPropertyImages`) |
| Internal proxy | `src/app/api/properties/route.js` |
| Card thumbnail | `src/components/ui/PropertyCard.jsx` |
| Modal gallery | `src/components/ui/PropertyModal.jsx` |
| Stacked exclusive media | `src/components/sections/ExclusiveOffers.jsx` |
| JSDoc shapes | `src/lib/types.js` |

## Quick verification

1. Ensure `.env.local` has `REAL_ESTATE_API_KEY` and `REAL_ESTATE_API_BASE_URL`.
2. Run `pnpm dev` and open Popular Ads → click the live listing.
3. Confirm the modal shows the mapped remote photo(s).
4. Scroll to Exclusive Offers and confirm the first offer’s stacked images match the live gallery when the API returned multiple shots.

If the provider detail payload only includes one photo (common for some sold/low-media listings), the UI correctly shows a single image; multi-photo galleries appear whenever `originalPhotos` or a multi-entry `photos` array is present.
