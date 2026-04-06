"use client";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import emptyCart from "@/assets/emptyCart.png";
import Image from "next/image";

export default function EmptyCart() {
    return (
        <div className="py-10 md:py-20 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 backdrop-blur-md border border-accent-pink/20 rounded-[2rem] shadow-xl shadow-soft-pink/30 p-8 max-w-md w-full space-y-8"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut",
                    }}
                    className="relative w-48 h-48 mx-auto"
                >
                    <Image
                        src={emptyCart}
                        alt="Empty shopping cart"
                        layout="fill"
                        objectFit="contain"
                        className="drop-shadow-lg"
                    />
                    <motion.div
                        animate={{
                            x: [0, -5, 5, 0],
                            y: [0, -5, 5, 0],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "linear",
                        }}
                        className="absolute -top-2 -right-2 bg-accent-pink rounded-full p-3 shadow-md"
                    >
                        <ShoppingBag size={24} className="text-white" />
                    </motion.div>
                </motion.div>

                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-darkColor tracking-wide">
                        Your Cart is <span className="font-serif italic text-accent-pink font-medium">Empty</span>
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                        Looks like you haven&apos;t found your perfect match yet. Explore our handcrafted collection and add a touch of elegance to your wardrobe.
                    </p>
                </div>

                <div>
                    <Link
                        href="/collections"
                        className="block w-full text-center bg-dark-pink text-white hover:bg-accent-pink hoverEffect rounded-full px-8 py-3.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Explore Collection
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}