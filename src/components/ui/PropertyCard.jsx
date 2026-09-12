import React from "react";
import Image from "next/image";
import StatIcon from "./StatIcon";

export default function PropertyCard({
  image,
  title,
  price,
  oldPrice,
  location,
  area,
  bedrooms,
  bathrooms,
  tag,
  className = "",
  onClick,
}) {
  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View details for ${title}` : undefined}
      className={`group bg-brand-cream-50 rounded-[24px] p-3.5 md:p-4 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-white/60 hover:-translate-y-1 ${onClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-sage-400" : ""} ${className}`}
    >
      <div>
        <div className="relative w-full h-[200px] md:h-[225px] rounded-[18px] overflow-hidden bg-brand-forest-900/5">
          <Image
            src={image || "/images/popular-urban-oasis.jpg"}
            alt={title || "NovaNest Luxury Property"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {tag && (
            <div className="absolute top-3 left-3 bg-brand-gold-400 text-brand-forest-900 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              {tag}
            </div>
          )}
        </div>

        <div className="pt-3.5 px-1">
          <h3 className="text-xl md:text-[22px] font-medium text-on-light tracking-tight group-hover:text-brand-forest-900 transition-colors">
            {title}
          </h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg md:text-xl font-semibold text-on-light">
              {price}
            </span>
            {oldPrice && (
              <span className="text-sm text-on-light-muted line-through opacity-70">
                {oldPrice}
              </span>
            )}
          </div>

          <p className="text-sm text-on-light-muted mt-1 font-normal line-clamp-1">
            {location}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3.5 border-t border-on-light/10 px-1 flex items-center justify-between text-xs md:text-[13px] text-on-light-muted">
        <StatIcon type="area" label={area} />
        <StatIcon type="beds" label={`${bedrooms} Bedrooms`} />
        <StatIcon type="baths" label={`${bathrooms} Bathrooms`} />
      </div>
    </div>
  );
}
