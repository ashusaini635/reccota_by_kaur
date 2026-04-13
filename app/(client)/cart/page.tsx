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
            <div className="pt-8 pb-12">
              <div className='flex items-center gap-3 mb-8'>
                <div className="bg-accent-pink/10 p-3 rounded-full">
                  <ShoppingBagIcon className='text-accent-pink w-6 h-6' />
                </div>
                <Title className='text-3xl font-bold text-gray-900'>Your Cart</Title>
              </div>
              
              <div className='grid lg:grid-cols-3 gap-8'>
                {/* Cart Items Section */}
                <div className='lg:col-span-2 space-y-4'>
                  <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Items ({groupedItems.length})</h3>
                      <Button 
                        onClick={handleResetCart} 
                        variant="ghost" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-3 text-sm font-medium transition-colors"
                      >
                        Clear Cart
                      </Button>
                    </div>
                    
                    <div className="divide-y divide-gray-100">
                      {groupedItems?.map(({ product }) => {
                        const itemCount = getItemCount(product?._id, (product as any)?.selectedSize, (product as any)?.selectedColor);
                        const variantKey = `${product?._id}-${(product as any)?.selectedSize || 'nosize'}-${(product as any)?.selectedColor || 'nocolor'}`;
                        
                        const p = product as any;
                        const hasVariants = p?.variants?.length > 0;
                        const selectedVariant = p?.variants?.find(
                          (v: any) => (v.size || null) === (p.selectedSize || null) && (v.color || null) === (p.selectedColor || null)
                        );
                        const availableStock = hasVariants ? (selectedVariant?.stock || 0) : (p?.stock || 0);

                        return (
                          <div key={variantKey} className='p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors'>
                            {/* Product Image */}
                            {product?.images && product.images.length > 0 && (
                              <Link 
                                href={`/product/${product?.slug?.current}`}
                                className='shrink-0 group relative overflow-hidden rounded-xl bg-gray-100'
                              >
                                <Image 
                                  src={urlFor(product?.images[0]).url()} 
                                  alt={product?.name || "Product image"} 
                                  width={500} 
                                  height={500} 
                                  loading='lazy'
                                  className='w-full sm:w-32 h-32 object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500' 
                                />
                              </Link>
                            )}
                            
                            {/* Product Details */}
                            <div className='flex flex-1 flex-col justify-between'>
                              <div className="flex justify-between items-start gap-4">
                                <div className='space-y-1.5'>
                                  <Link href={`/product/${product?.slug?.current}`}>
                                    <h2 className='text-lg font-semibold text-gray-900 hover:text-accent-pink transition-colors line-clamp-1'>
                                      {product?.name}
                                    </h2>
                                  </Link>
                                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                    {product?.colors?.length ? (
                                      <p>Color: <span className='font-medium text-gray-900'>{(product as any)?.selectedColor || product.colors.join(', ')}</span></p>
                                    ) : null}
                                    {product?.sizes?.length ? (
                                      <p>Size: <span className='font-medium text-gray-900 uppercase'>{(product as any)?.selectedSize || product.sizes.join(', ')}</span></p>
                                    ) : null}
                                  </div>
                                  <p className='text-sm text-gray-500'>
                                    Status: <span className={`font-medium ${availableStock === 0 ? 'text-red-500' : 'text-green-600'}`}>
                                      {availableStock > 0 ? "In Stock" : "Out of Stock"}
                                    </span>
                                  </p>
                                </div>
                                <PriceFormatter amount={(product?.price as number) * itemCount} className='text-lg font-bold text-gray-900' />
                              </div>
                              
                              {/* Actions & Quantity */}
                              <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-50'>
                                <div className='flex items-center gap-3'>
                                  <TooltipProvider delayDuration={200}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div className="bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer">
                                          <ProductSideMenu product={product} className='relative! top-auto! right-auto! opacity-100! flex!' />
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className='font-medium bg-gray-900 text-white border-none'>
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
                                          className='bg-red-50 hover:bg-red-100 text-red-500 p-2 rounded-full transition-colors'
                                        >
                                          <Trash2 className='w-4 h-4' />
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent className='font-medium bg-red-500 text-white border-none'>
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
                </div>
                
                {/* Order Summary & Address Section */}
                <div className='lg:col-span-1 space-y-6 sticky top-24 h-fit'>
                  {/* Order Summary */}
                  <div className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100'>
                    <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between text-gray-600'>
                        <span>Subtotal</span>
                        <PriceFormatter amount={getSubTotalPrice()} className='font-medium' />
                      </div>
                      <div className='flex items-center justify-between text-gray-600'>
                        <span>Discount</span>
                        <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} className='font-medium text-green-600' />
                      </div>
                      
                      <div className="pt-4 border-t border-dashed border-gray-200"></div>
                      
                      <div className='flex items-center justify-between'>
                        <span className='text-lg font-bold text-gray-900'>Total</span>
                        <PriceFormatter amount={getTotalPrice()} className='text-2xl font-bold text-accent-pink' />
                      </div>
                      
                      <Button className='w-full mt-6 py-6 text-lg font-semibold rounded-xl tracking-wide bg-accent-pink hover:bg-dark-pink text-white transition-all shadow-md shadow-accent-pink/20'>
                        {loading ? "Processing..." : "Proceed to Checkout"}
                      </Button>
                      <div className="text-center mt-4 text-xs text-gray-500 flex items-center justify-center gap-1.5">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Secure and encrypted checkout
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  {addresses && addresses.length > 0 && (
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                      <Card className="border-none shadow-none">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-accent-pink" /> 
                            Delivery Address
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
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
                                    ? "border-accent-pink bg-accent-pink/5" 
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
                          <Button variant='outline' className='w-full mt-5 border-dashed border-2 hover:bg-gray-50 text-gray-600'>
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
                  <p className="text-sm text-gray-500 font-medium">Total Price</p>
                  <PriceFormatter amount={getTotalPrice()} className="text-xl font-bold text-accent-pink" />
                </div>
                <Button className='px-8 py-6 rounded-xl bg-accent-pink hover:bg-dark-pink text-white shadow-lg shadow-accent-pink/30 font-semibold'>
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
