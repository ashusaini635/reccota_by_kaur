import React from "react";
import { getAllBrands, getCategories } from "@/sanity/queries";
import Collection from "@/components/Collection";

const CollectionPage = async() => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return <div>
    <Collection categories={categories} brands={brands} />
  </div>;
};

export default CollectionPage;
