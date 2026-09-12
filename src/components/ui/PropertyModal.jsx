"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import StatIcon from "./StatIcon";
import Button from "./Button";

/**
 * Modal to display complete fetched property data from the API
 */
export default function PropertyModal({ property, onClose }) {
  useEffect(() => {
    if (!property) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling ONLY while modal is actually open with a property
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow || "unset";
    };
  }, [property, onClose]);

  if (!property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
    >
      <div
        className="relative w-full max-w-2xl bg-brand-cream-50 rounded-[32px] overflow-hidden shadow-2xl border border-white/80 text-on-light flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-forest-900/80 hover:bg-brand-forest-900 text-brand-cream-50 flex items-center justify-center transition-transform hover:scale-105 shadow-md focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-[260px] sm:h-[320px] bg-brand-forest-900/10 shrink-0">
          <Image
            src={property.image || "/images/popular-urban-oasis.jpg"}
            alt={property.title || "NovaNest Luxury Residence"}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            priority
          />
          {property.isLive && (
            <div className="absolute top-4 left-4 bg-brand-forest-900/90 backdrop-blur-md text-brand-cream-50 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-brand-forest-600/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live MLS Verified Listing
            </div>
          )}
          {property.tag && !property.isLive && (
            <div className="absolute top-4 left-4 bg-brand-gold-400 text-brand-forest-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              {property.tag}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-on-light/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-sage-500 uppercase mb-1">
                <span>Property ID: {property.id || "NN-001"}</span>
                {property.isLive && <span>• MLS Real-Time Data</span>}
              </div>
              <h3 id="modal-property-title" className="text-2xl sm:text-3xl font-semibold text-on-light tracking-tight">
                {property.title}
              </h3>
              <p className="text-sm sm:text-base text-on-light-muted mt-1 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brand-sage-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-on-light">
                {property.price}
              </div>
              {property.oldPrice && (
                <div className="text-sm text-on-light-muted line-through opacity-80">
                  Original: {property.oldPrice}
                </div>
              )}
            </div>
          </div>

          {/* Key Specifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-light-muted mb-3">
              Property Specifications
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-brand-forest-900/5 rounded-2xl p-3.5 text-center border border-on-light/5">
                <StatIcon type="area" className="justify-center text-on-light" label={property.area} />
                <span className="text-[11px] text-on-light-muted mt-1 block">Total Area</span>
              </div>
              <div className="bg-brand-forest-900/5 rounded-2xl p-3.5 text-center border border-on-light/5">
                <StatIcon type="beds" className="justify-center text-on-light" label={`${property.bedrooms} Beds`} />
                <span className="text-[11px] text-on-light-muted mt-1 block">Bedrooms</span>
              </div>
              <div className="bg-brand-forest-900/5 rounded-2xl p-3.5 text-center border border-on-light/5">
                <StatIcon type="baths" className="justify-center text-on-light" label={`${property.bathrooms} Baths`} />
                <span className="text-[11px] text-on-light-muted mt-1 block">Bathrooms</span>
              </div>
            </div>
          </div>

          {/* Features Highlights */}
          <div className="bg-brand-forest-900/5 rounded-2xl p-4 border border-on-light/5 space-y-2 text-sm text-on-light/90">
            <h4 className="text-xs font-bold uppercase tracking-wider text-on-light-muted mb-2">
              Listing Highlights
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Verified Title Deed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Prime Architectural Standard
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> Dedicated Parking & Security
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span> High Energy Efficiency Rating
              </li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              href="#newsletter"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto flex-1 justify-center"
              onClick={onClose}
            >
              Inquire About Listing
            </Button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-medium border border-on-light/20 text-on-light hover:bg-on-light/5 transition-colors cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
