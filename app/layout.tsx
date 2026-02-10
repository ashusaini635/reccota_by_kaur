import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <html lang="en">
        <body className="font-poppins antialiased" suppressHydrationWarning>
          <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
