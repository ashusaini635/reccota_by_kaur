import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    default: "Reecota by Kaur – Hand Painted Suits, Sarees & Coord Sets",
    template: "%s | Reecota by Kaur",
  },
  description:
    "Shop premium women's ethnic wear at Reecota by Kaur. Discover hand-painted suits, elegant sarees, and stylish coord sets crafted with love and tradition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
    </ClerkProvider>
  );
}
