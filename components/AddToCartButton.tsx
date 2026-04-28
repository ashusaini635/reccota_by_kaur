"use client";
import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/collection";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";
import Link from "next/link";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount, getProductCount } = useStore();
  
  const p = product as any;
  const hasVariants = p?.variants?.length > 0;
  const isVariantSelected = Boolean(p.selectedSize || p.selectedColor);
  const selectedVariant = p?.variants?.find(
    (v: any) => 
      (Array.isArray(v.size) ? v.size.includes(p.selectedSize) : (v.size || null) === (p.selectedSize || null)) && 
      (v.color || null) === (p.selectedColor || null)
  );
  
  // Enforce stock based on the specific variant or base product.
  const availableStock = isVariantSelected ? (selectedVariant?.stock ?? 0) : (p?.stock ?? 0);

  const itemCount = getItemCount(product?._id, p?.selectedSize, p?.selectedColor);
  
  const isOutOfStock = availableStock <= 0 || availableStock <= itemCount;

  const handleAddToCart = () => {
    const canAdd = availableStock > itemCount;

    if (canAdd) {
      addItem(product)
      toast.dismiss();
      toast.success(`${product?.name?.substring(0, 12)}... added Successfully`)
    } else {
      toast.dismiss();
      toast.error("Not enough stock available");
    }

  }
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? <div className="text-sm w-full">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs text-darkColor/80">Qty: </span>
          <QuantityButton product={product} />
        </div>
        <div className="flex items-center justify-between border-t pt-1">
          <span className="text-xs font-semibold">Subtotal</span>
          <PriceFormatter
            amount={(p?.price || p?.basePrice || 0) * itemCount}
            className="text-sm font-bold text-dark-pink"
          />
        </div>
      </div> : <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full bg-discount/80 text-gray-100 shadow-none border border-discount/80 tracking-wide font-semibold hover:text-white hover:bg-accent-pink hover:border-accent-pink hoverEffect",
          className,
        )}
      >
        <ShoppingBag />
        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>}
    </div>
  );
};





export default AddToCartButton;
