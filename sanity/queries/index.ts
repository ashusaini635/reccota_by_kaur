import { sanityFetch } from "../lib/live";
import { BRAND_QUERY, DEAL_PRODUCTS, PRODUCT_BY_SLUG } from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
      ...,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
      : `*[_type == 'category'] | order(name asc) {
      ...,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`;
    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data;
  } catch (error) {
    console.log("Error Fetching Categories: ", error);
    return [];
  }
};
const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error Fetching Deal Products: ", error);
    return [];
  }
};
const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG,
      params: { slug },
    });
    return product?.data || null;
  } catch (error) {
    console.log("Error Fetching Product By Slug: ", error);
    return null;
  }
};
const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export { getCategories, getDealProducts, getProductBySlug, getBrand };
