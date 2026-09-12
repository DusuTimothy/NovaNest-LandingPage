import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ExploreCategories from "@/components/sections/ExploreCategories";
import ExclusiveOffers from "@/components/sections/ExclusiveOffers";
import PopularAds from "@/components/sections/PopularAds";
import MobileApp from "@/components/sections/MobileApp";
import Testimonials from "@/components/sections/Testimonials";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/layout/Footer";
import { getPropertiesData } from "@/lib/api";

export default async function Home() {
  // Fetch real estate property data directly on the server (using configured environment API with fallback)
  const data = await getPropertiesData();

  return (
    <div className="flex min-h-screen flex-col bg-brand-forest-800 text-brand-cream-50 selection:bg-brand-sage-500 selection:text-brand-forest-900">
      {/* Top Fixed Glass Navbar */}
      <Navbar />

      {/* Main Landing Content */}
      <main className="flex-1">
        <Hero />
        <ExploreCategories categories={data?.categories} />
        <ExclusiveOffers offers={data?.exclusiveOffers} />
        <PopularAds properties={data?.popularAds} />
        <MobileApp />
        <Testimonials testimonials={data?.testimonials} />
        <FinalCta />
      </main>

      {/* Multi-Column Footer with Credits and Social Links */}
      <Footer />
    </div>
  );
}
