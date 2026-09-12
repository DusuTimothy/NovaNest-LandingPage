import React from "react";
import Image from "next/image";

export default function CategoryCard({
  image,
  title,
  propertyCount,
  className = "",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`group bg-brand-cream-50 rounded-[24px] p-3.5 md:p-4 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border border-white/60 hover:-translate-y-1.5 shrink-0 select-none ${className}`}
    >
      <div className="relative w-full h-[210px] md:h-[235px] rounded-[18px] overflow-hidden bg-brand-forest-900/5">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="pt-4 pb-2 px-2 text-center flex flex-col items-center">
        <h3 className="text-xl md:text-[22px] font-medium text-on-light tracking-tight group-hover:text-brand-forest-900 transition-colors">
          {title}
        </h3>
        <p className="text-sm md:text-[15px] text-on-light-muted mt-1 font-normal">
          {propertyCount}
        </p>
      </div>
    </div>
  );
}
