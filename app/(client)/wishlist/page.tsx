import NoAccessToCart from '@/components/NoAccessToCart';
import WishListProducts from '@/components/WishListProducts';
import { currentUser } from '@clerk/nextjs/server';

const WishlistPage = async() => {
  const user = await currentUser();
  return (
    <div className='bg-gray-50/50 pb-52 md:pb-20 min-h-screen pt-10'>
      {!user ? (
        <WishListProducts/>
      ) : (
        <NoAccessToCart details='Save your favorite items and view your wishlist anytime. Log in to continue.'/>
      )}
    </div>
  )
}

export default WishlistPage;
