"use client";

import React, { useState } from "react";
import Image from "next/image";
import StatIcon from "../ui/StatIcon";
import Button from "../ui/Button";

export default function Testimonials({ testimonials: initialTestimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultTestimonials = [
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
  ];

  const testimonials =
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : defaultTestimonials;

  const safeIndex = currentIndex % testimonials.length;
  const current = testimonials[safeIndex];
  const nextItem = testimonials[(safeIndex + 1) % testimonials.length];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 relative bg-brand-forest-800 overflow-hidden">
      {/* Decorative Gold Circle on Left */}
      <div
        className="pointer-events-none absolute top-12 -left-10 w-28 h-28 rounded-full bg-brand-gold-400 shadow-[0_0_40px_rgba(255,203,74,0.35)] select-none"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-10 -left-20 w-72 h-72 rounded-full border border-brand-orbit/45 select-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-14">
          <div className="lg:w-1/4">
            <h2 className="text-3xl sm:text-4xl font-medium text-brand-cream-50 tracking-tight leading-snug">
              What Our
              <br className="hidden sm:inline" /> Clients Say
            </h2>
          </div>

          <div className="lg:w-1/2">
            <p className="text-base text-brand-sage-300 leading-relaxed font-normal">
              Discover what our satisfied clients have to say about their
              experience with NovaNest Estates. From finding their dream homes
              to experiencing exceptional service, our clients&apos; testimonials
              speak volumes about the quality and dedication we bring to every
              real estate transaction.
            </p>
          </div>

          <div className="flex items-center gap-3 lg:justify-end lg:w-1/4">
            <Button
              variant="icon"
              onClick={handlePrev}
              aria-label="Previous Testimonial"
            >
              <svg
                className="w-5 h-5 text-brand-cream-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              variant="icon"
              onClick={handleNext}
              aria-label="Next Testimonial"
            >
              <svg
                className="w-5 h-5 text-brand-cream-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative flex items-stretch gap-6 overflow-hidden">
          {/* Active Card */}
          <div className="w-full lg:w-[82%] bg-brand-cream-50 rounded-[28px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 shrink-0 border border-white/80 transition-all duration-500">
            {/* Left Photo */}
            <div className="relative md:col-span-6 h-65 md:h-auto min-h-80 bg-brand-forest-900/5">
              <Image
                src={current.propertyImage}
                alt={current.propertyTitle}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right Content */}
            <div className="p-7 md:p-10 md:col-span-6 flex flex-col justify-between relative text-on-light">
              {/* Giant Quote Glyph */}
              <div
                className="absolute top-6 right-8 text-brand-sage-500/30 select-none pointer-events-none"
                aria-hidden="true"
              >
                <svg
                  className="w-14 h-14 md:w-16 md:h-16 stroke-current fill-none stroke-[1.8]"
                  viewBox="0 0 64 64"
                >
                  <path d="M12 36C12 24 20 18 30 14L28 22C23 24 20 27 20 32H30V50H12V36Z" />
                  <path d="M38 36C38 24 46 18 56 14L54 22C49 24 46 27 46 32H56V50H38V36Z" />
                </svg>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-medium text-on-light tracking-tight">
                  {current.propertyTitle}
                </h3>
                <p className="text-sm md:text-[15px] text-on-light-muted mt-1">
                  {current.community}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-on-light-muted mt-4">
                  <StatIcon type="area" label={current.area} />
                  <span>•</span>
                  <StatIcon
                    type="beds"
                    label={`${current.bedrooms} Bedrooms`}
                  />
                  <span>•</span>
                  <StatIcon
                    type="baths"
                    label={`${current.bathrooms} Bathrooms`}
                  />
                </div>
              </div>

              {/* Client avatar & quote */}
              <div className="mt-8 pt-6 border-t border-on-light/10">
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-brand-sage-400/40">
                    <Image
                      src={current.avatar}
                      alt={current.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-base text-on-light">
                    {current.clientName}
                  </span>
                </div>

                <p className="text-sm md:text-[15px] text-on-light-muted leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Peeking Next Slide Photo on the Right */}
          <div
            onClick={handleNext}
            className="hidden lg:block w-[18%] relative rounded-[28px] overflow-hidden opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer shrink-0 border border-white/10"
          >
            <Image
              src={nextItem.propertyImage}
              alt="Next property"
              fill
              className="object-cover"
              sizes="20vw"
            />
            <div className="absolute inset-0 bg-brand-forest-900/30 backdrop-blur-[1px] hover:backdrop-blur-none transition-all flex items-center justify-center">
              <span className="bg-brand-forest-900/80 text-brand-cream-50 text-xs px-3 py-1.5 rounded-full font-medium border border-white/20">
                Next Story →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
