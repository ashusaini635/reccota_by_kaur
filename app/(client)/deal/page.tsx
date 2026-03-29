import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { Title } from "@/components/ui/text";
import { getDealProducts } from "@/sanity/queries";
import React from "react";

const DealPage = async () => {
  const products = await getDealProducts();
  return (
    <div className="py-10 md:py-16 bg-soft-pink/10">
      <Container>
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <Title className="text-3xl md:text-4xl font-bold tracking-wide">
            Hot Deals of the <span className="text-accent-pink font-serif italic font-medium">Week</span>
          </Title>
          <div className="w-20 h-1 bg-accent-pink/80 rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Discover our exclusive collection of handpicked deals. Limited time offers on premium handcrafted elegance.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products?.map((product) => (
            // @ts-ignore
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
