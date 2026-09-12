"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import PropertyCard from "../ui/PropertyCard";
import PropertyModal from "../ui/PropertyModal";
import NovaNestLogo from "../ui/NovaNestLogo";
import { fetchProperties, fallbackPropertiesData } from "@/lib/api";

export default function PopularAds({ properties: initialProperties }) {
  const hasInitial = Boolean(initialProperties && initialProperties.length > 0);

  const [properties, setProperties] = useState(
    hasInitial ? initialProperties : fallbackPropertiesData.popularAds
  );
  const [isLoading, setIsLoading] = useState(!hasInitial);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  /**
   * Method that fetches property listings from the API
   * and updates component state to display the fetched data.
   *
   * @param {boolean} force - Force cache bypass
   */
  const fetchAndDisplayProperties = useCallback(async (force = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchProperties({ forceRefresh: force });

      if (data && Array.isArray(data.popularAds) && data.popularAds.length > 0) {
        setProperties(data.popularAds);
        setLastFetched(new Date());
      } else {
        throw new Error("No property records returned from the API");
      }
    } catch (err) {
      console.error("Error fetching properties from API:", err);
      setError(err?.message || "Failed to load properties from API");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch from API on mount if initialProperties was not provided
  useEffect(() => {
    let ignore = false;

    if (!hasInitial) {
      const timer = setTimeout(async () => {
        try {
          const data = await fetchProperties({ forceRefresh: false });
          if (!ignore && data?.popularAds?.length > 0) {
            setProperties(data.popularAds);
            setLastFetched(new Date());
          }
        } catch (err) {
          if (!ignore) {
            setError(err?.message || "Failed to load properties from API");
          }
        } finally {
          if (!ignore) {
            setIsLoading(false);
          }
        }
      }, 0);

      return () => {
        ignore = true;
        clearTimeout(timer);
      };
    }
  }, [hasInitial]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  /**
   * Method that renders and displays the fetched property data,
   * including loading skeletons, error fallback with retry, and property cards.
   */
  const displayFetchedData = () => {
    // 1. Loading state: Luxury animated skeleton cards
    if (isLoading) {
      return (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          role="status"
          aria-live="polite"
          aria-label="Loading property listings"
        >
          {[1, 2, 3, 4].map((item) => (
            <div
              key={`skeleton-${item}`}
              className="bg-brand-cream-50/10 backdrop-blur-sm rounded-[24px] p-3.5 md:p-4 border border-white/10 animate-pulse flex flex-col justify-between h-[380px]"
            >
              <div>
                <div className="w-full h-[200px] md:h-[225px] rounded-[18px] bg-brand-forest-700/60 mb-4 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-brand-forest-600 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                </div>
                <div className="h-6 w-3/4 bg-brand-forest-700/60 rounded-lg mb-2" />
                <div className="h-5 w-1/3 bg-brand-forest-700/50 rounded-lg mb-2" />
                <div className="h-4 w-1/2 bg-brand-forest-700/40 rounded-lg" />
              </div>
              <div className="mt-4 pt-3.5 border-t border-brand-forest-600/30 flex justify-between">
                <div className="h-4 w-14 bg-brand-forest-700/50 rounded" />
                <div className="h-4 w-14 bg-brand-forest-700/50 rounded" />
                <div className="h-4 w-14 bg-brand-forest-700/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 2. Error state: Alert with retry button to call fetchAndDisplayProperties
    if (error) {
      return (
        <div className="bg-brand-forest-900/80 border border-rose-500/30 rounded-[28px] p-8 text-center flex flex-col items-center justify-center min-h-[380px] shadow-xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-brand-cream-50 mb-2">
            Failed to Display Property Listings
          </h3>
          <p className="text-sm text-brand-sage-300 max-w-md mb-6 leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => fetchAndDisplayProperties(true)}
            className="inline-flex items-center gap-2 bg-brand-sage-500 hover:bg-brand-sage-400 text-brand-forest-900 font-medium px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md text-sm active:scale-95"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Retry Fetching Data
          </button>
        </div>
      );
    }

    // 3. Empty state
    if (!properties || properties.length === 0) {
      return (
        <div className="bg-brand-forest-900/60 border border-white/10 rounded-[28px] p-8 text-center flex flex-col items-center justify-center min-h-[380px]">
          <p className="text-brand-sage-300 text-base">
            No properties found in the current MLS feed.
          </p>
          <button
            onClick={() => fetchAndDisplayProperties(true)}
            className="mt-4 bg-brand-sage-500 text-brand-forest-900 font-medium px-5 py-2 rounded-xl text-sm"
          >
            Reload MLS Feed
          </button>
        </div>
      );
    }

    // 4. Fetched data display: Render PropertyCards with all fetched attributes
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {properties.slice(0, 4).map((prop) => (
          <PropertyCard
            key={prop.id || prop.title}
            image={prop.image}
            title={prop.title}
            price={prop.price}
            oldPrice={prop.oldPrice}
            location={prop.location}
            area={prop.area}
            bedrooms={prop.bedrooms}
            bathrooms={prop.bathrooms}
            tag={prop.tag}
            onClick={() => setSelectedProperty(prop)}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="popular-ads"
      className="py-24 md:py-32 bg-brand-forest-800 relative"
    >
      {/* Property Details Modal when a card is clicked */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream-50 tracking-tight">
            Popular Ads of This Week
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-sage-300 leading-relaxed">
            Explore our handpicked selection of popular listings at NovaNest
            Estates, showcasing a diverse range of exceptional properties that
            capture the essence of luxury living.
          </p>

          {/* Action Row: Refresh API Data Button & Sync Status */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => fetchAndDisplayProperties(true)}
              disabled={isLoading}
              aria-label="Refresh property listings from API"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-brand-forest-900/80 hover:bg-brand-forest-700/80 text-brand-cream-50 border border-brand-forest-600/50 transition-all hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer shadow-sm"
            >
              <svg
                className={`w-3.5 h-3.5 text-brand-sage-400 ${
                  isLoading ? "animate-spin text-brand-gold-400" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>{isLoading ? "Fetching API Data..." : "Sync Live MLS Data"}</span>
            </button>

            {lastFetched && (
              <span className="text-[11px] text-brand-sage-400/80">
                Synced at {lastFetched.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            )}
          </div>
        </div>

        {/* Grid Layout: 2x2 Property Cards (via displayFetchedData) + 1 Tall Newsletter Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Fetched Property Cards Display (span 8 cols on desktop) */}
          <div className="lg:col-span-8">
            {displayFetchedData()}
          </div>

          {/* Right: Tall Newsletter Signup Block (span 4 cols on desktop) */}
          <div
            id="newsletter"
            className="lg:col-span-4 rounded-[28px] p-8 md:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-newsletter-gradient text-on-light min-h-[540px]"
          >
            {/* Background Image: yellowbanner.png */}
            <Image
              src="/images/yellowbanner.png"
              alt="NovaNest Newsletter Background"
              fill
              className="object-cover object-center pointer-events-none select-none z-0"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
            />

            <div className="relative z-10">
              {/* Top Logo Mark */}
              <div className="mb-6">
                <NovaNestLogo
                  showText={false}
                  iconSize={40}
                  iconColor="text-on-light"
                />
              </div>

              {/* Newsletter Headline */}
              <h3 className="text-3xl sm:text-[34px] font-medium text-on-light leading-[1.18] tracking-tight">
                The most intriguing, unique, and novel offers.
              </h3>

              {/* Body paragraphs */}
              <div className="mt-6 space-y-4 text-sm sm:text-[15px] text-on-light/90 leading-relaxed font-normal">
                <p>
                  Stay updated with the latest trends, market insights, and
                  exclusive property offers by subscribing to our real estate
                  newsletter.
                </p>
                <p>
                  Receive curated content straight to your inbox, including tips
                  for buyers, sellers, and investors.
                </p>
                <p className="font-medium text-on-light">
                  Don’t miss out on the opportunity to be informed and inspired.
                  Subscribe now!
                </p>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="mt-8 relative z-10">
              {subscribed ? (
                <div className="bg-brand-cream-50/90 rounded-2xl p-5 text-center border border-brand-sage-500/30 backdrop-blur-sm">
                  <div className="w-10 h-10 bg-brand-sage-500 text-brand-cream-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    ✓
                  </div>
                  <h4 className="font-semibold text-on-light">
                    You&apos;re on the list!
                  </h4>
                  <p className="text-xs text-on-light-muted mt-1">
                    Thank you for joining NovaNest. We’ve sent a confirmation to
                    your email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full bg-brand-cream-50 text-on-light placeholder:text-on-light-muted/70 px-4 py-3.5 rounded-xl border border-white/80 focus:outline-none focus:ring-2 focus:ring-on-light/30 text-sm shadow-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full h-[56px] flex flex-row items-center justify-center gap-2.5 px-[42px] py-4 bg-gradient-to-b from-[#9ECABC] to-[#638B7E] hover:brightness-105 text-brand-forest-900 font-medium text-base rounded-[12px] transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
