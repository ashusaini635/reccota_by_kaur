import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { categoriesData, quickLinkdata } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-soft-pink/10 border-t border-accent-pink/10 pt-8">
      <Container>
        <FooterTop />
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Handcrafted with love, each piece is designed to bring elegance
              and comfort to your wardrobe. Premium quality,
              timeless designs.
            </p>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/30 hover:border-accent-pink hover:text-accent-pink hover:-translate-y-1 transition-all duration-300"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-darkColor mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinkdata?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="text-gray-600 hover:text-accent-pink text-sm font-medium transition-colors duration-300 relative group inline-block"
                  >
                    {item?.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-pink group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-darkColor mb-6">Collections</h3>
            <ul className="space-y-4">
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category/${item?.href}`}
                    className="text-gray-600 hover:text-accent-pink text-sm font-medium transition-colors duration-300 relative group inline-block"
                  >
                    {item?.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-pink group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-darkColor mb-6">Stay Connected</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Subscribe to our newsletter for exclusive offers, new arrivals, and styling tips.
            </p>
            <form className="flex flex-col gap-3">
              <Input 
                placeholder="Enter your email address" 
                type="email" 
                required 
                className="rounded-full px-5 py-3 border-accent-pink/30 focus-visible:ring-accent-pink/50 bg-white"
              />
              <Button className="w-full rounded-full bg-darkColor text-white hover:bg-dark-pink transition-colors py-3.5 font-semibold tracking-wide">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="py-8 border-t border-accent-pink/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            © {new Date().getFullYear()} <Logo className="text-lg" />.
          </div>
          <p>All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
