"use client";
import { Category, Product } from "@/sanity.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import NoProductAvailable from "./NoProductAvailabe";
import ProductCard from "./ProductCard";
interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCategoryChange = (newSlug: string) => {
    if (newSlug == currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };
  const fetchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `
        *[_type == 'product' && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){
        ...,"categories":categories[]->title}
        `;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="py-8 md:py-12 flex flex-col md:flex-row items-start gap-8 md:gap-12">
      {/* Sidebar / Tabs */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-4 md:gap-6 md:sticky md:top-24 z-10">
        <div className="hidden md:flex flex-col gap-2">
          <h2 className="text-2xl font-serif italic font-medium text-darkColor">
            Collections
          </h2>
          <div className="w-12 h-1 bg-accent-pink/80 rounded-full" />
        </div>
        <div className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto w-full pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories?.map((item) => (
            <Button
              onClick={() =>
                handleCategoryChange(item?.slug?.current as string)
              }
              key={item?._id}
              className={`shrink-0 md:w-full justify-start px-5 py-2.5 md:py-6 rounded-full md:rounded-2xl transition-all duration-300 font-medium text-sm md:text-base tracking-wide whitespace-nowrap md:whitespace-normal capitalize
              ${
                item?.slug?.current == currentSlug
                  ? "bg-dark-pink text-white shadow-md shadow-dark-pink/20 hover:bg-dark-pink/90"
                  : "bg-soft-pink/20 text-gray-600 hover:bg-soft-pink hover:text-darkColor shadow-none"
              }`}
            >
              <p className="w-full text-center md:text-left">{item?.title}</p>
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid Area */}
      <div className="flex-1 w-full">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col bg-transparent animate-pulse"
              >
                <div className="w-full aspect-4/5 bg-soft-pink/40 rounded-t-[3rem] rounded-b-2xl mb-5" />
                <div className="w-2/3 h-4 bg-soft-pink/50 rounded-full mx-auto mb-3" />
                <div className="w-1/2 h-3 bg-soft-pink/50 rounded-full mx-auto mb-4" />
                <div className="w-full h-12 bg-soft-pink/30 rounded-full mt-auto" />
              </div>
            ))}
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products?.map((product: Product) => (
              <AnimatePresence key={product._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable
            selectedTab={currentSlug}
            className="mt-0 w-full"
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;