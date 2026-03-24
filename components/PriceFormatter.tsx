import { cn } from "@/lib/utils";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (amount === undefined || amount === null) return null;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
    maximumFractionDigits: 0, // Clean fashion look with no decimals
  }).format(amount);

  return <span className={cn("font-semibold", className)}>{formattedPrice}</span>;
};

export default PriceFormatter;
