import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-brand-gradient">
      {/* Decorative concentric rings on far left edge as seen in design */}
      <div
        className="pointer-events-none absolute -left-48 top-1/3 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-brand-orbit/30 select-none"
        aria-hidden="true"
      >
        <div className="absolute inset-8 rounded-full border border-brand-orbit/40" />
        <div className="absolute inset-20 rounded-full border border-brand-orbit/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Dual CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-[54px] lg:text-[58px] font-medium tracking-tight text-brand-cream-50 leading-[1.15]">
              Discover your nest in the nova of luxury living.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-brand-sage-300/90 leading-relaxed max-w-xl">
              Our exquisite properties blend timeless elegance with modern
              comfort, offering an oasis of serenity amidst the bustling world
              outside. Come, embark on a journey of discovery, and let NovaNest
              Estates be the canvas upon which you paint the masterpiece of your
              life.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <Button href="#popular-ads" variant="primary" size="lg">
                Explore Properties
              </Button>
              <Button href="#newsletter" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>

          {/* Right Column: 3D Villa Illustration + Accent Circles */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] lg:max-w-[540px] aspect-[1.16/1]">
              {/* Orbit sits under/behind the house, offset toward the right — sized to match Container.png */}
              <div
                className="absolute z-0 pointer-events-none select-none right-[-4%] top-[18%] w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px]"
                aria-hidden="true"
              >
                {/* Thick soft green orbit */}
                <div className="absolute inset-0 rounded-full border-[22px] md:border-[26px] border-brand-orbit/60" />
                {/* Thin concentric strokes */}
                <div className="absolute -inset-3 rounded-full border border-brand-orbit/35" />
                <div className="absolute inset-5 rounded-full border border-brand-orbit/40" />

                {/* Yellow ball rests on the top of the orbit */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-3 md:-top-4 w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-brand-gold-400" />
              </div>

              {/* Isometric 3D Villa Model Image — above the orbit */}
              <div className="relative z-10 w-full h-full drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <Image
                  src="/images/novanest-heropage.png"
                  alt="NovaNest Luxury Villa Hero"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 90vw, 540px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
