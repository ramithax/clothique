"use client"

import Stripe from "stripe"
import { Card, CardContent, CardTitle } from "./ui/card"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Props {
    products: Stripe.Product[]
}

export default function Carousel({ products }: Props) {

    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % products.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [products.length])


    const currentProduct = products[current]

    const price = currentProduct.default_price as Stripe.Price


    return (
        <Card className="group relative h-[450px] overflow-hidden rounded-3xl border-none shadow-xl">

            {currentProduct.images?.[0] && (
                <div className="flex h-full w-full items-center justify-center">

                    <Image
                        src={currentProduct.images[0]}
                        width={800}
                        height={800}
                        alt={currentProduct.name}
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />

                </div>
            )}


            {/* Product Details */}
            <CardContent className="absolute inset-0 flex flex-col justify-end p-8">

                <CardTitle className="mb-2 text-4xl font-bold text-white flex justify-center items-center">
                    {currentProduct.name}
                </CardTitle>


                {price?.unit_amount && (
                    <p className="text-2xl font-semibold text-white flex justify-center items-center">
                        ${(price.unit_amount / 100).toFixed(2)}
                    </p>
                )}


            </CardContent>


        </Card>
    )
}