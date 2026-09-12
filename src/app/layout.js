import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "NovaNest — Discover Your Nest in Luxury Living",
  description:
    "Exquisite properties blending timeless elegance with modern comfort. Discover curated luxury residences, modern villas, and farmsteads with NovaNest.",
  keywords: [
    "NovaNest",
    "Luxury Real Estate",
    "Modern Villas",
    "Apartment Residences",
    "Real Estate",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-brand-forest-800 text-brand-cream-50 font-sans antialiased selection:bg-brand-sage-500 selection:text-brand-forest-900">
        {children}
      </body>
    </html>
  );
}
