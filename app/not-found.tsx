"use client";

import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";
import { SearchX } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="relative py-10 md:py-20 bg-soft-pink/10 flex items-center justify-center flex-1 min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 1.2 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h1 className="text-[15rem] md:text-[30rem] font-black text-dark-pink/5 select-none -translate-y-12 md:-translate-y-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative z-10 flex flex-col items-center justify-center text-center gap-5 md:gap-6"
        >
          <Logo />
          
          <div className="bg-soft-pink/30 p-6 rounded-full text-dark-pink mt-4 backdrop-blur-sm border border-dark-pink/10">
            <SearchX size={48} strokeWidth={1.5} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-darkColor mt-2">
            Page Not <span className="text-accent-pink font-serif italic font-medium">Found</span>
          </h2>
          <div className="w-20 h-1 bg-accent-pink/80 rounded-full my-1" />
          <p className="text-gray-600 max-w-lg mx-auto text-base md:text-lg bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-4 rounded-2xl">
            We couldn't find the page you're looking for. The collection might have been moved, deleted, or perhaps never existed.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="/" className="px-8 py-3.5 bg-dark-pink text-white rounded-full font-medium shadow-lg shadow-dark-pink/30 hover:bg-dark-pink/90 hover:scale-105 transition-all duration-300 tracking-wide inline-flex items-center justify-center">
              Back to Homepage
            </Link>
            <Link href="/help" className="px-8 py-3.5 bg-white text-dark-pink border border-dark-pink/20 rounded-full font-medium shadow-sm hover:bg-soft-pink/20 hover:scale-105 transition-all duration-300 tracking-wide inline-flex items-center justify-center">
              Get Help
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
