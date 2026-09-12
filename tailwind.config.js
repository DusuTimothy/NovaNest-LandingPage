/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: {
            900: "#162928",
            800: "#1F3833",
            700: "#26433E",
            600: "#345850",
          },
          sage: {
            500: "#5E8479",
            400: "#749D90",
            300: "#9DC9BB",
          },
          cream: {
            50: "#F4FFFB",
          },
          gold: {
            400: "#FFCB4A",
            300: "#FFD15D",
          },
          orbit: "#2E5448",
        },
        onLight: {
          DEFAULT: "#24423D",
          muted: "#4B6F67",
        },
        ink: {
          900: "#1C1C1C",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #26433E 0%, #1F3833 55%, #162928 100%)",
        "newsletter-gradient":
          "linear-gradient(160deg, #FFBE17 0%, #6A9285 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      fontFamily: {
        sans: ["var(--font-primary)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

module.exports = config;
