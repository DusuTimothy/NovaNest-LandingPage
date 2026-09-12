"use client";

import React, { useRef } from "react";
import CategoryCard from "../ui/CategoryCard";
import Button from "../ui/Button";

export default function ExploreCategories({ categories: initialCategories }) {
  const scrollContainerRef = useRef(null);

  const defaultCategories = [
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
  ];

  const categories = initialCategories && initialCategories.length > 0
    ? initialCategories
    : defaultCategories;

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section id="categories" className="py-20 md:py-28 relative bg-brand-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          {/* Title */}
          <div className="lg:w-1/4">
            <h2 className="text-3xl sm:text-4xl font-medium text-brand-cream-50 tracking-tight leading-snug">
              Explore
              <br className="hidden sm:inline" /> Categories
            </h2>
          </div>

          {/* Subtitle */}
          <div className="lg:w-1/2">
            <p className="text-base text-brand-sage-300 leading-relaxed">
              Start exploring at NovaNest Estates and navigate our extensive
              range of categories to find the living space of your dreams. Each
              carefully curated, browse through diverse types of homes to
              discover your ideal residence.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 lg:justify-end lg:w-1/4">
            <Button
              variant="icon"
              onClick={() => handleScroll("left")}
              aria-label="Scroll Categories Left"
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
              onClick={() => handleScroll("right")}
              aria-label="Scroll Categories Right"
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

        {/* Categories Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((cat) => (
            <div
              key={cat.id || cat.title}
              className="snap-start w-[290px] sm:w-[340px] md:w-[380px] shrink-0"
            >
              <CategoryCard
                image={cat.image}
                title={cat.title}
                propertyCount={cat.propertyCount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
