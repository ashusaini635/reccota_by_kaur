import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className="inline-flex group items-center">
      <h2 className={cn("flex items-baseline gap-1.5 text-2xl", className)}>
        <span className="text-darkColor font-bold uppercase tracking-widest group-hover:text-dark-pink transition-colors duration-300">
          Reecota
        </span>
        <span className="text-darkColor/70 text-[0.6em] font-semibold uppercase tracking-widest">
          By
        </span>
        <span className="text-accent-pink font-serif italic font-medium text-[1.2em] tracking-normal group-hover:-translate-y-0.5 transition-transform duration-300">
          Kaur
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
