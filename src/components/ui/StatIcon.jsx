import React from "react";

export default function StatIcon({
  type,
  label,
  className = "",
  iconClassName = "w-4 h-4",
}) {
  const renderIcon = () => {
    switch (type) {
      case "area":
        return (
          <svg
            className={iconClassName}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Box frame */}
            <rect x="3" y="3" width="18" height="18" rx="2" strokeOpacity="0.4" />
            {/* Diagonal expandable arrows */}
            <path d="M15 9L9 15" />
            <path d="M15 12V9H12" />
            <path d="M9 12V15H12" />
          </svg>
        );
      case "beds":
      case "bedroom":
      case "bedrooms":
        return (
          <svg
            className={iconClassName}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bed headboard and frame */}
            <path d="M3 7V19" />
            <path d="M21 7V19" />
            <path d="M3 13H21" />
            <path d="M3 17H21" />
            {/* Pillows */}
            <rect x="6" y="9" width="5" height="4" rx="1" />
            <rect x="13" y="9" width="5" height="4" rx="1" />
          </svg>
        );
      case "baths":
      case "bathroom":
      case "bathrooms":
        return (
          <svg
            className={iconClassName}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bathtub */}
            <path d="M4 12H20C20 16 17 19 12 19C7 19 4 16 4 12Z" />
            <path d="M6 19V21" />
            <path d="M18 19V21" />
            {/* Shower head / faucet */}
            <path d="M6 12V6C6 4.9 6.9 4 8 4H9" />
            <circle cx="11" cy="5" r="1" fill="currentColor" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {renderIcon()}
      {label && <span>{label}</span>}
    </div>
  );
}
