"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import useStore from "@/collection";
import toast from "react-hot-toast";

const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product;
}) => {
  const { addToFavorite, favoriteProduct } = useStore()
  const [existingProduct, setExistingProduct] = useState<Product | null>(null)
  useEffect(() => {
    const availableProduct = favoriteProduct?.find((item) => item?._id === product?._id)
    setExistingProduct(availableProduct || null)
  }, [product, favoriteProduct])
  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.dismiss()
        toast.success(existingProduct ? "Product Removed Successfully" : "Product Added Successfully")
      })
    }
  }
  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative">
          <Heart className="w-5 h-5 hover:text-accent-pink hoverEffect" />
          <span className="absolute -top-1 -right-1 bg-accent-pink text-white h-4 w-4 text-xs rounded-full font-semibold flex items-center justify-center">
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          className={`group flex items-center justify-center w-9 h-9 rounded-full border transition-all hover:-translate-y-1 duration-300 hoverEffect shadow-sm ${existingProduct
              ? "bg-accent-pink text-white border-accent-pink hover:bg-dark-pink hover:border-dark-pink"
              : "bg-white text-accent-pink border-accent-pink/30 hover:border-accent-pink hover:bg-accent-pink hover:text-white"
            }`}
        >
          <Heart
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            fill={existingProduct ? "currentColor" : "none"}
          />
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
