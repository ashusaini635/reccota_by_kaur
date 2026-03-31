"use client";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  product: Product | null | undefined;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;
  const handleAddToCart = () => {
    window.alert("Add to Cart");
  }
  return (
    <div className="w-full h-12 flex items-center">
      <Button
      onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-discount/80 text-gray-100 shadow-none border border-discount/80 tracking-wide font-semibold hover:text-white hover:bg-accent-pink hover:border-accent-pink hoverEffect",
          className,
        )}
      >
        <ShoppingBag />
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

export default AddToCartButton;
