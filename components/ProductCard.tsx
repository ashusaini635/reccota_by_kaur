import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { FlameIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  const statusMap = {
    sale: (
      <span className="text-dark-pink uppercase tracking-widest font-bold text-[10px]">
        Sale
      </span>
    ),
    new: (
      <span className="text-accent-pink uppercase tracking-widest font-bold text-[10px]">
        New Arrival
      </span>
    ),
    hot: (
      <Link href="/deal" className="text-orange-500 uppercase tracking-widest font-bold text-[10px] flex items-center gap-1 hover:scale-105 transition-transform">
        <FlameIcon
          size={12}
          strokeWidth={2.5}
        />
        Hot
      </Link>
    ),
  };

  return (
    <div className="group flex flex-col bg-transparent cursor-pointer">
      {/* Image Section - Fashion Arch Style */}
      <div className="relative w-full aspect-4/5 overflow-hidden rounded-t-[3rem] rounded-b-2xl border border-accent-pink/20 bg-soft-pink/20 group-hover:border-accent-pink/40 group-hover:shadow-2xl group-hover:shadow-accent-pink/10 transition-all duration-500">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt={product?.name || "Product Image"}
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-full object-cover transition-transform duration-700 ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <AddToWishlistButton product={product} className="absolute top-3 right-3 z-10 shadow-sm rounded-full" />
      </div>

      {/* Content Section - Editorial Centered Layout */}
      <div className="pt-5 flex flex-col items-center text-center gap-3 grow">
        <div className="flex flex-col items-center gap-1.5 w-full">
          {/* Status and Category Overline */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
            {product?.status && statusMap[product.status]}
            
            {product?.status && product?.categories && (
              <span className="w-1 h-1 rounded-full bg-gray-300 inline-block" />
            )}
            
            {product?.categories && (
              <p className="uppercase tracking-widest text-[10px] text-gray-500 font-semibold">
                {product.categories.map((category) => category).join(", ")}
              </p>
            )}
          </div>

          {/* Title */}
          <Title className="text-base font-semibold text-darkColor line-clamp-1 group-hover:text-accent-pink transition-colors duration-300">
            {product?.name}
          </Title>

          {/* Reviews & Stock */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  size={12}
                  key={index}
                  className={index < 4 ? "text-accent-pink" : "text-gray-200"}
                  fill={index < 4 ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-300 mx-1" />
            <p className={`text-xs font-medium ${product?.stock === 0 ? "text-red-500" : "text-green-600"}`}>
              {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>

        {/* Bottom Actions - Price & Cart */}
        <div className="flex flex-col items-center gap-4 w-full mt-auto">
          <PriceView 
            price={product?.price}
            discount={product?.discount}
            className="text-lg"
          />
          <AddToCartButton 
            product={product} 
            className="w-full rounded-full bg-transparent text-darkColor border border-darkColor/30 hover:bg-dark-pink hover:border-dark-pink hover:text-white transition-all duration-300 py-3 font-semibold tracking-wide"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
