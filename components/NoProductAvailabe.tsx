"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2, SearchX } from "lucide-react";

const NoProductAvailable = ({
  selectedTab,
  className,
}: {
  selectedTab?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 min-h-80 space-y-5 text-center bg-soft-pink/20 border border-accent-pink/10 rounded-[2rem] w-full mt-10",
        className,
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 bg-white shadow-sm border border-accent-pink/20 rounded-full flex items-center justify-center mb-2"
      >
        <SearchX className="w-10 h-10 text-accent-pink" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-darkColor tracking-wide">
          No <span className="font-serif italic text-accent-pink font-medium">Products</span> Found
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600 max-w-md mx-auto text-base"
      >
        We couldn&apos;t find any items matching the{" "}
        <span className="text-base font-bold text-darkColor">
          {selectedTab}
        </span>{" "}
        collection at the moment.
      </motion.p>

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex items-center space-x-2 text-accent-pink/80 font-medium mt-2"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Our artisans are crafting new arrivals...</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-sm text-gray-500 pt-4"
      >
        Please check back later or explore our other exquisite categories.
      </motion.p>
    </div>
  );
};

export default NoProductAvailable;
