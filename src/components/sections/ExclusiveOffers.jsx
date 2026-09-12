import React from "react";
import Image from "next/image";
import StatIcon from "../ui/StatIcon";
import Button from "../ui/Button";

export default function ExclusiveOffers({ offers }) {
  const defaultOffers = [
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
      bgImage1: "/images/popular-coastal-serenity.jpg",
      bgImage2: "/images/popular-urban-oasis.jpg",
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
      bgImage1: "/images/category-villas.jpg",
      bgImage2: "/images/popular-contemporary-haven.jpg",
    },
  ];

  const offerList = offers && offers.length >= 2 ? offers : defaultOffers;
  const first = offerList[0] || defaultOffers[0];
  const second = offerList[1] || defaultOffers[1];

  return (
    <section id="exclusive-offers" className="py-24 md:py-32 relative bg-brand-forest-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream-50 tracking-tight">
            Exclusive Offers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-sage-300 leading-relaxed">
            Explore our handpicked selection of discounted properties at NovaNest
            Estates. Don’t miss out on these exclusive deals offering exceptional
            value for your dream home.
          </p>
        </div>

        {/* Feature Block 1: (Image Left, Details Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
          {/* Stacked Photos on Left */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-120 aspect-[1.05/1]">
              {/* Back Layer 2 */}
              <div className="absolute top-4 -left-6 w-[78%] h-[88%] rounded-3xl bg-brand-forest-700/60 border border-brand-forest-600/40 -rotate-6 shadow-xl opacity-60 overflow-hidden">
                <Image
                  src={first.bgImage2 || "/images/popular-urban-oasis.jpg"}
                  alt="Property preview background"
                  fill
                  className="object-cover opacity-50"
                /> 
              </div>

              {/* Back Layer 1 */}
              <div className="absolute top-2 -left-3 w-[84%] h-[92%] rounded-3xl bg-brand-forest-700/80 border border-brand-forest-600/50 -rotate-3 shadow-xl opacity-80 overflow-hidden">
                <Image
                  src={first.bgImage1 || "/images/popular-coastal-serenity.jpg"}
                  alt="Property preview midground"
                  fill
                  className="object-cover opacity-60"
                />
              </div>

              {/* Front Primary Image Card */}
              <div className="relative w-[92%] h-[98%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src={first.image || "/images/exclusive-apartment.jpg"}
                  alt={first.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 90vw, 460px"
                />
              </div>
            </div>
          </div>

          {/* Details on Right */}
          <div className="lg:col-span-6 flex flex-col items-start lg:pl-6">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream-50 tracking-tight">
              {first.title}
            </h3>

            <div className="mt-4 flex items-baseline gap-3">
              {first.oldPrice && (
                <span className="text-lg text-brand-sage-300/80 line-through">
                  {first.oldPrice}
                </span>
              )}
              <span className="text-3xl sm:text-4xl font-semibold text-brand-sage-300">
                {first.price}
              </span>
            </div>

            <p className="mt-3 text-lg text-brand-cream-50/90 font-normal">
              {first.location}
            </p>

            {/* Property Stats */}
            <div className="mt-8 space-y-4 text-brand-sage-300 text-base font-normal">
              <div className="flex items-center gap-3">
                <StatIcon
                  type="area"
                  className="text-brand-sage-300"
                  iconClassName="w-5 h-5 text-brand-sage-300"
                />
                <span>{first.area}</span>
              </div>
              <div className="flex items-center gap-3">
                <StatIcon
                  type="beds"
                  className="text-brand-sage-300"
                  iconClassName="w-5 h-5 text-brand-sage-300"
                />
                <span>{first.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-3">
                <StatIcon
                  type="baths"
                  className="text-brand-sage-300"
                  iconClassName="w-5 h-5 text-brand-sage-300"
                />
                <span>{first.bathrooms} Bathrooms</span>
              </div>
            </div>

            <div className="mt-10">
              <Button href="#newsletter" variant="primary" size="lg">
                Inquire About Offer
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Block 2: (Details Left, Image Right) - Exclusive Offers x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Details on Left */}
          <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-start">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream-50 tracking-tight">
              {second.title}
            </h3>

            <div className="mt-4 flex items-baseline gap-3">
              {second.oldPrice && (
                <span className="text-lg text-brand-sage-300/80 line-through">
                  {second.oldPrice}
                </span>
              )}
              <span className="text-3xl sm:text-4xl font-semibold text-brand-sage-300">
                {second.price}
              </span>
            </div>

            <p className="mt-3 text-lg text-brand-cream-50/90 font-normal">
              {second.location}
            </p>

            {/* Property Stats */}
            <div className="mt-8 space-y-4 text-brand-sage-300 text-base font-normal">
              <div className="flex items-center gap-3">
                <StatIcon
                  type="area"
                  className="text-brand-sage-300"
                  iconClassName="w-5 h-5 text-brand-sage-300"
                />
                <span>{second.area}</span>
              </div>
              <div className="flex items-center gap-3">
                <StatIcon
                  type="beds"
                  className="text-brand-sage-300"
                  iconClassName="w-5 h-5 text-brand-sage-300"
                />
                <span>{second.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center gap-3">
                <StatIcon
                  type="baths"
                  className="text-brand-sage-300"
                  iconClassName="w-5 h-5 text-brand-sage-300"
                />
                <span>{second.bathrooms} Bathrooms</span>
              </div>
            </div>

            <div className="mt-10">
              <Button href="#newsletter" variant="primary" size="lg">
                Inquire About Offer
              </Button>
            </div>
          </div>

          {/* Stacked Photos on Right */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[480px] aspect-[1.05/1]">
              {/* Back Layer 2 */}
              <div className="absolute top-4 -right-6 w-[78%] h-[88%] rounded-3xl bg-brand-forest-700/60 border border-brand-forest-600/40 rotate-6 shadow-xl opacity-60 overflow-hidden">
                <Image
                  src={second.bgImage2 || "/images/popular-contemporary-haven.jpg"}
                  alt="Property preview background"
                  fill
                  className="object-cover opacity-50"
                />
              </div>

              {/* Back Layer 1 */}
              <div className="absolute top-2 -right-3 w-[84%] h-[92%] rounded-3xl bg-brand-forest-700/80 border border-brand-forest-600/50 rotate-3 shadow-xl opacity-80 overflow-hidden">
                <Image
                  src={second.bgImage1 || "/images/category-villas.jpg"}
                  alt="Property preview midground"
                  fill
                  className="object-cover opacity-60"
                />
              </div>

              {/* Front Primary Image Card */}
              <div className="relative w-[92%] h-[98%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src={second.image || "/images/popular-coastal-serenity.jpg"}
                  alt={second.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 90vw, 460px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Accent Gold Circle + Ring at bottom right */}
      <div
        className="pointer-events-none absolute -bottom-12 -right-12 w-64 h-64 select-none"
        aria-hidden="true"
      >
        <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-brand-gold-400 shadow-[0_0_40px_rgba(255,203,74,0.35)]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full border border-brand-orbit/45" />
        <div className="absolute -bottom-8 -right-8 w-80 h-80 rounded-full border border-brand-orbit/30" />
      </div>
    </section>
  );
}
