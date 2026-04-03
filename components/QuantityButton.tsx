import useStore from '@/collection'
import { Product } from '@/sanity.types';
import React from 'react'
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    className?: string;
}

const QuantityButton = ({ product, className }: Props) => {
    const { addItem, removeItem, getItemCount } = useStore();
    const itemCount = getItemCount(product?._id)
    const isOutOfStock = product?.stock === 0;

    const handleRemoveProduct = () => {
        removeItem(product?._id);
        if (itemCount > 1) {
            toast.dismiss();
            toast.success("Quantity Decreased Successfully")
        } else {
            toast.dismiss();
            toast.success(`${product?.name?.substring(0, 12)} removed from Cart Successfully!`)
        }
    }

    const handleAddToCart = () => {
        if ((product?.stock as number) > itemCount) {
            addItem(product)
            toast.dismiss();
            toast.success("Quantity Increased Successfully")
        } else {
            toast.dismiss();
            toast.error("Not enough stock available");
        }
    }
    return (
        <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
            <Button variant="outline" size="icon" disabled={itemCount === 0 || isOutOfStock}
                className='w-6 h-6 border hover:bg-accent-pink/20 hoverEffect' onClick={handleRemoveProduct}>
                <Minus />
            </Button>
            <span className='text-sm font-semibold text-center w-6'>{itemCount}</span>
            <Button variant="outline" size="icon" disabled={isOutOfStock}
                className='w-6 h-6 border hover:bg-accent-pink/20 hoverEffect' onClick={handleAddToCart}>
                <Plus />
            </Button>
        </div>
    )
}

export default QuantityButton
