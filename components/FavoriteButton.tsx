import React from 'react'
import Link from "next/link";
import { Heart } from "lucide-react";

const FavoriteButton = () => {
  return (
    <Link href={"/cart"} className="group relative">
      <Heart className="w-5 h-5 hover:text-accent-pink hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-accent-pink text-white h-3.5 w-3.5 text-xs rounded-full font-semibold flex items-center justify-center">
        0
      </span>
    </Link>
  )
}

export default FavoriteButton
