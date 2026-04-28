import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrand(product?.slug?.current as string);

  const hasVariants = product?.variants && product.variants.length > 0;
  const totalVariantStock = product?.variants?.reduce((total: number, variant: any) => total + (variant?.stock || 0), 0) || 0;
  const isOutOfStock = (product?.stock ?? 0) <= 0 && totalVariantStock <= 0;

  const availableSizes = Array.from(new Set(product?.variants?.flatMap((v: any) => v.size).filter(Boolean))) as string[];
  const availableColors = Array.from(new Set(product?.variants?.map((v: any) => v.color).filter(Boolean))) as string[];

  const characteristics = [
    { label: "Brand", value: brand?.[0]?.brandName },
    { label: "Collection", value: "2025" },
    { label: "Sizes", value: availableSizes.join(", "), capitalize: true },
    { label: "Colors", value: availableColors.join(", "), capitalize: true },
    { label: "Material", value: product?.material, capitalize: true },
    { label: "Stock", value: !isOutOfStock ? "Available" : "Out of Stock" },
    { label: "Care Instructions", value: product?.careInstructions },
  ].filter((char) => char.value);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border-t border-accent-pink/10"
    >
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger className="py-4 text-sm font-bold uppercase tracking-widest text-darkColor hover:text-accent-pink hover:no-underline">
          Product Details
        </AccordionTrigger>
        <AccordionContent className="pt-2 pb-2 text-sm">
          <div className="space-y-4">
            {characteristics.map((char, index) => (
              <div
                key={index}
                className="flex items-start sm:items-center justify-between gap-4"
              >
                <p className="font-medium text-gray-500 shrink-0">{char.label}</p>
                <p
                  className={`font-semibold text-darkColor text-right wrap-break-word ${char.capitalize ? "capitalize" : ""}`}
                >
                  {char.value}
                </p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCharacteristics;
