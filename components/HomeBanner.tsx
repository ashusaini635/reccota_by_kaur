import React from "react";
import Link from "next/link";
import { Title } from "./ui/text";
import { Button } from "./ui/button";
import Image from "next/image";
import { banner_1 } from "@/assets";

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-soft-pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
      <div className="space-y-5">
        <Title>
          Handcrafted Elegance <br />
          for Every Girl
        </Title>
        <p className="text-black opacity-90">
          Discover our collection of premium handmade clothing designed with
          love and care for your little princess.
        </p>
        <Link href="/collections">
          <Button
            size="lg"
            className="bg-dark-pink hover:bg-accent-pink hoverEffect"
          >
            Shop Now
          </Button>
        </Link>
      </div>
      <div className="w-96 h-70 overflow-hidden">
        <Image
          src={banner_1}
          alt="banner_1"
          className="hidden md:block w-full h-full object-cover object-bottom"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
