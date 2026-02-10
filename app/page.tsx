import React from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import HomeBanner from "@/components/HomeBanner";

const Home = () => {
  return (
    <Container className="p-10">
      <HomeBanner/>
    </Container>
  );
};

export default Home;
