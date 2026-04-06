import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Logo from './Logo'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { Button } from './ui/button'

const NoAccessToCart = ({ 
    details = "Sign in to unlock your cart and gracefully proceed to checkout. Don't miss out on your favorite handcrafted pieces.", 
}: { 
    details?: string 
}) => {
    return (
        <div className="flex items-center justify-center py-12 md:py-32 p-4">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border border-accent-pink/20 rounded-[2rem] shadow-xl shadow-soft-pink/30 p-2 sm:p-4">
                <CardHeader className="flex items-center flex-col gap-2 pb-6">
                    <Logo />
                    <CardTitle className="text-2xl font-bold text-darkColor tracking-wide mt-2 text-center">
                        Welcome <span className="font-serif italic text-accent-pink font-medium">Back</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-center text-gray-600 text-base leading-relaxed">{details}</p>
                    <SignInButton mode='modal'>
                        <Button className="w-full h-12 bg-dark-pink text-white hover:bg-accent-pink hoverEffect rounded-full px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">Sign In</Button>
                    </SignInButton>
                </CardContent>
                <CardFooter className="flex items-center flex-col gap-3 pt-4 border-t border-accent-pink/10">
                    <p className="text-gray-500 text-sm">Don&apos;t have an account?</p>
                    <SignUpButton mode='modal'>
                        <Button variant="outline" className="w-full h-12 rounded-full border-accent-pink/30 text-darkColor hover:bg-soft-pink/30 hover:text-accent-pink hover:border-accent-pink transition-all duration-300 text-base font-semibold">Create an Account</Button>
                    </SignUpButton>
                </CardFooter>
            </Card>
        </div>
    )
}

export default NoAccessToCart
