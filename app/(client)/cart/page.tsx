"use client"
import useStore from '@/collection'
import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import NoAccessToCart from '@/components/NoAccessToCart'
import PriceFormatter from '@/components/PriceFormatter'
import ProductSideMenu from '@/components/ProductSideMenu'
import QuantityButton from '@/components/QuantityButton'
import { Button } from '@/components/ui/button'
import { Title } from '@/components/ui/text'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Address } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { useAuth, useUser } from '@clerk/nextjs'
import { ShoppingBagIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
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
  const [loading, setLoading] = useState(true);
  const groupedItems = useStore((state) => state.getGroupedItems())
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  // const [addresses, setAddresses] = useState<ADDRESS_QUERYResult | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const handleResetCart = () => {
    const confrimed = window.confirm('Are you sure you want to reset the cart?')
    if (confrimed) {
      resetCart()
      toast.dismiss()
      toast.success('Cart reset successfully')
    }
  }


  return (
    <div className='bg-gray-50 pb-52 md:pb-10'>
      {isSignedIn ? <Container>{groupedItems?.length ? <>
        <div className='flex items-center gap-2 py-5'>
          <ShoppingBagIcon className='text-darkColor' />
          <Title className='text-2xl'>Shoping Cart</Title>
        </div>
        <div className='grid lg:grid-cols-3 md:gap-8'>
          <div className='lg:col-span-2 rounded-lg'>
            <div className='border bg-white rounded-md'>
              {groupedItems?.map(({ product }) => {
                const itemCount = getItemCount(product?._id)
                return (
                  <div key={product?._id} className='border-b p-2.5 last:border-b-0 flex items-center jbustify-between gap-5'>
                    <div className='flex flex-1 items-start gap-2 h-36 md:h-44'>
                      {product?.images && (<Link href={`/product/${product?.slug?.current}`}
                        className='border p-0.5 md:p-1 rounded-md overflow-hidden group'>
                        <Image src={urlFor(product?.images[0]).url()} alt="productImage" width={500} height={500} loading='lazy'
                          className='w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 hoverEffect' />
                      </Link>
                      )}
                      <div className='h-full flex flex-1 flex-col justify-between py-1'>
                        <div className='flex flex-col gap-0.5 md:gap-1.5'>
                          <h2 className='text-base font-semibold line-clamp-1'>{product?.name}</h2>
                          <p className='text-sm capitalize text-gray-500'>Color: <span className='font-medium text-black'>{product?.colors?.map((color) => color).join(', ') || 'N/A'}</span></p>
                          <p className='text-sm capitalize text-gray-500'>Size: <span className='font-medium text-black'>{product?.sizes?.map((size) => size).join(', ') || 'N/A'}</span></p>
                          <p className='text-sm capitalize text-gray-500'>Status: <span className='font-medium text-black'>{product?.status}</span></p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <ProductSideMenu product={product} className='relative top-0 right-0' />
                              </TooltipTrigger>
                              <TooltipContent className='font-bold'>
                                Add to Wishlist
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Trash onClick={() => {
                                  deleteCartProduct(product?._id)
                                  toast.dismiss()
                                  toast.success('Product removed from cart')
                                }
                                }
                                  className='w-4 md:w-5 mr-1 text-gray-500 hover:text-red-600
                                hoverEffect'/>
                              </TooltipTrigger>
                              <TooltipContent className='font-bold'>
                                Remove from Cart
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1'>
                      <PriceFormatter amount={(product?.price as number) * itemCount} className='text-md' />
                      <QuantityButton product={product} />
                    </div>
                  </div>
                )
              })}
              <Button onClick={() => {
                handleResetCart()
              }} className='m-5 font-semibold' variant="destructive">Reset Cart</Button>
            </div>
          </div>
          <div>Summary</div>
        </div>
      </> : <EmptyCart />}</Container> : <NoAccessToCart />}
    </div>
  )
}

export default CartPage
