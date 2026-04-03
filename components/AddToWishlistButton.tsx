"use client"
import useStore from '@/collection';
import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { fa } from 'zod/v4/locales';

const AddToWishlistButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
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
    <div className={cn("absolute top-2 right-4 z-10 hover:cursor-pointer", className)}>
      <button className={`p-2.5 rounded-full hover:bg-accent-pink hover:text-white hoverEffect ${existingProduct ? "bg-accent-pink/80 text-white" : "bg-white"}`}
        onClick={handleFavorite}>
        <Heart size={15} />
      </button>
    </div>
  )
}

export default AddToWishlistButton
