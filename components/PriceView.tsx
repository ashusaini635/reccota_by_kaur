import React from 'react'
import PriceFormatter from './PriceFormatter';

interface Props {
    price: number | undefined;
    discount: number | undefined;
    className?: string;
}

const PriceView = ({price,discount,className}:Props) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className='text-accent-pink' />
        {price && discount ? (
          <PriceFormatter amount={price + (price * discount / 100)} className="text-gray-400 line-through text-xs" />
        ) : null}
          {price && discount ? <span className="text-xs text-discount">({discount}% OFF)</span> : null}
      </div>
    </div>
  )
}

export default PriceView
