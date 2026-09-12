import React from "react";
import Image from "next/image";

export default function MobileApp() {
  return (
    <section className="py-24 md:py-32 relative bg-brand-forest-900/40 overflow-hidden">
      {/* Decorative concentric rings in bottom left */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-brand-orbit/30 select-none"
        aria-hidden="true"
      >
        <div className="absolute inset-8 rounded-full border border-brand-orbit/40" />
        <div className="absolute inset-20 rounded-full border border-brand-orbit/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Phone Mockups */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] md:max-w-[420px] aspect-[383/445] drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]">
              <Image
                src="/images/novanest-devices.png"
                alt="NovaNest Mobile Application on iOS and Android devices"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
            </div>
          </div>

          {/* Right Column: Copy & Store Download Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pl-6 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-brand-cream-50 tracking-tight">
              Mobile Application
            </h2>

            <p className="mt-6 text-base sm:text-lg text-brand-sage-300 leading-relaxed font-normal">
              Achieve seamless access to the world of real estate with the
              NovaNest Estates mobile app, available for download on both Google
              Play and the App Store. Whether you&apos;re searching for your dream
              home, exploring property listings, or staying updated with the
              latest market trends, our user-friendly app puts the power of real
              estate in the palm of your hand. Download now and experience the
              convenience of finding your perfect property anytime, anywhere.
            </p>

            {/* Download Store Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Apple App Store */}
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-ink-900 hover:bg-black text-brand-cream-50 border border-white/10 px-6 py-3.5 rounded-full transition-all duration-200 shadow-md active:scale-95 group"
              >
                {/* Apple SVG */}
                <svg
                  className="w-5 h-5 fill-current transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.79.92-2.84-.9.04-2 .6-2.65 1.36-.57.65-1.07 1.71-.93 2.73 1.01.08 2.04-.5 2.66-1.25z" />
                </svg>
                <span className="text-sm font-medium tracking-tight">Download</span>
              </a>

              {/* Google Play Store */}
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-ink-900 hover:bg-black text-brand-cream-50 border border-white/10 px-6 py-3.5 rounded-full transition-all duration-200 shadow-md active:scale-95 group"
              >
                {/* Google Play Tri-color SVG */}
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#EA4335"
                    d="M3.609 1.814L13.792 12 3.61 22.186a2.03 2.03 0 0 1-.22-.924V2.738c0-.348.08-.669.22-.924z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M17.185 8.608l-3.393 3.392 3.393 3.392 3.856-2.203a1.458 1.458 0 0 0 0-2.378l-3.856-2.203z"
                  />
                  <path
                    fill="#4285F4"
                    d="M3.609 1.814l10.183 10.186 3.393-3.392L6.113.332A1.947 1.947 0 0 0 3.61 1.814z"
                  />
                  <path
                    fill="#34A853"
                    d="M3.609 22.186A1.947 1.947 0 0 0 6.113 23.67l11.072-6.276-3.393-3.394L3.61 22.186z"
                  />
                </svg>
                <span className="text-sm font-medium tracking-tight">Download</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
