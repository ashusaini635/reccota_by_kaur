"use client"
import useStore from '@/collection'
import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import NoAccessToCart from '@/components/NoAccessToCart'
import { Title } from '@/components/ui/text'
import { Address } from '@/sanity.types'
import { urlFor } from '@/sanity/lib/image'
import { useAuth, useUser } from '@clerk/nextjs'
import { ShoppingBagIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

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
                      </div>
                    </div>
                  </div>)
              })}
            </div>
          </div>
          <div>Summary</div>
        </div>
      </> : <EmptyCart />}</Container> : <NoAccessToCart />}
    </div>
  )
}

export default CartPage
