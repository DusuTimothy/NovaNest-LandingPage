import React from "react";

export default function AccentCircle({
  goldSize = "w-20 h-20 md:w-24 md:h-24",
  ringSize = "w-72 h-72 md:w-96 md:h-96",
  ringColor = "border-brand-orbit/45",
  showGold = true,
  showRings = true,
  className = "",
  goldOffset = "top-0 right-10",
}) {
  return (
    <div
      className={`pointer-events-none absolute select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Outer concentric subtle ring */}
      {showRings && (
        <div
          className={`absolute rounded-full border ${ringColor} ${ringSize} transition-transform duration-700`}
        />
      )}
      {showRings && (
        <div
          className={`absolute rounded-full border ${ringColor} scale-125 ${ringSize} opacity-40`}
        />
      )}

      {/* Solid gold highlight circle */}
      {showGold && (
        <div
          className={`absolute ${goldOffset} ${goldSize} rounded-full bg-brand-gold-400 shadow-[0_0_40px_rgba(255,203,74,0.35)]`}
        />
      )}
    </div>
  );
}
