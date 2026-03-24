"use client";

import { Search, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Close the search bar when clicking outside
  const searchContainerRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Add a slight delay to allow the expand animation to start before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  return (
    <div ref={searchContainerRef} className="relative flex items-center justify-center w-5 h-5">
      <Search
        onClick={() => setIsOpen(!isOpen)}
        className="w-5 h-5 hover:text-accent-pink hoverEffect cursor-pointer"
      />
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle search routing here e.g., router.push(`/search?q=${searchQuery}`)
          setIsOpen(false);
        }}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white/95 backdrop-blur-md border border-accent-pink/40 shadow-xl rounded-full px-3 transition-all duration-500 ease-out z-50",
          isOpen
            ? "w-50 sm:w-62.5 md:w-75 h-11 opacity-100 pointer-events-auto"
            : "w-5 h-5 opacity-0 pointer-events-none"
        )}
      >
        <Search className="w-4 h-4 text-accent-pink shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for elegant styles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent outline-none text-sm text-darkColor placeholder:text-gray-400 w-full pl-3"
        />
        <X
          onClick={() => {
            setIsOpen(false);
            setSearchQuery("");
          }}
          className={cn(
            "text-gray-400 hover:text-accent-pink cursor-pointer shrink-0 transition-all duration-500",
            isOpen ? "w-4 h-4 opacity-100 ml-1" : "w-0 h-0 opacity-0 ml-0 pointer-events-none"
          )}
        />
      </form>
    </div>
  );
};

export default SearchBar;