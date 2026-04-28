"use client";

import AddToCartButton from "@/components/AddToCartButton";
import FavoriteButton from "@/components/FavoriteButton";
import React, { useState, useEffect } from "react";
import PriceView from "@/components/PriceView";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const AddToCartArea = ({ product }: { product: any }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const colorFromUrl = searchParams.get("color");

  // Automatically select an available SKU's size and color
  const defaultVariant = product?.variants?.find((v: any) => (v.stock || 0) > 0) || product?.variants?.[0];

  // Extract dynamic available colors from variants
  const availableColors = Array.from(
    new Set(product?.variants?.map((v: any) => v.color).filter(Boolean))
  ) as string[];

  const initialColor = colorFromUrl === "none" ? null : colorFromUrl;
  const [selectedColor, setSelectedColor] = useState<string | null>(
    initialColor || defaultVariant?.color || (availableColors.length ? availableColors[0] : null)
  );

  // Filter sizes based on the currently selected color
  const variantsForColor = selectedColor 
    ? product?.variants?.filter((v: any) => v.color === selectedColor)
    : product?.variants;

  const availableSizes = Array.from(
    new Set(variantsForColor?.flatMap((v: any) => v.size).filter(Boolean))
  ) as string[];

  const [selectedSize, setSelectedSize] = useState<string | null>(
    colorFromUrl === "none" ? null :
      (Array.isArray(defaultVariant?.size) ? defaultVariant?.size[0] : defaultVariant?.size || (availableSizes.length ? availableSizes[0] : null))
  );

  // Sync internal state if URL changes (e.g. from ImageView)
  useEffect(() => {
    if (colorFromUrl === "none") {
      setSelectedColor(null);
      setSelectedSize(null);
    } else if (colorFromUrl && availableColors.includes(colorFromUrl)) {
      setSelectedColor(colorFromUrl);
    }
  }, [colorFromUrl, availableColors]);

  // Ensure selectedSize is valid for the newly selected color
  useEffect(() => {
    if (selectedSize && !availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes.length > 0 ? availableSizes[0] : null);
    }
  }, [selectedColor, availableSizes, selectedSize]);

  const handleColorSelect = (color: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedColor === color) {
      setSelectedColor(null);
      params.set("color", "none");
    } else {
      setSelectedColor(color);
      params.set("color", color);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Check variant-level stock
  const hasVariants = product?.variants?.length > 0;
  const selectedVariant = product?.variants?.find(
    (v: any) =>
      (Array.isArray(v.size) ? v.size.includes(selectedSize) : (v.size || null) === (selectedSize || null)) &&
      (v.color || null) === (selectedColor || null)
  );

  const isVariantSelected = Boolean(selectedSize || selectedColor);
  const availableStock = isVariantSelected ? (selectedVariant?.stock ?? 0) : (product?.stock ?? 0);
  const currentPrice = isVariantSelected && selectedVariant?.price ? selectedVariant.price : product?.basePrice;

  const isOutOfStock = availableStock <= 0;

  // We inject the selections and the dynamic price into the product payload
  const productToCart = {
    ...product,
    price: currentPrice,
    selectedSize,
    selectedColor,
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Dynamic Price & Stock Badge */}
      <div className="border-y border-accent-pink/10 py-5 space-y-4">
        <PriceView
          price={currentPrice}
          discount={product?.discount}
          className="text-lg md:text-xl font-bold"
        />
        <div>
          <span
            className={`inline-block px-4 py-1.5 text-xs uppercase tracking-widest font-bold rounded-full ${isOutOfStock
                ? "bg-red-50 text-red-500 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
              }`}
          >
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>

        {/* Color Selection */}
        {availableColors.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-accent-pink uppercase tracking-widest">
              Select Color
            </p>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`px-4 py-2 text-sm border rounded-full transition-all duration-300 ${selectedColor === color
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
        {availableSizes.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-bold text-accent-pink uppercase tracking-widest">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  className={`px-4 py-2 text-sm font-medium border rounded-full uppercase transition-all duration-300 ${selectedSize === size
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
    </div>
  );
};

export default AddToCartArea;