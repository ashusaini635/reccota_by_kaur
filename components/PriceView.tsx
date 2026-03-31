import React from 'react'
import PriceFormatter from './PriceFormatter';
import { cn } from "@/lib/utils";
import { twMerge } from 'tailwind-merge';

interface Props {
    price: number | undefined;
    discount: number | undefined;
    className?: string;
}

const PriceView = ({price,discount,className}:Props) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <PriceFormatter 
        amount={price} 
        className={twMerge("text-sm font-bold text-darkColor tracking-wide", className)}
      />
      {price && discount ? (
        <PriceFormatter 
          amount={price + (price * discount / 100)} 
          className="text-xs font-semibold text-gray-400 line-through decoration-gray-300 decoration-1" 
        />
      ) : null}
      {price && discount ? (
        <span className="text-xs font-semibold text-accent-pink bg-soft-pink/50 px-2 py-0.5 rounded-sm">
          {discount}% OFF
        </span>
      ) : null}
    </div>
  )
}

export default PriceView
