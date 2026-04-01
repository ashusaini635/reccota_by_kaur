"use client";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React from "react";
interface Props {
  images?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
    _key: string;
  }>;
  isStock: number | undefined;
}

const ImageView = ({ images = [], isStock }: Props) => {
  const [active, setActive] = React.useState(images[0]);
  const [activeTab, setActiveTab] = React.useState<
    "description" | "additional" | "review"
  >("description");

  return (
    <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={active?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-h-137.5 min-h-112.5 border border-darkColor/10 rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(active).url()}
            alt="prodcutImage"
            width={700}
            height={700}
            priority
            className={`w-full h-96 max-h-137.5 min-h-125 object-contain group-hover:scale-110 hoverEffect rounded-md ${isStock === 0 ? "opacity-50" : ""}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-6 gap-2 h-20 md:h-24">
        {images?.map((image) => (
          <button
            key={image?._key}
            onClick={() => setActive(image)}
            className={`border rounded-md 
                overflow-hidden 
                ${active?._key === image?._key ? "border-accent-pink opacity-100" : "opacity-80"}`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image._key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
      <div className="flex bg-gray-300/20 rounded-md gap-2 p-1  h-10">
        <button
          onClick={() => setActiveTab("description")}
          className={`w-full text-center text-sm font-medium hover:bg-accent-pink/90 hover:text-white hover:rounded-md hoverEffect ${
            activeTab === "description"
              ? "bg-accent-pink text-white rounded-md"
              : "text-darkColor"
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab("additional")}
          className={`w-full text-center text-sm font-medium hover:bg-accent-pink/90 hover:text-white hover:rounded-md hoverEffect ${
            activeTab === "additional"
              ? "bg-accent-pink text-white rounded-md"
              : "text-darkColor"
          }`}
        >
          Additional Information
        </button>
        <button
          onClick={() => setActiveTab("review")}
          className={`w-full text-center text-sm font-medium hover:bg-accent-pink/90 hover:text-white hover:rounded-md hoverEffect ${
            activeTab === "review"
              ? "bg-accent-pink text-white rounded-md"
              : "text-darkColor"
          }`}
        >
          Review
        </button>
      </div>

      <div className="mt-4 p-4 border border-darkColor/10 rounded-md bg-white text-gray-600 text-sm leading-relaxed shadow-sm min-h-32">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.p
              key="description"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              Experience the finest craftsmanship with this product. It features
              a stunning design tailored for elegance and comfort. (You can pass
              the actual product description here as a prop to make it dynamic).
            </motion.p>
          )}
          {activeTab === "additional" && (
            <motion.div
              key="additional"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <p>
                <strong>Material:</strong> 100% Premium Cotton
              </p>
              <p>
                <strong>Care Instructions:</strong> Hand wash cold, do not
                bleach.
              </p>
              <p>
                <strong>Brand:</strong> Reecota By Kaur
              </p>
            </motion.div>
          )}
          {activeTab === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div>
                <span className="text-accent-pink text-lg">⭐⭐⭐⭐⭐</span>
                <p className="mt-1">
                  "Absolutely love the quality and design. Perfect fit!" <br />
                  <span className="text-xs text-gray-400">- Jane D.</span>
                </p>
              </div>
              <p className="text-xs text-gray-400 italic pt-2">
                More reviews coming soon...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageView;
