const FALLBACK_IMAGE = "/images/popular-urban-oasis.jpg";

const CATEGORY_DEFS = [
  {
    id: "apartments",
    title: "Apartment Residences",
    propertyType: "Condo",
    propertyCount: "7,200 Properties",
    image: "/images/category-apartments.jpg",
  },
  {
    id: "villas",
    title: "Modern Villas",
    propertyType: "House",
    propertyCount: "966 Properties",
    image: "/images/category-villas.jpg",
  },
  {
    id: "farmhouses",
    title: "Farm Houses",
    propertyType: "Farm",
    propertyCount: "245 Properties",
    image: "/images/category-farms.jpg",
  },
  {
    id: "townhomes",
    title: "Urban Townhomes",
    propertyType: "Townhome",
    propertyCount: "512 Properties",
    image: "/images/popular-urban-oasis.jpg",
  },
  {
    id: "multi",
    title: "Multi-Family Homes",
    propertyType: "Multi_Family",
    propertyCount: "380 Properties",
    image: "/images/popular-contemporary-haven.jpg",
  },
];

const TESTIMONIAL_PROFILES = [
  {
    clientName: "Emily Johnson",
    avatar: "/images/avatar-emily.jpg",
    quote:
      "NovaNest Estates helped me find the perfect retreat for my family. The process was smooth, and their team was incredibly helpful every step of the way.",
  },
  {
    clientName: "Marcus Vance",
    avatar: "/images/avatar-emily.jpg",
    quote:
      "From the first inquiry to the day we received the keys, NovaNest provided an effortless luxury experience. Their attention to detail was unmatched.",
  },
  {
    clientName: "Sophia Martinez",
    avatar: "/images/avatar-emily.jpg",
    quote:
      "Buying our dream home through NovaNest was the smoothest real estate experience of my life. Truly world-class agents and curation.",
  },
];

/**
 * Helper to resolve environment credentials from process.env
 */
function getApiCredentials() {
  let apiKey = process.env.REAL_ESTATE_API_KEY || "";
  let baseUrl = process.env.REAL_ESTATE_API_BASE_URL || "";

  // Strip possible accidental wrapping quotes
  apiKey = apiKey.trim().replace(/^["']|["']$/g, "");
  baseUrl = baseUrl.trim().replace(/^["']|["']$/g, "");

  return { apiKey, baseUrl };
}

/**
 * Normalize remote photo URLs (search payloads often return http://).
 * @param {string|null|undefined} url
 * @returns {string|null}
 */
function normalizePhotoUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice(7)}`;
  return trimmed;
}

/**
 * Pick the best variant from Zillow-style mixedSources.
 * Prefers jpeg (Next/Image-friendly), falls back to webp.
 * Targets a preferred display width when available.
 *
 * @param {{ jpeg?: Array<{url:string,width?:number}>, webp?: Array<{url:string,width?:number}> }} mixedSources
 * @param {number} [preferredWidth=1344]
 * @returns {string|null}
 */
function pickFromMixedSources(mixedSources, preferredWidth = 1344) {
  if (!mixedSources || typeof mixedSources !== "object") return null;

  const variants =
    (Array.isArray(mixedSources.jpeg) && mixedSources.jpeg.length > 0
      ? mixedSources.jpeg
      : null) ||
    (Array.isArray(mixedSources.webp) && mixedSources.webp.length > 0
      ? mixedSources.webp
      : null);

  if (!variants) return null;

  let best = variants[0];
  let bestDelta = Number.POSITIVE_INFINITY;

  for (const variant of variants) {
    if (!variant?.url) continue;
    const width = Number(variant.width) || 0;
    const delta = Math.abs(width - preferredWidth);
    if (!best?.url || delta < bestDelta || (delta === bestDelta && width > (best.width || 0))) {
      best = variant;
      bestDelta = delta;
    }
  }

  return normalizePhotoUrl(best?.url);
}

/**
 * Resolve a single photo entry that may be a string URL, {href}, {url},
 * or a Zillow originalPhotos item with mixedSources.
 *
 * @param {unknown} entry
 * @param {number} [preferredWidth]
 * @returns {string|null}
 */
function resolvePhotoEntry(entry, preferredWidth = 1344) {
  if (!entry) return null;
  if (typeof entry === "string") return normalizePhotoUrl(entry);

  if (typeof entry === "object") {
    if (entry.mixedSources) {
      return pickFromMixedSources(entry.mixedSources, preferredWidth);
    }
    return (
      normalizePhotoUrl(entry.href) ||
      normalizePhotoUrl(entry.url) ||
      normalizePhotoUrl(entry.src) ||
      normalizePhotoUrl(entry.photo) ||
      null
    );
  }

  return null;
}

/**
 * Extract ordered gallery URLs from RealtyAPI / Zillow-style payloads.
 * Supports:
 * - originalPhotos[].mixedSources.{jpeg|webp}[]
 * - photos[] as strings or {href|url}
 * - primary_photo / image / photo / imgSrc
 *
 * @param {Record<string, unknown>} source
 * @returns {{ image: string, images: string[], captions: string[] }}
 */
export function extractPropertyImages(source = {}) {
  const images = [];
  const captions = [];
  const seen = new Set();

  const push = (url, caption = "") => {
    const normalized = normalizePhotoUrl(url);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    images.push(normalized);
    captions.push(caption || "");
  };

  const originalPhotos = source.originalPhotos || source.original_photos;
  if (Array.isArray(originalPhotos)) {
    for (const photo of originalPhotos) {
      push(resolvePhotoEntry(photo), photo?.caption || "");
    }
  }

  // Prefer the explicit cover/primary when the provider supplies one
  push(resolvePhotoEntry(source.primary_photo));

  if (Array.isArray(source.photos)) {
    for (const photo of source.photos) {
      push(resolvePhotoEntry(photo), photo?.caption || "");
    }
  }

  // Realtor detail responses sometimes bury extra shots in history entries
  if (Array.isArray(source.property_history)) {
    for (const event of source.property_history) {
      if (!Array.isArray(event?.photos)) continue;
      for (const photo of event.photos) {
        push(resolvePhotoEntry(photo));
      }
    }
  }

  push(source.image);
  push(source.photo);
  push(source.imgSrc);
  push(source.thumbnail);

  if (images.length === 0) {
    return { image: FALLBACK_IMAGE, images: [FALLBACK_IMAGE], captions: [""] };
  }

  return {
    image: images[0],
    images,
    captions,
  };
}

function formatUsd(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return null;
  return `$${num.toLocaleString()}`;
}

function parseUsd(value) {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return null;
  const num = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : null;
}

/**
 * Convert a details-by-address URL into a multi-listing search URL,
 * or ensure search URLs request enough photo-backed results.
 * @param {string} baseUrl
 * @returns {string}
 */
export function resolveSearchUrl(baseUrl) {
  const absolute = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
  const url = new URL(absolute);

  if (url.pathname.includes("/details")) {
    const address = url.searchParams.get("address") || "";
    const parts = address
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    let location = "Austin, TX";
    if (parts.length >= 2) {
      location = parts
        .slice(1)
        .join(", ")
        .replace(/\s+\d{5}(-\d{4})?$/, "")
        .trim() || location;
    }

    const search = new URL(`https://${url.host}/search/bylocation`);
    search.searchParams.set("location", location);
    search.searchParams.set("resultCount", "20");
    search.searchParams.set("hasPhotos", "true");
    return search.toString();
  }

  if (!url.searchParams.has("resultCount")) {
    url.searchParams.set("resultCount", "20");
  }
  if (!url.searchParams.has("hasPhotos")) {
    url.searchParams.set("hasPhotos", "true");
  }
  return url.toString();
}

/**
 * Map a raw RealtyAPI listing into the NovaNest property card schema.
 * @param {Record<string, unknown>} p
 * @param {number} idx
 */
export function mapRawProperty(p, idx = 0) {
  const addr = p.address || {};
  const det = p.details || {};
  const locationFromAddr =
    typeof addr === "string"
      ? addr
      : [addr.city, addr.state_code || addr.state, addr.postal_code]
          .filter(Boolean)
          .join(", ");

  const extracted = extractPropertyImages(p);
  const curatedFallback =
    fallbackPropertiesData.popularAds[idx % fallbackPropertiesData.popularAds.length]
      .image;
  const gallery =
    extracted.images[0] === FALLBACK_IMAGE ? [curatedFallback] : extracted.images;
  const primary = gallery[0];

  const rawPrice =
    p.list_price ??
    p.price ??
    (p.estimates && p.estimates[0]?.estimates?.[0]?.estimate);
  const reduced = Number(p.price_reduced_amount) || 0;
  const numericPrice = typeof rawPrice === "number" ? rawPrice : parseUsd(rawPrice);
  const formattedPrice =
    formatUsd(numericPrice) ||
    (typeof rawPrice === "string" ? rawPrice : null) ||
    "$850,000";
  const oldPrice =
    p.oldPrice ||
    (reduced && numericPrice
      ? formatUsd(numericPrice + reduced)
      : numericPrice
        ? formatUsd(Math.round(numericPrice * 1.08))
        : null);

  const beds = p.bedrooms ?? p.beds ?? det.beds ?? 3;
  const bathsRaw = p.bathrooms ?? p.baths ?? det.baths ?? 2;
  const sqft = p.sqft ?? det.sqft;
  const area =
    p.area ||
    (sqft ? `${Math.round(Number(sqft) * 0.092903)}m²` : "150m²");

  return {
    id: p.id || p.property_id || p.zpid || `prop-${idx}`,
    title:
      p.title ||
      p.name ||
      (addr.line ? `${addr.line} Residence` : null) ||
      (typeof p.address === "string" ? p.address : null) ||
      "Luxury Residence",
    price: formattedPrice,
    oldPrice,
    location: p.location || locationFromAddr || p.city || "Metropolitan Area",
    area,
    bedrooms: Number(beds) || 3,
    bathrooms: Math.round(parseFloat(bathsRaw)) || 2,
    image: primary,
    images: gallery.length ? gallery : [primary],
    captions: extracted.captions,
    bgImage1: gallery[1] || primary,
    bgImage2: gallery[2] || gallery[1] || primary,
    propertyType: p.property_type || p.type || null,
    isLive: true,
  };
}

function buildTestimonials(properties) {
  const source =
    properties.length >= 3
      ? properties.slice(0, 3)
      : [...properties, ...fallbackPropertiesData.popularAds].slice(0, 3);

  return source.map((property, idx) => {
    const profile = TESTIMONIAL_PROFILES[idx % TESTIMONIAL_PROFILES.length];
    return {
      id: `testimonial-${property.id || idx}`,
      propertyTitle: property.title,
      community: property.location,
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      clientName: profile.clientName,
      avatar: profile.avatar,
      propertyImage: property.image || property.images?.[0] || FALLBACK_IMAGE,
      quote: profile.quote,
      isLive: Boolean(property.isLive),
    };
  });
}

function buildExclusiveOffers(properties) {
  const discounted = properties.filter(
    (p) => p.oldPrice && p.oldPrice !== p.price
  );
  const source = [...discounted, ...properties].slice(0, 2);

  while (source.length < 2) {
    source.push(
      fallbackPropertiesData.exclusiveOffers[source.length] ||
        fallbackPropertiesData.exclusiveOffers[0]
    );
  }

  return source.map((property, idx) => ({
    ...property,
    id: `exclusive-${property.id || idx}`,
    title: String(property.title || "").startsWith("Exclusive:")
      ? property.title
      : `Exclusive: ${property.title}`,
    oldPrice:
      property.oldPrice ||
      formatUsd(Math.round((parseUsd(property.price) || 600000) * 1.08)),
    isLive: Boolean(property.isLive),
  }));
}

async function fetchJson(url, headers) {
  const res = await fetch(url, {
    headers,
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`External API returned status ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

/**
 * Fetch live category cards (one listing image + market total per property type).
 * @param {string} searchUrl
 * @param {Record<string, string>} headers
 */
async function fetchLiveCategories(searchUrl, headers) {
  const base = new URL(searchUrl);
  const location = base.searchParams.get("location") || "Austin, TX";

  const cards = await Promise.all(
    CATEGORY_DEFS.map(async (def) => {
      try {
        const url = new URL(`https://${base.host}/search/bylocation`);
        url.searchParams.set("location", location);
        url.searchParams.set("propertyType", def.propertyType);
        url.searchParams.set("resultCount", "1");
        url.searchParams.set("hasPhotos", "true");

        const json = await fetchJson(url.toString(), headers);
        const first = Array.isArray(json.searchResults)
          ? json.searchResults[0]
          : null;
        const extracted = first ? extractPropertyImages(first) : null;
        const image =
          extracted && extracted.image !== FALLBACK_IMAGE
            ? extracted.image
            : def.image;
        const total = Number(json.total);

        return {
          id: def.id,
          title: def.title,
          propertyCount: Number.isFinite(total) && total > 0
            ? `${total.toLocaleString()} Properties`
            : def.propertyCount,
          image,
          isLive: Boolean(first),
        };
      } catch (error) {
        console.warn(`Category fetch failed for ${def.propertyType}:`, error);
        return { ...def, isLive: false };
      }
    })
  );

  return cards;
}

/**
 * Assemble the full landing-page dataset from mapped live listings.
 * @param {ReturnType<typeof mapRawProperty>[]} mapped
 * @param {typeof CATEGORY_DEFS} [categories]
 */
function buildLandingDataset(mapped, categories = fallbackPropertiesData.categories) {
  const popularAds =
    mapped.length > 0
      ? mapped.slice(0, 4)
      : fallbackPropertiesData.popularAds;

  return {
    popularAds,
    categories,
    exclusiveOffers: buildExclusiveOffers(mapped),
    testimonials: buildTestimonials(
      mapped.length >= 7 ? mapped.slice(4, 7) : mapped
    ),
    liveProperty: mapped[0] || null,
  };
}

/**
 * Base curated NovaNest dataset matching the design system
 */
export const fallbackPropertiesData = {
  popularAds: [
    {
      id: "urban-oasis",
      title: "Urban Oasis",
      price: "$500,000",
      location: "Downtown Metropolitan Area",
      area: "120m²",
      bedrooms: 2,
      bathrooms: 2,
      image: "/images/popular-urban-oasis.jpg",
    },
    {
      id: "coastal-serenity",
      title: "Coastal Serenity",
      price: "$1,200,000",
      location: "Beachfront Property, Coastal Area",
      area: "250m²",
      bedrooms: 4,
      bathrooms: 3,
      image: "/images/popular-coastal-serenity.jpg",
    },
    {
      id: "contemporary-haven",
      title: "Contemporary Haven",
      price: "$2,000,000",
      location: "Suburban Luxury Community",
      area: "400m²",
      bedrooms: 5,
      bathrooms: 4,
      image: "/images/popular-contemporary-haven.jpg",
    },
    {
      id: "tranquil-farmstead",
      title: "Tranquil Farmstead",
      price: "$800,000",
      location: "Rural Countryside, Farming District",
      area: "800m²",
      bedrooms: 3,
      bathrooms: 2,
      image: "/images/popular-tranquil-farmstead.jpg",
    },
  ],
  categories: CATEGORY_DEFS.map(({ propertyType, ...rest }) => rest),
  exclusiveOffers: [
    {
      id: "exclusive-apartment",
      title: "Elegant Apartment",
      oldPrice: "$625,000",
      price: "$600,000",
      location: "Downtown Metropolitan Area",
      area: "120m²",
      bedrooms: 2,
      bathrooms: 2,
      image: "/images/exclusive-apartment.jpg",
    },
    {
      id: "exclusive-villa",
      title: "Coastal Villa Retreat",
      oldPrice: "$1,350,000",
      price: "$1,200,000",
      location: "Beachfront Boulevard, Coastal Area",
      area: "250m²",
      bedrooms: 4,
      bathrooms: 3,
      image: "/images/popular-coastal-serenity.jpg",
    },
  ],
  testimonials: [
    {
      id: 1,
      propertyTitle: "Serene Haven",
      community: "Suburban Bliss Community",
      area: "200m²",
      bedrooms: 3,
      bathrooms: 2,
      clientName: "Emily Johnson",
      avatar: "/images/avatar-emily.jpg",
      propertyImage: "/images/testimonial-serene-haven.jpg",
      quote:
        "NovaNest Estates helped me find the perfect suburban retreat for my family. The process was smooth, and their team was incredibly helpful every step of the way. Thank you for making our dream home a reality!",
    },
    {
      id: 2,
      propertyTitle: "Coastal Villa Retreat",
      community: "Azure Shores District",
      area: "250m²",
      bedrooms: 4,
      bathrooms: 3,
      clientName: "Marcus Vance",
      avatar: "/images/avatar-emily.jpg",
      propertyImage: "/images/testimonial-peeking-villa.jpg",
      quote:
        "From the first inquiry to the day we received the keys, NovaNest provided an effortless luxury experience. Their attention to detail and personalized property recommendations were unmatched.",
    },
    {
      id: 3,
      propertyTitle: "Contemporary Haven",
      community: "Suburban Luxury Community",
      area: "400m²",
      bedrooms: 5,
      bathrooms: 4,
      clientName: "Sophia Martinez",
      avatar: "/images/avatar-emily.jpg",
      propertyImage: "/images/popular-contemporary-haven.jpg",
      quote:
        "Selling our penthouse and buying our dream architectural home through NovaNest was the smoothest real estate experience of my life. Truly world-class agents and curation.",
    },
  ],
};

/**
 * Server-side data fetcher that queries the configured real estate API
 * and normalizes the payload into the NovaNest landing page schema.
 */
export async function getPropertiesData() {
  const { apiKey, baseUrl } = getApiCredentials();

  if (!apiKey || !baseUrl) {
    return fallbackPropertiesData;
  }

  try {
    const searchUrl = resolveSearchUrl(baseUrl);
    const headers = {
      "User-Agent": "NovaNest-Luxury-Real-Estate/1.0",
      Accept: "application/json",
      "x-realtyapi-key": apiKey,
      Authorization: `Bearer ${apiKey}`,
    };

    const [json, categories] = await Promise.all([
      fetchJson(searchUrl, headers),
      fetchLiveCategories(searchUrl, headers),
    ]);

    // Detail payload support (rare once search URL is configured)
    if (json && json.detail && !json.searchResults) {
      const liveProperty = mapRawProperty(json.detail, 0);
      return {
        ...fallbackPropertiesData,
        ...buildLandingDataset([liveProperty], categories),
        liveProperty,
      };
    }

    const rawProperties = Array.isArray(json)
      ? json
      : json.searchResults || json.properties || json.data || json.results || [];

    if (rawProperties.length > 0) {
      const mapped = rawProperties.map((p, idx) => mapRawProperty(p, idx));
      return {
        ...fallbackPropertiesData,
        ...buildLandingDataset(mapped, categories),
      };
    }

    return {
      ...fallbackPropertiesData,
      categories,
    };
  } catch (error) {
    console.error("Error executing getPropertiesData:", error);
    return fallbackPropertiesData;
  }
}

/**
 * Client-side fetch wrapper — calls your internal /api/properties route,
 * keeping external API credentials securely on the server.
 *
 * @param {Object} [options]
 * @param {boolean} [options.forceRefresh=false] - Force cache bypass to retrieve latest live API data
 * @returns {Promise<typeof fallbackPropertiesData>}
 */
export async function fetchProperties(options = {}) {
  const { forceRefresh = false } = options;

  try {
    const url = forceRefresh
      ? `/api/properties?_t=${Date.now()}`
      : "/api/properties";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(forceRefresh ? { "Cache-Control": "no-cache" } : {}),
      },
      cache: forceRefresh ? "no-store" : "default",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch properties: ${res.statusText || res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Using fallback local data due to fetch error:", error);
    return fallbackPropertiesData;
  }
}
