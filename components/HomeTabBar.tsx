import React from "react";
import Link from "next/link";
import { productTypeData } from "@/constants/data";
import { ArrowRight } from "lucide-react";

interface Props {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelected }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-8">
      {/* Scrollable container for mobile */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {productTypeData?.map((item) => (
          <button
            onClick={() => onTabSelected(item?.title)}
            key={item?.title}
            className={`whitespace-nowrap px-4 py-2 md:px-6 md:py-2.5 text-sm font-medium rounded-full transition-all duration-300 border ${
              selectedTab === item?.title
                ? "bg-dark-pink border-dark-pink text-white shadow-md"
                : "bg-soft-pink/20 border-transparent text-gray-600 hover:bg-soft-pink hover:text-darkColor"
            }`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href={"/collections"}
        className="group flex items-center gap-2 text-sm font-semibold text-darkColor hover:text-accent-pink transition-colors duration-300"
      >
        <span className="relative pb-1">
          View All Collection
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-pink scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
        </span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default HomeTabBar;
