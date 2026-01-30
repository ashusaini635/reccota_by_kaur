import React from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <Container className="p-10">
      <h1 className="text-4xl font-semibold font-poppins">Reccota By Kaur</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam minus
        temporibus labore laborum maiores placeat animi tempore voluptate error
        sunt repudiandae ratione, reprehenderit eligendi tempora eum dolorum
        nesciunt, commodi eveniet iure. Eos voluptate quam autem, obcaecati
        placeat rerum necessitatibus aliquam tempora eveniet neque repellendus
        error, explicabo doloribus. Blanditiis, praesentium dicta?
      </p>
      <Button>Get Started</Button>
    </Container>
  );
};

export default Home;
