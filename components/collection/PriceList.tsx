import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceArray = [
  { title: "Under ₹500", value: "0-500" },
  { title: "₹500 - ₹1000", value: "500-1000" },
  { title: "₹1000 - ₹3000", value: "1000-3000" },
  { title: "₹3000 - ₹5000", value: "3000-5000" },
  { title: "Over ₹5000", value: "5000-10000" },
];

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Price</Title>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedPrice(price?.value);
            }}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price?.value}
              className={`${selectedPrice === price?.value ? "font-semibold text-accent-pink" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
        {selectedPrice && (
          <button
            onClick={() => {
              setSelectedPrice(null);
            }}
            className="text-sm font-medium mt-2 underline underline-offset-2 text-left decoration-1 hover:text-accent-pink hoverEffect"
          >
            Reset Selection
          </button>
        )}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
