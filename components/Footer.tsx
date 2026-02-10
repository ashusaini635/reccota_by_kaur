import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <footer className="mb-40 bg-soft-pink rounded-lg px-10 lg:px-24">
      <Container>
        <FooterTop/>
      </Container>
    </footer>
  );
};

export default Footer;
