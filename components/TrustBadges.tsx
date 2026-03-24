import {
  HeartHandshake,
  Lock,
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
} from "lucide-react";
import React from "react";

const extraData = [
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over ₹999 across India.",
    icon: <Truck className="w-8 h-8 text-accent-pink" />,
  },
  {
    title: "Handmade with Love",
    description: "Every piece is crafted with care and attention to detail.",
    icon: <HeartHandshake className="w-8 h-8 text-accent-pink" />,
  },
  {
    title: "Premium Quality",
    description:
      "We use only the finest, skin-friendly fabrics for your little ones.",
    icon: <ShieldCheck className="w-8 h-8 text-accent-pink" />,
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence with our 100% secure checkout process.",
    icon: <Lock className="w-8 h-8 text-accent-pink" />,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated team is here to assist you anytime you need help.",
    icon: <Headphones className="w-8 h-8 text-accent-pink" />,
  },
  {
    title: "Easy Returns",
    description:
      "Hassle-free 7-day return policy for your complete peace of mind.",
    icon: <RotateCcw className="w-8 h-8 text-accent-pink" />,
  },
];

const TrustBadges = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {extraData.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-6 bg-white border border-accent-pink/20 rounded-lg shadow-sm hover:shadow-md hover:border-accent-pink/50 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="p-3 bg-soft-pink rounded-full shrink-0">
            {item.icon}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-darkColor">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
