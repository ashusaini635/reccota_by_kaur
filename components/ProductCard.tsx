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
  const isOutOfStock = product?.stock === 0;
  const statusMap = {
    sale: (
      <span className="inline-block border border-dark-pink text-dark-pink uppercase tracking-widest font-bold text-[9px] px-2 py-0.5 rounded-full">
        Sale
      </span>
    ),
    new: (
      <span className="inline-block border border-accent-pink text-accent-pink uppercase tracking-widest font-bold text-[9px] px-2 py-0.5 rounded-full">
        New
      </span>
    ),
    hot: (
      <Link
        href="/deal"
        className="inline-flex items-center gap-1 bg-orange-50 text-orange-600 border border-orange-200 uppercase tracking-widest font-bold text-[9px] px-2 py-0.5 rounded-full hover:scale-105 transition-transform"
      >
        <FlameIcon size={12} strokeWidth={2.5} />
        Hot
      </Link>
    ),
  };

  return (
    <div className="group flex flex-col bg-transparent cursor-pointer">
      {/* Image Section - Fashion Arch Style */}
      <div className="relative w-full aspect-4/5 overflow-hidden rounded-t-[3rem] rounded-b-2xl border border-accent-pink/20 bg-soft-pink/20 group-hover:border-accent-pink/40 group-hover:shadow-2xl group-hover:shadow-accent-pink/10 transition-all duration-500">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              alt={product?.name || "Product Image"}
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-full object-cover transition-transform duration-700 ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}
        <AddToWishlistButton
          product={product}
          className="absolute top-3 right-3 z-10 shadow-sm rounded-full"
        />
      </div>

      {/* Content Section - Unique Editorial Layout */}
      <div className="pt-3 sm:pt-4 flex flex-col gap-1 sm:gap-2 grow px-1 sm:px-0">
        <div className="flex justify-between items-start w-full gap-2">
          <div className="flex flex-col gap-1 w-full min-w-0">
            {/* Category Overline */}
            {product?.categories && (
              <p className="uppercase tracking-widest text-[10px] text-accent-pink font-semibold truncate">
                {product.categories
                  .map((category: any) => category?.title || category)
                  .join(", ")}
              </p>
            )}

            {/* Title - Elegant Serif */}
            <Title className="text-sm md:text-base font-serif italic font-medium text-darkColor line-clamp-1 group-hover:text-dark-pink transition-colors duration-300">
              {product?.name}
            </Title>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={12}
                    className={
                      index < 4 ? "text-accent-pink" : " text-gray-500"
                    }
                    fill={index < 4 ? "#fc6c85" : "#6a7282"}
                  />
                ))}
              </div>
              <p className="text-lightText text-xs tracking-wide">5 Reviews</p>
            </div>
          </div>

          {/* Status Badge */}
          {product?.status && (
            <div className="shrink-0 mt-0.5">{statusMap[product.status]}</div>
          )}
        </div>

        {/* Bottom Actions - Price & Cart */}
        <div className="flex flex-col w-full mt-auto gap-0.5">
          <div className="flex flex-col items-start w-full gap-1">
            <PriceView
              price={product?.price}
              discount={product?.discount}
              className="text-sm font-sans flex-wrap"
            />
            {/* Stock Status */}
            <p
              className={`text-[10px] uppercase tracking-wider font-bold pt-1 ${isOutOfStock ? "text-red-500" : "text-green-600"}`}
            >
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </p>
          </div>
          <AddToCartButton
            product={product}
            className="w-full rounded-full bg-transparent text-darkColor border border-darkColor/30 hover:bg-dark-pink hover:border-dark-pink hover:text-white transition-all duration-300 py-2.5 text-xs font-semibold tracking-widest shadow-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
