import Container from "@/components/Container";
import React from "react";
import { Paintbrush, Scissors, Heart, Sparkles, Leaf, Star } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="py-12 md:py-20 bg-linear-to-b from-soft-pink/10 to-white min-h-screen overflow-hidden">
      <Container className="flex flex-col gap-16 md:gap-24">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto transform transition-all duration-700 hover:scale-[1.02]">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-darkColor">
            Our <span className="text-accent-pink font-serif italic font-medium">Story</span>
          </h1>
          <div className="w-24 h-1 bg-accent-pink/80 rounded-full mx-auto" />
          <p className="text-gray-600 text-base md:text-xl leading-relaxed mt-6">
            Welcome to <span className="font-semibold text-darkColor">Reecota By Kaur</span>. We are a passionate team dedicated to redefining fashion through the timeless art of handmade clothing.
          </p>
        </div>

        {/* Content Split Section */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6 group">
            <h2 className="text-3xl md:text-4xl font-bold text-darkColor tracking-wide">
              A Unique Approach to <span className="font-serif italic text-accent-pink font-medium relative inline-block">
                Fashion
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-pink transition-all duration-500 group-hover:w-full"></span>
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              In a world of mass production, we take a step back to appreciate the beauty of slow fashion. Every garment at Reecota By Kaur is thoughtfully designed, hand-painted, and meticulously crafted by skilled artisans. We don't just make clothes; we create wearable art.
            </p>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Our unique process ensures that no two pieces are exactly alike. When you wear our hand-painted suits, elegant sarees, or stylish coord sets, you are wearing a unique masterpiece tailored specifically for you—bringing elegance, tradition, and comfort to your wardrobe.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            {/* Decorative animated element */}
            <div className="relative w-full max-w-sm aspect-square rounded-full border border-accent-pink/30 bg-soft-pink/20 flex items-center justify-center shadow-lg p-4 transition-transform duration-700 hover:rotate-3 hover:scale-105">
              {/* Rotating dashed border */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-accent-pink/40 animate-[spin_20s_linear_infinite]" />
              <div className="relative w-full h-full rounded-full border border-accent-pink/50 flex flex-col items-center justify-center text-center p-8 bg-white/60 backdrop-blur-sm shadow-inner">
                <Sparkles className="text-accent-pink w-10 h-10 mb-4 animate-pulse" />
                <h3 className="font-serif italic text-3xl text-darkColor font-medium mb-2">Handcrafted</h3>
                <p className="text-sm text-gray-600 uppercase tracking-[0.2em] font-medium">With Love & Care</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Process Section (New) */}
        <div className="py-12 border-y border-accent-pink/10 bg-white/50 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-darkColor tracking-wide">
              The <span className="font-serif italic text-accent-pink font-medium">Process</span>
            </h2>
            <p className="text-gray-500 mt-3">How we bring our wearable art to life</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-linear-to-r from-transparent via-accent-pink/30 to-transparent -translate-y-1/2 z-0" />
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-accent-pink/20 flex items-center justify-center mb-6 shadow-md group-hover:border-accent-pink transition-colors duration-300 group-hover:-translate-y-2">
                <Star className="w-8 h-8 text-accent-pink" />
              </div>
              <h3 className="text-xl font-bold text-darkColor mb-2">1. Design</h3>
              <p className="text-gray-600 text-sm px-4">Every piece starts with a unique vision, sketching patterns that blend modern trends with traditional roots.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-accent-pink/20 flex items-center justify-center mb-6 shadow-md group-hover:border-accent-pink transition-colors duration-300 group-hover:-translate-y-2 delay-100">
                <Paintbrush className="w-8 h-8 text-accent-pink" />
              </div>
              <h3 className="text-xl font-bold text-darkColor mb-2">2. Hand-Painting</h3>
              <p className="text-gray-600 text-sm px-4">Our artisans meticulously paint each design directly onto the fabric, infusing soul into the garment.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-white border-2 border-accent-pink/20 flex items-center justify-center mb-6 shadow-md group-hover:border-accent-pink transition-colors duration-300 group-hover:-translate-y-2 delay-200">
                <Scissors className="w-8 h-8 text-accent-pink" />
              </div>
              <h3 className="text-xl font-bold text-darkColor mb-2">3. Crafting</h3>
              <p className="text-gray-600 text-sm px-4">Precision tailoring ensures that the final silhouette is not just beautiful, but perfectly comfortable.</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-darkColor tracking-wide">
              Our <span className="font-serif italic text-accent-pink font-medium">Core Values</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-white border border-accent-pink/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-14 h-14 mx-auto bg-soft-pink/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-accent-pink" />
              </div>
              <h3 className="text-lg font-bold text-darkColor uppercase tracking-wider mb-3 group-hover:text-accent-pink transition-colors">Authenticity</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We stay true to traditional craftsmanship, blending it seamlessly with modern aesthetics to bring you truly original designs.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-accent-pink/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group delay-100">
              <div className="w-14 h-14 mx-auto bg-soft-pink/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-accent-pink" />
              </div>
              <h3 className="text-lg font-bold text-darkColor uppercase tracking-wider mb-3 group-hover:text-accent-pink transition-colors">Premium Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Using only the finest materials, we ensure that every thread, color, and stitch meets the highest standards of elegance and durability.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-accent-pink/10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group delay-200">
              <div className="w-14 h-14 mx-auto bg-soft-pink/30 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6 h-6 text-accent-pink" />
              </div>
              <h3 className="text-lg font-bold text-darkColor uppercase tracking-wider mb-3 group-hover:text-accent-pink transition-colors">Sustainability</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                By embracing slow, handmade fashion, we promote a more sustainable and mindful approach to the clothes we wear every day.
              </p>
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default AboutPage;
//