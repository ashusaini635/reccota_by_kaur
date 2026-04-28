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
    const { addItem, removeItem, getItemCount, getProductCount } = useStore();
    
    const p = product as any;
    const hasVariants = p?.variants?.length > 0;
    const isVariantSelected = Boolean(p.selectedSize || p.selectedColor);
    const selectedVariant = p?.variants?.find(
        (v: any) => 
            (Array.isArray(v.size) ? v.size.includes(p.selectedSize) : (v.size || null) === (p.selectedSize || null)) && 
            (v.color || null) === (p.selectedColor || null)
    );

    const availableStock = isVariantSelected ? (selectedVariant?.stock ?? 0) : (p?.stock ?? 0);

    const itemCount = getItemCount(product?._id, p?.selectedSize, p?.selectedColor);
    
    const isOutOfStock = availableStock <= 0 || availableStock <= itemCount;

    const handleRemoveProduct = () => {
        removeItem(product?._id, (product as any)?.selectedSize, (product as any)?.selectedColor);
        if (itemCount > 1) {
            toast.dismiss();
            toast.success("Quantity Decreased Successfully")
        } else {
            toast.dismiss();
            toast.success(`${product?.name?.substring(0, 12)} removed from Cart Successfully!`)
        }
    }

    const handleAddToCart = () => {
        if (availableStock > itemCount) {
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
            <Button variant="outline" size="icon" disabled={itemCount === 0}
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
