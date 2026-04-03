"use client"
import useStore from "@/collection";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartIcon = () => {
  const { items } = useStore();
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-accent-pink hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-accent-pink text-white h-4 w-4 text-xs rounded-full font-semibold flex items-center justify-center">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
