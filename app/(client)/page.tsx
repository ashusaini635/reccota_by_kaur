import React from "react";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import HomeCategories from "@/components/HomeCategories";
import { getCategories } from "@/sanity/queries";
import TrustBadges from "@/components/TrustBadges";

const Home = async() => {
  const categories = await getCategories(6)
  return (
    <Container>
      <HomeBanner/>
      <ProductGrid />
      <HomeCategories categories={categories}/>
      <TrustBadges />
    </Container>
  );
};

export default Home;
