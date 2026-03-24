"use client";

import { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productTypeData } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { AnimatePresence, motion } from "motion/react";
import NoProductAvailable from "./NoProductAvailabe";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    productTypeData[0]?.title || "",
  );

  const query = `*[_type == "product" && productType == $variant ] | order(name desc){
  ...,"categories":categories[]->title
}`;
  const params = { variant: selectedTab.toLowerCase() };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);
  return (
    <div className="py-10">
      <HomeTabBar selectedTab={selectedTab} onTabSelected={setSelectedTab} />
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col bg-transparent animate-pulse">
              <div className="w-full aspect-4/5 bg-soft-pink/40 rounded-t-[3rem] rounded-b-2xl mb-5" />
              <div className="w-2/3 h-4 bg-soft-pink/50 rounded-full mx-auto mb-3" />
              <div className="w-1/2 h-3 bg-soft-pink/50 rounded-full mx-auto mb-4" />
              <div className="w-full h-12 bg-soft-pink/30 rounded-full mt-auto" />
            </div>
          ))}
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
        {products?.map((product)=>(
            <AnimatePresence key={product?._id}>
                <motion.div 
                  layout 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ProductCard product={product}/>
                </motion.div>
             </AnimatePresence>   
        ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
