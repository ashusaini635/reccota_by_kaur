"use client"
import useStore from '@/collection'
import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import NoAccessToCart from '@/components/NoAccessToCart'
import PriceFormatter from '@/components/PriceFormatter'
import ProductSideMenu from '@/components/ProductSideMenu'
import QuantityButton from '@/components/QuantityButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Title } from '@/components/ui/text'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Address } from '@/sanity.types'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { useAuth, useUser } from '@clerk/nextjs'
import { ShoppingBagIcon, Trash2, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const CartPage = () => {
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubTotalPrice,
    resetCart
  } = useStore();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const groupedItems = useStore((state) => state.getGroupedItems())
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchAddresses = async () => {
    setLoading(true)
    try {
      const query = `*[_type == 'address'] | order(createdAt desc)`
      const data = await client.fetch(query);
      setAddresses(data)
      const defaultAddress = data.find((address: Address) => address.default)
      if (defaultAddress) {
        setSelectedAddress(defaultAddress)
      } else if (data.length > 0) {
        setSelectedAddress(data[0])
      }
    } catch (error) {
      console.log('Error fetching addresses:', error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      fetchAddresses()
    }
  }, [isSignedIn])

  const handleResetCart = () => {
    const confirmed = window.confirm('Are you sure you want to reset the cart?')
    if (confirmed) {
      resetCart()
      toast.dismiss()
      toast.success('Cart reset successfully')
    }
  }


  if (!isClient) return null;

  return (
    <div className='bg-gray-50/50 pb-52 md:pb-20 min-h-screen'>
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <div className="pt-10 pb-16">
              {/* Elegant Header */}
              <div className='flex flex-col items-center justify-center mb-12 space-y-4 text-center'>
                <div className="bg-soft-pink p-4 rounded-full border border-accent-pink/20 shadow-sm">
                  <ShoppingBagIcon className='text-accent-pink w-8 h-8' strokeWidth={1.5} />
                </div>
                <Title className='text-4xl md:text-5xl font-serif italic font-medium text-darkColor'>
                  Your Shopping Bag
                </Title>
                <p className="text-gray-500 font-medium tracking-wide">
                  {groupedItems.length} {groupedItems.length === 1 ? 'item' : 'items'} ready for checkout
                </p>
              </div>
              
              <div className='grid lg:grid-cols-3 gap-8'>
                {/* Cart Items Section */}
                <div className='lg:col-span-2 space-y-4'>
                  <div className='flex justify-between items-end mb-2 px-2'>
                    <h3 className="text-sm font-bold text-darkColor tracking-widest uppercase">Review Items</h3>
                    <button 
                      onClick={handleResetCart} 
                      className="text-red-400 hover:text-red-500 text-sm font-semibold underline underline-offset-4 decoration-red-200 hover:decoration-red-400 transition-all"
                    >
                      Clear Bag
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                      {groupedItems?.map(({ product }) => {
                        const itemCount = getItemCount(product?._id, (product as any)?.selectedSize, (product as any)?.selectedColor);
                        const variantKey = `${product?._id}-${(product as any)?.selectedSize || 'nosize'}-${(product as any)?.selectedColor || 'nocolor'}`;
                        
                        const p = product as any;
                        const hasVariants = p?.variants?.length > 0;
                        const isVariantSelected = Boolean(p.selectedSize || p.selectedColor);
                        const selectedVariant = p?.variants?.find(
                          (v: any) => 
                            (Array.isArray(v.size) ? v.size.includes(p.selectedSize) : (v.size || null) === (p.selectedSize || null)) && 
                            (v.color || null) === (p.selectedColor || null)
                        );
                        const availableStock = isVariantSelected ? (selectedVariant?.stock ?? 0) : (p?.stock ?? 0);
                        const displayImage = selectedVariant?.images?.[0] || product?.images?.[0] || product?.variants?.[0]?.images?.[0];

                        return (
                          <div key={variantKey} className='bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-accent-pink/10 hover:border-accent-pink/30 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:gap-6 relative group'>
                            {/* Product Image */}
                            {displayImage && (
                              <Link 
                                href={`/product/${product?.slug?.current}`}
                                className='shrink-0 group/image relative overflow-hidden rounded-2xl bg-soft-pink/20 border border-accent-pink/10 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center'
                              >
                                <Image 
                                  src={urlFor(displayImage).url()} 
                                  alt={product?.name || "Product image"} 
                                  width={300} 
                                  height={300} 
                                  loading='lazy'
                                  className='w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500' 
                                />
                              </Link>
                            )}
                            
                            {/* Product Details */}
                            <div className='flex flex-1 flex-col justify-between'>
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                                <div className='space-y-1 sm:space-y-1.5 w-full'>
                                  <Link href={`/product/${product?.slug?.current}`}>
                                    <h2 className='text-base sm:text-lg font-serif italic font-semibold text-darkColor hover:text-accent-pink transition-colors line-clamp-2 sm:line-clamp-1'>
                                      {product?.name}
                                    </h2>
                                  </Link>
                                  
                                  {/* Stylish Pills for Size/Color */}
                                  <div className="flex flex-wrap gap-2 text-xs font-semibold pt-1">
                                    {(product as any)?.selectedColor ? (
                                      <span className='bg-soft-pink/40 text-dark-pink px-2.5 py-1 rounded-full'>
                                        {(product as any)?.selectedColor}
                                      </span>
                                    ) : null}
                                    {(product as any)?.selectedSize ? (
                                      <span className='bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full uppercase'>
                                        {(product as any)?.selectedSize}
                                      </span>
                                    ) : null}
                                  </div>
                                  
                                  <p className='text-[11px] uppercase tracking-wider font-bold pt-1'>
                                    Status: <span className={`font-medium ${availableStock === 0 ? 'text-red-500' : 'text-green-600'}`}>
                                      {availableStock > 0 ? "In Stock" : "Out of Stock"}
                                    </span>
                                  </p>
                                </div>
                                <PriceFormatter amount={(product.price || product.basePrice || 0) * itemCount} className='text-base sm:text-lg font-bold text-darkColor' />
                              </div>
                              
                              {/* Actions & Quantity */}
                              <div className='flex items-center justify-between mt-4 pt-4 border-t border-accent-pink/10'>
                                <div className='flex items-center gap-2 sm:gap-3'>
                                  <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="bg-gray-50 hover:bg-soft-pink/30 p-2 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-accent-pink">
                                          <ProductSideMenu product={product} className='relative! top-auto! right-auto! opacity-100! flex! translate-x-0! text-current!' />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className='font-medium bg-darkColor text-white border-none'>
                                        Add to Wishlist
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  
                                  <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button 
                                          onClick={() => {
                                        deleteCartProduct(product?._id, (product as any)?.selectedSize, (product as any)?.selectedColor);
                                            toast.dismiss()
                                            toast.success('Product removed from cart')
                                          }}
                                          className='bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 p-2 rounded-full transition-colors'
                                        >
                                          <Trash2 className='w-4 h-4' strokeWidth={2} />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent className='font-medium bg-red-500 text-white border-none shadow-md'>
                                        Remove from Cart
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                
                                <div className="bg-gray-50 rounded-full border border-gray-100 px-1 py-1">
                                  <QuantityButton product={product} className="h-8!" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                
                {/* Order Summary & Address Section */}
                <div className='lg:col-span-1 space-y-6 sticky top-24 h-fit'>
                  {/* Order Summary */}
                  <div className='bg-linear-to-b from-white to-soft-pink/10 p-6 md:p-8 rounded-3xl shadow-lg shadow-accent-pink/5 border border-accent-pink/10'>
                    <h2 className='text-xl font-serif italic font-bold text-darkColor mb-6'>Order Summary</h2>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between text-gray-600'>
                        <span className="font-medium text-sm">Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} className='font-medium' />
                      </div>
                      <div className='flex items-center justify-between text-gray-600'>
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} className='font-medium text-green-600' />
                      </div>
                      
                      <div className="pt-4 border-t border-dashed border-accent-pink/20"></div>
                      
                      <div className='flex items-center justify-between'>
                        <span className='text-lg font-bold text-darkColor uppercase tracking-widest'>Total</span>
                        <PriceFormatter amount={getTotalPrice()} className='text-2xl font-bold text-accent-pink' />
                      </div>
                      
                      <Button className='w-full mt-6 py-6 text-sm font-bold uppercase tracking-widest rounded-full bg-darkColor hover:bg-dark-pink text-white transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg hover:shadow-dark-pink/20'>
                        {loading ? "Processing..." : "Proceed to Checkout"}
                      </Button>
                      <div className="text-center mt-4 text-xs text-gray-400 font-medium flex items-center justify-center gap-1.5">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Secure and encrypted checkout
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {addresses && addresses.length > 0 && (
                    <div className='bg-white p-2 rounded-3xl shadow-lg shadow-accent-pink/5 border border-accent-pink/10'>
                      <Card className="border-none shadow-none bg-transparent">
                        <CardHeader className="pb-4">
                          <CardTitle className="text-lg font-serif italic text-darkColor flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent-pink" /> 
                            Delivery Address
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                          <RadioGroup 
                            value={selectedAddress?._id?.toString()}
                            onValueChange={(val) => {
                              const addr = addresses.find(a => a._id.toString() === val);
                              if (addr) setSelectedAddress(addr);
                            }}
                            className="space-y-3"
                          >
                            {addresses.map((address) => (
                              <div 
                                key={address._id} 
                                onClick={() => setSelectedAddress(address)}
                                className={`flex items-start space-x-3 p-3 rounded-xl border transition-all cursor-pointer ${
                                  selectedAddress?._id === address._id 
                                    ? "border-accent-pink bg-soft-pink/20 shadow-sm" 
                                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <RadioGroupItem 
                                  value={address._id.toString()} 
                                  id={`address-${address._id}`}
                                  className="mt-1"
                                />
                                <Label 
                                  htmlFor={`address-${address._id}`}
                                  className='grid gap-1.5 flex-1 cursor-pointer'
                                >
                                  <div className="flex items-center justify-between">
                                    <span className='font-semibold text-gray-900'>
                                      {address.name}
                                    </span>
                                    {address.default && (
                                      <span className="text-[10px] uppercase font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        Default
                                      </span>
                                    )}
                                  </div>
                                  <span className='text-sm text-gray-500 leading-relaxed'>
                                    {address.address}, {address.city}, <br/>
                                    {address.state}, {address.pinCode}
                                  </span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <Button variant='outline' className='w-full mt-5 border-dashed border-2 border-accent-pink/30 hover:border-accent-pink/60 hover:bg-soft-pink/10 text-darkColor rounded-xl transition-all'>
                            + Add New Address
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Fixed Checkout Button (appears when scrolling) */}
              <div className='md:hidden fixed bottom-0 left-0 w-full bg-white p-4 border-t shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50 flex items-center justify-between'>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-0.5">Total</p>
                  <PriceFormatter amount={getTotalPrice()} className="text-xl font-bold text-accent-pink" />
                </div>
                <Button className='px-8 py-6 rounded-full bg-darkColor hover:bg-dark-pink text-white shadow-lg font-bold tracking-widest uppercase text-xs transition-all'>
                  Checkout
                </Button>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  )
}

export default CartPage
