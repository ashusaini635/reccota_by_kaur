"use client"
import useStore from '@/collection'
import Container from '@/components/Container'
import EmptyCart from '@/components/EmptyCart'
import NoAccessToCart from '@/components/NoAccessToCart'
import { Title } from '@/components/ui/text'
import { Address } from '@/sanity.types'
import { useAuth, useUser } from '@clerk/nextjs'
import { ShoppingBagIcon } from 'lucide-react'
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
            <div>
              {groupedItems?.map(({ product }) => {
                const itemCount = getItemCount(product?._id)
                return <div key={product?._id}><p>{product?.name}</p></div>
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
