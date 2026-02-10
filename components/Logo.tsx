import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href={"/"} className="inline-flex">
      <h2 className={cn("text-2xl font-semibold hoverEffect group font-sans", className)}>
        Reecota By {" "}
        <span
          className={cn(
            "text-dark-pink group-hover:text-accent-pink hoverEffect"
          )}
        >
          Kaur
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
