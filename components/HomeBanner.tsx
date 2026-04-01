import React from "react";
import Link from "next/link";
import { Title } from "./ui/text";
import { Button } from "./ui/button";
import Image from "next/image";
import { banner_1 } from "@/assets";

const HomeBanner = () => {
  return (
    <div className="relative my-8 md:my-10 py-16 md:py-24 bg-soft-pink/40 rounded-[3rem] px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-soft-pink/50 rounded-full blur-3xl" />
      </div>

      <div className="w-full md:w-1/2 space-y-6 md:space-y-8 z-10 relative text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-1 bg-accent-pink rounded-full" />
          <p className="text-sm font-semibold tracking-widest uppercase text-accent-pink">
            New Collection
          </p>
        </div>
        <Title className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-[1.1]">
          Handcrafted <span className="text-accent-pink font-serif italic font-medium">Elegance</span> <br className="hidden md:block" />
          for Every Girl
        </Title>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
          Discover our exquisite collection of premium handmade clothing. 
          Designed with love, tradition, and care.
        </p>
        <div className="pt-2">
          <Link href="/collections">
            <Button
              size="lg"
              className="bg-dark-pink text-white hover:bg-accent-pink hoverEffect rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-10 md:mt-0">
        {/* Decorative offset frames for the image */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-95 aspect-4/5 border border-accent-pink/40 rounded-t-full rounded-b-3xl rotate-6 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-95 aspect-4/5 border border-accent-pink/30 rounded-t-full rounded-b-3xl -rotate-3 pointer-events-none" />
        
        <div className="w-[85%] max-w-95 aspect-4/5 overflow-hidden rounded-t-full rounded-b-3xl border-[6px] border-white shadow-2xl relative z-10 group">
          <Image
            src={banner_1}
            alt="Elegant hand-painted ethnic wear"
            className="w-full h-full object-cover object-bottom group-hover:scale-105 transition-transform duration-1000"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
