import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function FinalCta() {
  return (
    <section className="relative pt-16 pb-28 md:pt-24 md:pb-40 bg-brand-forest-800 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative bg-brand-cream-50 rounded-[28px] md:rounded-[36px] shadow-2xl border border-white/90 overflow-visible min-h-90 md:min-h-105 lg:min-h-115">
          {/* Copy — left ~half, vertically centered */}
          <div className="relative z-10 w-full lg:w-[48%] p-8 sm:p-12 lg:pl-16 lg:pr-4 lg:py-16 flex flex-col items-start justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-medium text-on-light tracking-tight leading-[1.2]">
              Begin your property listing or purchasing journey with NovaNest.
            </h2>

            <p className="mt-5 text-base text-on-light-muted leading-relaxed font-normal">
              Embark on your real estate journey by leveraging the expertise and
              resources of NovaNest. Whether you&apos;re listing your property for
              sale or searching for your dream home, our dedicated team is here to
              guide you every step of the way. With NovaNest, your real estate
              goals are within reach.
            </p>

            <div className="mt-8 sm:mt-10">
              <Button href="#popular-ads" variant="primary" size="lg">
                Get Started
              </Button>
            </div>
          </div>

          {/*
            getStarted.png only — resized/positioned from Container (5) reference:
            house spans ~35%→100% of card width, ~-10% above top, ~+18% below bottom.
            object-cover crops the PNG’s transparent padding so the house fills that frame.
          */}
          <div
            className="
              relative z-1 pointer-events-none select-none
              mx-auto  mb-10 w-[min(100%,420px)] h-75 sm:h-85
              lg:absolute lg:mx-0 lg:mt-0 lg:mb-0
              lg:left-[42%] lg:right-[-200] lg:w-auto
              lg:top-[-10%] lg:bottom-[-18%] lg:h-auto
            "
          >
            <Image
              src="/images/getStarted.png"
              alt="NovaNest luxury A-frame property"
              className="object-cover object-bottom lg:object-bottom-right"
              sizes="(max-width: 1024px) 90vw, 65vw"
              width={800}
              height={420}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
