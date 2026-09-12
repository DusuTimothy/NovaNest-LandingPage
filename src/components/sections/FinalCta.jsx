import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function FinalCta() {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 bg-brand-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating Card with Breaking A-Frame House */}
        <div className="relative bg-brand-cream-50 rounded-[28px] md:rounded-[36px] shadow-2xl overflow-visible border border-white/90 min-h-[420px] flex items-center">
          <div className="w-full p-8 sm:p-12 lg:p-16 relative">
            {/* Left Content */}
            <div className="w-full lg:max-w-[500px] flex flex-col items-start z-10 relative">
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium text-on-light tracking-tight leading-[1.2]">
                Begin your property listing or purchasing journey with NovaNest.
              </h2>

              <p className="mt-5 text-base text-on-light-muted leading-relaxed font-normal">
                Embark on your real estate journey by leveraging the expertise
                and resources of NovaNest. Whether you&apos;re listing your property
                for sale or searching for your dream home, our dedicated team is
                here to guide you every step of the way. With NovaNest, your real
                estate goals are within reach.
              </p>

              <div className="mt-8 sm:mt-10">
                <Button href="#popular-ads" variant="primary" size="lg">
                  Get Started
                </Button>
              </div>
            </div>

            {/* Right: House image matching Figma: position: absolute; width: 632px; height: 458px; left: 568px; top: -62.57px; */}
            <div className="relative w-full max-w-[500px] h-[300px] sm:h-[360px] mx-auto mt-8 lg:mt-0 lg:absolute lg:left-[568px] lg:-top-[62.57px] lg:w-[632px] lg:h-[458px] z-1 pointer-events-none select-none">
              <Image
                src="/images/getStarted.png"
                alt="NovaNest Luxury Property - Get Started"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 632px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
