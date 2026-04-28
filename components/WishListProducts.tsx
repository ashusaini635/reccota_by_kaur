"use client"

import useStore from "@/collection"
import { Heart, X } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import Link from "next/link"
import Container from "./Container"
import { Product } from "@/sanity.types"
import toast from "react-hot-toast"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import PriceFormatter from "./PriceFormatter"
import AddToCartButton from "./AddToCartButton"
import { Title } from "./ui/text"

const WishListProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(7)
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore()
    const loadMore = () => {
        setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length))
    }
    const handleResetWishlist = () => {
        const confirmReset = window.confirm(
            "Are you sure you want to reset your wishlist?"
        );
        if (confirmReset) {
            resetFavorite();
            toast.success("Wishlist reset successfully");
        }
    };
    return (
        <Container className="py-4">
            {favoriteProduct?.length > 0 ? (
                <>
                    {/* Elegant Header */}
                    <div className='flex flex-col items-center justify-center mb-12 space-y-4 text-center'>
                        <div className="bg-soft-pink p-4 rounded-full border border-accent-pink/20 shadow-sm">
                            <Heart className='text-accent-pink w-8 h-8' fill="currentColor" strokeWidth={1.5} />
                        </div>
                        <Title className='text-4xl md:text-5xl font-serif italic font-medium text-darkColor'>
                            Your Wishlist
                        </Title>
                        <p className="text-gray-500 font-medium tracking-wide">
                            {favoriteProduct.length} {favoriteProduct.length === 1 ? 'item' : 'items'} saved
                        </p>
                    </div>

                    {/* Grid Layout for Wishlist Items */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {favoriteProduct?.slice(0, visibleProducts)?.map((product: Product) => {
                            const firstImage = product?.variants?.[0]?.images?.[0] || product?.images?.[0];
                            const totalVariantStock = product?.variants?.reduce((total: number, variant: any) => total + (variant?.stock || 0), 0) || 0;
                            const isOutOfStock = (product?.stock ?? 0) <= 0 && totalVariantStock <= 0;
                            const prices = [(product as any)?.basePrice, ...(product?.variants?.map((v: any) => v?.price) || [])].filter((p) => typeof p === 'number');
                            const displayPrice = prices.length > 0 ? Math.min(...prices) : 0;
                            const colors = Array.from(new Set(product?.variants?.map((v: any) => v?.color).filter(Boolean)));

                            return (
                                <div key={product?._id} className="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-accent-pink/10 hover:border-accent-pink/30 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 relative group">
                                    {/* Absolute Remove Button */}
                                    <button 
                                        onClick={() => {
                                            removeFromFavorite(product._id);
                                            toast.dismiss();
                                            toast.success("Product removed");
                                        }} 
                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10 bg-white/80 p-1.5 rounded-full backdrop-blur-sm shadow-sm hover:shadow"
                                    >
                                        <X size={18} strokeWidth={2.5} />
                                    </button>

                                    {/* Image */}
                                    {firstImage && (
                                        <Link href={`/product/${product?.slug?.current}`} className="shrink-0 group/image relative overflow-hidden rounded-2xl bg-soft-pink/20 border border-accent-pink/10 w-full sm:w-32 h-48 sm:h-36 flex items-center justify-center">
                                            <Image
                                                src={urlFor(firstImage).url()}
                                                alt={product?.name || "Product Image"}
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
                                            />
                                        </Link>
                                    )}

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="pr-8 space-y-2">
                                            <Link href={`/product/${product?.slug?.current}`}>
                                                <h2 className="text-lg md:text-xl font-serif italic font-semibold text-darkColor hover:text-accent-pink transition-colors line-clamp-1">
                                                    {product?.name}
                                                </h2>
                                            </Link>
                                            <div className="flex flex-wrap gap-2 text-xs font-semibold pt-0.5">
                                                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                    {product?.productType || "Apparel"}
                                                </span>
                                                {colors.length > 0 && (
                                                    <span className="bg-soft-pink/40 text-dark-pink px-2.5 py-1 rounded-full">
                                                        {colors.join(", ")}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-[11px] uppercase tracking-wider font-bold pt-1">
                                                Status: <span className={!isOutOfStock ? "text-green-600" : "text-red-500"}>
                                                    {!isOutOfStock ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </p>
                                        </div>

                                        {/* Actions Footer */}
                                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between mt-4 pt-4 border-t border-accent-pink/10 gap-4">
                                            <PriceFormatter amount={displayPrice} className="text-lg md:text-xl font-bold text-darkColor" />
                                            <Button asChild className="w-full sm:w-auto rounded-full bg-darkColor hover:bg-dark-pink text-white transition-all duration-300 py-2.5 px-6 text-xs font-bold tracking-widest uppercase shadow-none hover:-translate-y-0.5">
                                                <Link href={`/product/${product?.slug?.current}`}>Buy Now</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-12 mb-8">
                        {visibleProducts < favoriteProduct?.length && (
                            <Button variant="outline" onClick={loadMore} className="rounded-full border-accent-pink/30 hover:border-accent-pink hover:bg-soft-pink/20 text-darkColor tracking-widest uppercase text-xs font-bold px-8 h-12">
                                Load More
                            </Button>
                        )}
                        {visibleProducts > 10 && (
                            <Button variant="outline" onClick={() => setVisibleProducts(10)} className="rounded-full border-gray-200 hover:border-gray-300 text-gray-600 tracking-widest uppercase text-xs font-bold px-8 h-12">
                                Show Less
                            </Button>
                        )}
                        <button 
                            onClick={handleResetWishlist} 
                            className="text-red-400 hover:text-red-500 text-sm font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-red-400 transition-all sm:ml-4"
                        >
                            Clear Wishlist
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 px-4 text-center">
                    <div className="bg-soft-pink p-6 rounded-full border border-accent-pink/20 shadow-sm mb-4">
                        <Heart className="h-12 w-12 text-accent-pink" strokeWidth={1.5} />
                    </div>
                    <Title className="text-3xl md:text-4xl font-serif italic text-darkColor font-medium">
                        Your Wishlist is Empty
                    </Title>
                    <p className="text-gray-500 font-medium tracking-wide max-w-md">
                        Save items you love to view them later. Discover our latest collections and find your new favorites.
                    </p>
                    <Button asChild className="mt-8 rounded-full bg-darkColor hover:bg-dark-pink text-white transition-all duration-300 py-6 px-10 text-sm font-bold tracking-widest uppercase shadow-md hover:-translate-y-1 hover:shadow-lg hover:shadow-dark-pink/20">
                        <Link href="/collections">Explore Collections</Link>
                    </Button>
                </div>
            )}
        </Container>
    )
}

export default WishListProducts
