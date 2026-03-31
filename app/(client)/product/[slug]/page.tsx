import AddToCartButton from "@/components/AddToCartButton";
import Container from "@/components/Container";
import FavoriteButton from "@/components/FavoriteButton";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import ProductCharacteristics from "@/components/ProductCharacteristics";
import SizeSelector from "@/components/SizeSelector";
import { getProductBySlug } from "@/sanity/queries";
import { CornerDownLeft, StarIcon, Truck } from "lucide-react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { RxBorderSplit } from "react-icons/rx";
import { TbTruckDelivery } from "react-icons/tb";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const normalizedImages = product?.images?.map((img) => ({
    ...img,
    asset: img.asset
      ? { ...img.asset, _weak: img.asset._weak ?? false }
      : img.asset,
  }));

  return (
    <Container className="flex flex-col md:flex-row gap-10 lg:gap-14 py-12 md:py-16">
      {normalizedImages && (
        <ImageView images={normalizedImages} isStock={product?.stock} />
      )}
      <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-darkColor font-medium leading-tight">
              {product?.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className={index < 4 ? "text-accent-pink" : "text-gray-300"}
                  fill={index < 4 ? "#fc6c85" : "currentColor"}
                />
              ))}
            </div>
            <p className="text-gray-500 font-medium tracking-wide">(120 Reviews)</p>
          </div>

          <p className="text-sm md:text-base text-gray-600 tracking-wide leading-relaxed">
            {product?.description}
          </p>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between border-y border-accent-pink/10 py-5">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-sm md:text-lg font-bold"
          />
          <p
            className={`px-4 py-1.5 text-xs uppercase tracking-widest font-bold rounded-full ${
              product?.stock === 0
                ? "bg-red-50 text-red-500 border border-red-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}
          >
            {(product?.stock as number) > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Size Selection */}
        {product?.sizes && product.sizes.length > 0 && (
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-accent-pink uppercase tracking-widest">
              Select Size
            </p>
            <SizeSelector sizes={product.sizes} />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1">
            <AddToCartButton 
              product={product} 
              className="w-full bg-darkColor text-white hover:bg-dark-pink hover:border-dark-pink py-3.5 md:py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 shadow-lg border border-transparent" 
            />
          </div>
          <FavoriteButton showProduct={true} product={product} />
        </div>

        <div className="pt-2">
          <ProductCharacteristics product={product} />
        </div>

        {/* Extra Links Grid */}
        <div className="grid grid-cols-2 gap-4 border-b border-accent-pink/10 pb-6 text-sm text-gray-600 font-medium mt-2">
          <div className="flex items-center gap-2.5 hover:text-accent-pink transition-colors duration-300 cursor-pointer group">
            <RxBorderSplit className="text-lg text-accent-pink/70 group-hover:text-accent-pink transition-colors" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2.5 hover:text-accent-pink transition-colors duration-300 cursor-pointer group">
            <FaRegQuestionCircle className="text-lg text-accent-pink/70 group-hover:text-accent-pink transition-colors" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2.5 hover:text-accent-pink transition-colors duration-300 cursor-pointer group">
            <TbTruckDelivery className="text-lg text-accent-pink/70 group-hover:text-accent-pink transition-colors" />
            <p>Delivery & Return</p>
          </div>
          <div className="flex items-center gap-2.5 hover:text-accent-pink transition-colors duration-300 cursor-pointer group">
            <FiShare2 className="text-lg text-accent-pink/70 group-hover:text-accent-pink transition-colors" />
            <p>Share</p>
          </div>
        </div>

        {/* Delivery Cards */}
        <div className="flex flex-col gap-4">
          <div className="border border-accent-pink/20 bg-soft-pink/10 rounded-2xl p-4 flex items-start gap-4 hover:border-accent-pink/40 hover:shadow-sm transition-all duration-300 cursor-pointer">
            <div className="p-2 bg-white rounded-full shadow-sm shrink-0">
              <Truck size={22} className="text-accent-pink" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-darkColor tracking-wide">
                Free Delivery
              </p>
              <p className="text-xs text-gray-500 leading-relaxed hover:text-accent-pink transition-colors">
                <span className="underline underline-offset-4 decoration-accent-pink/30 hover:decoration-accent-pink">Enter your Postal code</span> for Delivery Availability.
              </p>
            </div>
          </div>
          
          <div className="border border-accent-pink/20 bg-soft-pink/10 rounded-2xl p-4 flex items-start gap-4 hover:border-accent-pink/40 hover:shadow-sm transition-all duration-300 cursor-pointer">
            <div className="p-2 bg-white rounded-full shadow-sm shrink-0">
              <CornerDownLeft size={22} className="text-accent-pink" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-darkColor tracking-wide">
                Return Delivery
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Free 30 days Delivery Returns.{" "}
                <span className="underline underline-offset-4 decoration-accent-pink/30 hover:text-accent-pink hover:decoration-accent-pink transition-colors">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
