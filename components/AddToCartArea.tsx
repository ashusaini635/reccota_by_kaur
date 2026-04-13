"use client";

import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import React, { useState } from "react";

const AddToCartArea = ({ product }: { product: any }) => {
  // Default to the first available size and color
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product?.sizes?.length ? product.sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product?.colors?.length ? product.colors[0] : null
  );

  // We inject the selections into the product payload
  const productToCart = {
    ...product,
    selectedSize,
    selectedColor,
  };

  // Check variant-level stock
  const hasVariants = product?.variants?.length > 0;
  const selectedVariant = product?.variants?.find(
    (v: any) => (v.size || null) === (selectedSize || null) && (v.color || null) === (selectedColor || null)
  );
  const availableStock = hasVariants 
    ? (selectedVariant?.stock || 0) 
    : (product?.stock || 0);
  const isOutOfStock = availableStock === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Dynamic Stock Badge */}
      <div>
        <span
          className={`inline-block px-4 py-1.5 text-xs uppercase tracking-widest font-bold rounded-full ${
            isOutOfStock
              ? "bg-red-50 text-red-500 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : "In Stock"}
        </span>
      </div>

      {/* Color Selection */}
      {product?.colors && product.colors.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-accent-pink uppercase tracking-widest">
            Select Color
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 text-sm border rounded-full transition-all duration-300 ${
                  selectedColor === color
                    ? "border-accent-pink bg-accent-pink text-white shadow-md"
                    : "border-gray-200 text-gray-700 hover:border-accent-pink/50 hover:bg-accent-pink/5"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product?.sizes && product.sizes.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-accent-pink uppercase tracking-widest">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 text-sm font-medium border rounded-full uppercase transition-all duration-300 ${
                  selectedSize === size
                    ? "border-accent-pink bg-accent-pink text-white shadow-md"
                    : "border-gray-200 text-gray-700 hover:border-accent-pink/50 hover:bg-accent-pink/5"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <div className="flex-1">
          <AddToCartButton
            product={productToCart}
            className="w-full bg-darkColor text-white hover:bg-dark-pink hover:border-dark-pink py-3.5 md:py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 shadow-lg border border-transparent"
          />
        </div>
        <FavoriteButton showProduct={true} product={productToCart} />
      </div>

    </div>
  );
};

export default AddToCartArea;