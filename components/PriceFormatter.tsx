import { cn } from "@/lib/utils";

interface Props{
    amount: number | undefined;
    className: string;
}

const PriceFormatter = ({amount,className}:Props) =>{
    const formattedprice = new Number(amount).toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
      });
      return(
        <span className={cn("text-sm font-semibold text-darkColor",className)}>
            {formattedprice}
        </span>
      )
}   

export default PriceFormatter;