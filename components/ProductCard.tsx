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
      <p
        className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 
      px-2 rounded-full group-hover:border-accent-pink group-hover:text-accent-pink hoverEffect"
      >
        Sale!
      </p>
    ),
    new: (
      <p
        className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 
      px-2 rounded-full group-hover:border-accent-pink group-hover:text-accent-pink hoverEffect"
      >
        New Arrival
      </p>
    ),
    hot: (
      <Link href="/deal">
        <FlameIcon
          size={20}
          fill="#fb6c08"
          className="absolute top-2 left-2 z-10 border border-orange-400/50 px-1 rounded-full group-hover:border-orange-400 hover:text-accent-pink hoverEffect"
        />
      </Link>
    ),
  };

  return (
    <div className="text-sm border border-soft-pink rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl shadow-xl bg-white group overflow-hidden hover:border-accent-pink/50 transition-all duration-300 cursor-pointer hover:-translate-y-2 hoverEffect">
      <div className="relative group overflow-hidden bg-soft-pink/30">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden transition-transform bg-white duration-500 ${product?.stock !== 0 ? "group-hover:scale-105" : "opatcity-50"}`}
          />
        )}
        <AddToWishlistButton product={product} />
        {product?.status && statusMap[product.status]}
      </div>
      <div className="p-3 flex flex-col gap-1.5">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-gray-400">
            {product.categories.map((category) => category).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={12}
                key={index}
                className={index < 4 ? "text-accent-pink" : "text-gray-300"}
                fill={index < 4 ? "#fc6c85" : "lab(85.1236% -.612259 -3.7138)"}
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs tracking-wide">5 Review</p>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p className={`${product?.stock === 0 ? "text-red-600": "text-stock font-semibold"}`}>
            {(product?.stock as number) > 0 ? product.stock : "Out of Stock"}
          </p>
        </div>
        <PriceView 
          price={product?.price}
          discount={product?.discount}
          className="text-sm"/>
          <AddToCartButton product={product} className="w-34 rounded-full"/>
      </div>
    </div>
  );
};

export default ProductCard;
