export default function NovaNestLogo({
  className = "",
  iconSize = 32,
  showText = true,
  textColor = "text-brand-cream-50",
  iconColor = "text-brand-cream-50",
}) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconColor} shrink-0 transition-transform duration-300 hover:scale-105`}
      >
        {/* Top left sparkle */}
        <path
          d="M10 10C10 12 9 13 7 13C9 13 10 14 10 16C10 14 11 13 13 13C11 13 10 12 10 10Z"
          fill="currentColor"
        />

        {/* Right sparkle */}
        <path
          d="M40 18C40 19.5 39.2 20.2 37.8 20.2C39.2 20.2 40 21 40 22.5C40 21 40.8 20.2 42.2 20.2C40.8 20.2 40 19.5 40 18Z"
          fill="currentColor"
        />

        {/* Left lower sparkle */}
        <path
          d="M6 28C6 29 5.5 29.5 4.5 29.5C5.5 29.5 6 30 6 31C6 30 6.5 29.5 7.5 29.5C6.5 29.5 6 29 6 28Z"
          fill="currentColor"
        />

        {/* Left Tower */}
        <path
          d="M13 22L20 17V33L13 36V22Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M16.5 20V34.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Tall Center/Right Tower */}
        <path
          d="M23 14L32 8V30L23 34V14Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M27.5 12V32"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        {/* Smaller Back Right Tower */}
        <path
          d="M32 17L37 13V28L32 30V17Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Orbital Swoop Nest Rings wrapping bottom */}
        <path
          d="M7 32.5C7 32.5 11 41 26 41C39 41 43 33 43 30"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M4 36C4 36 9 44 26 44C41 44 45 35 45 32"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </svg>

      {showText && (
        <span
          className={`text-xl font-semibold tracking-tight ${textColor} leading-none`}
        >
          NovaNest
        </span>
      )}
    </div>
  );
}
