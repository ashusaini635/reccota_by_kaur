import React from "react";
import Link from "next/link";
import { productTypeData } from "@/constants/data";
import { useEffect, useState } from "react";

interface Props {
  selectedTab: string;
  onTabSelected: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelected }: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        {productTypeData?.map((item) => (
          <button
            onClick={() => onTabSelected(item?.title)}
            key={item?.title}
            className={`border border-accent-pink/40 px-4 py-1.5 rounded-full text-accent-pink hover:bg-accent-pink hover:text-white hoverEffect md:px-6 md:py-2 ${selectedTab === item?.title ? "bg-accent-pink text-white border-accent-pink" : ""}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        href={"/collections"}
        className="border border-accent-pink/40 px-4 py-1.5 rounded-full text-accent-pink hover:bg-accent-pink hover:text-white hoverEffect md:px-6 md:py-2"
      >
        See all
      </Link>
    </div>
  );
};

export default HomeTabBar;
