"use client";

import React, { useState } from "react";

interface Props {
  sizes: string[];
}

const SizeSelector = ({ sizes }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size: string, index: number) => (
        <button
          key={index}
          onClick={() => setSelectedSize(size)}
          className={`w-11 h-11 border rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 uppercase ${
            selectedSize === size
              ? "border-accent-pink bg-accent-pink text-white shadow-md hover:bg-dark-pink hover:border-dark-pink"
              : "border-darkColor/20 text-darkColor hover:border-accent-pink hover:bg-soft-pink/30 hover:text-accent-pink"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;