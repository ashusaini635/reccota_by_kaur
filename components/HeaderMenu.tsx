"use client";
import { headerData } from "@/constants/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = () => {
  const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center justify-center gap-8 text-xs md:text-sm uppercase tracking-widest font-semibold text-darkColor">
      {headerData?.map((item) => (
        <Link
          key={item?.title}
          href={item?.href}
          className={`hover:text-accent-pink transition-colors duration-300 relative group ${
            pathname === item?.href && "text-accent-pink"
          }`}
        >
          {item?.title}
          <span
            className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-accent-pink origin-center transform transition-transform duration-300 ease-out ${
              pathname === item?.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
