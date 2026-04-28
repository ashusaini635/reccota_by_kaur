"use client";
import { BRANDS_QUERY_RESULT, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CategorieList from "./collection/CategorieList";
import BrandList from "./collection/BrandList";
import PriceList from "./collection/PriceList";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailabe";
import ProductCard from "./ProductCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERY_RESULT;
}
const Collection = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null,
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null,
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProduct = async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number) || [0, 10000];
        minPrice = min;
        maxPrice = max;
      }
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && (basePrice >= $minPrice && basePrice <= $maxPrice || count(variants[price >= $minPrice && price <= $maxPrice]) > 0)
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        { selectedCategory, selectedBrand, minPrice, maxPrice },
        { next: { revalidate: 0 } },
      );
      setProducts(data);
    } catch (error) {
      console.log("Collection product fetching Error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [selectedCategory, selectedBrand, selectedPrice]);
  return (
    <div className="border-t border-accent-pink/20">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex justify-between items-center">
            <Title className="text-lg uppercase tracking-wide">
              Get the products as your need
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-accent-pink underline text-sm mt-2 font-medium hover:text-red-500 hoverEffect"
              >
                Reset filter
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-accent-pink/50 ">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-accent-pink/50 scrollbar-hide">
            <CategorieList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="p-20 flex flex-col gap-2 items-center justify-center bg-white">
                  <Loader2 className="w-10 h-10 text-accent-pink animate-spin" />
                  <p className="font-semibold tracking-wide text-base">
                    Product is Loading...
                  </p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collection;
