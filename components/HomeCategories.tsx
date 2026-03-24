import React from "react";
import { Title } from "./ui/text";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="py-10 md:py-16">
      <div className="text-center mb-12 flex flex-col items-center gap-3">
        <Title className="text-3xl md:text-4xl font-bold tracking-wide">
          Popular Categories
        </Title>
        <div className="w-20 h-1 bg-accent-pink/80 rounded-full" />
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Discover our exquisite collection of hand-painted suits, elegant sarees, and stylish coord sets.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/category/${category?.slug?.current}`}
            className="group flex flex-col items-center gap-4"
          >
            <div className="w-full aspect-4/5 overflow-hidden rounded-t-full rounded-b-2xl border border-accent-pink/20 bg-soft-pink/30 group-hover:bg-soft-pink/60 group-hover:border-accent-pink/50 group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 p-4 flex items-center justify-center">
              {category?.image && (
                <Image
                  src={urlFor(category?.image).url()}
                  alt={category?.title || "categoryImage"}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
              )}
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base md:text-lg font-semibold text-darkColor group-hover:text-accent-pink transition-colors duration-300">
                {category?.title}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {category?.productCount} {category?.productCount === 1 ? "Item" : "Items"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
