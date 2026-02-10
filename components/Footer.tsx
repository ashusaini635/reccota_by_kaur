import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData, quickLinkdata } from "@/constants/data";
import Link from "next/link";
import { Sub } from "@radix-ui/react-context-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
              Handcrafted with love, each piece is designed to bring elegance
              and comfort to your little girl's wardrobe. Premium quality,
              timeless designs.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-accent-pink hover:text-accent-pink"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div>
            <SubTitle>Quick Links</SubTitle>
            <ul className="space-y-3 mt-4">
              {quickLinkdata?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-accent-pink hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SubTitle>Category</SubTitle>
            <ul className="space-y-3 mt-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="hover:text-accent-pink hoverEffect font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <SubTitle>Stay Connected</SubTitle>
            <SubText className="mt-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Your Email" type="email" required />
              <Button className="w-full bg-dark-pink hover:bg-accent-pink">
                Join
              </Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            ©{new Date().getFullYear()}{" "}
            <Logo className="text-sm"/>
            . All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
