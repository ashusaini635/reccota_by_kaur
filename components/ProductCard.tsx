import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Flame, FlameIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToWishlistButton from "./AddToWishlistButton";

const ProductCard = ({ product }: { product: Product }) => {
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
          />
        )}
        <AddToWishlistButton product={product} />
        {product?.status === "sale" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 
        px-2 rounded-full group-hover:border-accent-pink group-hover:text-accent-pink hoverEffect"
          >
            Sale!
          </p>
        )}

        {product?.status === "new" && (
          <p
            className="absolute top-2 left-2 z-10 text-xs border border-darkColor/50 
        px-2 rounded-full group-hover:border-accent-pink group-hover:text-accent-pink hoverEffect"
          >
            New Arrival
          </p>
        )}

        {product?.status === "hot" && (
          <Link href={"/deal"}>
          <FlameIcon size={20}
          fill="#fb6c08"
          className="absolute top-2 left-2 z-10 border border-orange-400/50 px-1 rounded-full group-hover:border-orange-400
          hover:text-accent-pink hoverEffect"></FlameIcon>
          </Link>
        )}
      </div>
      <div className="p-3">Product Details</div>
    </div>
  );
};

export default ProductCard;
