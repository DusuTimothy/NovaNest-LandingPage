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
  categories: [
    {
      id: "apartments",
      title: "Apartment Residences",
      propertyCount: "7,200 Properties",
      image: "/images/category-apartments.jpg",
    },
    {
      id: "villas",
      title: "Modern Villas",
      propertyCount: "966 Properties",
      image: "/images/category-villas.jpg",
    },
    {
      id: "farmhouses",
      title: "Farm Houses",
      propertyCount: "245 Properties",
      image: "/images/category-farms.jpg",
    },
    {
      id: "urban",
      title: "Urban Oases",
      propertyCount: "512 Properties",
      image: "/images/popular-urban-oasis.jpg",
    },
    {
      id: "coastal",
      title: "Coastal Sanctuaries",
      propertyCount: "380 Properties",
      image: "/images/popular-coastal-serenity.jpg",
    },
  ],
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
    const fetchUrl = baseUrl.startsWith("http")
      ? baseUrl
      : `https://${baseUrl}`;

    const headers = {
      "User-Agent": "NovaNest-Luxury-Real-Estate/1.0",
      "Accept": "application/json",
      "x-realtyapi-key": apiKey,
      "Authorization": `Bearer ${apiKey}`,
    };

    const res = await fetch(fetchUrl, {
      headers,
      next: { revalidate: 300 }, // Cache 5 min
    });

    if (!res.ok) {
      console.warn(`External API returned status ${res.status}: ${res.statusText}`);
      return fallbackPropertiesData;
    }

    const json = await res.json();

    // Parse RealtyAPI detail response format: { detail: { ... } }
    if (json && json.detail) {
      const d = json.detail;
      const addr = d.address || {};
      const det = d.details || {};
      const rawPrice = d.list_price || (d.estimates && d.estimates[0]?.estimates?.[0]?.estimate);
      const formattedPrice = rawPrice
        ? `$${Number(rawPrice).toLocaleString()}`
        : "$240,000";

      const photos = d.photos || [];
      const imageUrl =
        photos.length > 0 && photos[0]?.href
          ? photos[0].href
          : "/images/popular-urban-oasis.jpg";

      const sqft = det.sqft || 1193;
      const sqm = Math.round(sqft * 0.092903);

      const liveProperty = {
        id: d.property_id || "quail-village-residence",
        title: addr.line ? `${addr.line} Residence` : "Quail Village Residence",
        price: formattedPrice,
        oldPrice: rawPrice ? `$${Math.round(rawPrice * 1.1).toLocaleString()}` : "$265,000",
        location: `${addr.city || "Austin"}, ${addr.state_code || "TX"} ${addr.postal_code || ""}`.trim(),
        area: `${sqm}m²`,
        bedrooms: det.beds || 3,
        bathrooms: det.baths ? Math.round(parseFloat(det.baths)) : 3,
        image: imageUrl,
        isLive: true,
      };

      // Ingest live property into popularAds and exclusiveOffers
      return {
        ...fallbackPropertiesData,
        popularAds: [
          liveProperty,
          ...fallbackPropertiesData.popularAds.slice(0, 3),
        ],
        exclusiveOffers: [
          {
            ...liveProperty,
            id: `exclusive-${liveProperty.id}`,
            title: `Exclusive: ${liveProperty.title}`,
          },
          fallbackPropertiesData.exclusiveOffers[1],
        ],
        liveProperty,
      };
    }

    // If payload is already a list or has properties array
    const rawProperties = Array.isArray(json)
      ? json
      : json.properties || json.data || json.results || [];

    if (rawProperties.length > 0) {
      const mapped = rawProperties.map((p, idx) => ({
        id: p.id || `prop-${idx}`,
        title: p.title || p.name || p.address || "Luxury Residence",
        price: p.price ? (typeof p.price === "number" ? `$${p.price.toLocaleString()}` : p.price) : "$850,000",
        oldPrice: p.oldPrice || null,
        location: p.location || p.city || "Metropolitan Area",
        area: p.area || `${p.sqft ? Math.round(p.sqft * 0.0929) : 150}m²`,
        bedrooms: p.bedrooms || p.beds || 3,
        bathrooms: p.bathrooms || p.baths || 2,
        image: p.image || p.photo || fallbackPropertiesData.popularAds[idx % 4].image,
      }));

      return {
        ...fallbackPropertiesData,
        popularAds: mapped.slice(0, 4),
      };
    }

    return fallbackPropertiesData;
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
