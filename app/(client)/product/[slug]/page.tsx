import { getProductBySlug } from "@/sanity/queries";
import React from "react";

const singleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return <div className="bg-red-600">singleProductPage</div>;
};

export default singleProductPage;
