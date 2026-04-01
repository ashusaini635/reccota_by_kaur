import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-accent-pink hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-accent-pink text-white h-3.5 w-3.5 text-xs rounded-full font-semibold flex items-center justify-center">
            0
          </span>
        </Link>
      ) : (
        <button
          className="group relative hover:text-accent-pink 
        hoverEffect border border-accent-pink/80 hover:border-accent-pink 
        p-1.5 rounded-sm"
        >
          <Heart
            className="text-accent-pink/80 
          group-hover:text-accent-pink hoverEffect mt-.5 w-5 h-5"
          />
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
