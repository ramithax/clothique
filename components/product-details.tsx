"use client"

import Stripe from "stripe"
import Image from "next/image"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cart-store"
import Link from "next/link"

interface Props {
    product: Stripe.Product
}

export const ProductDetail = ({ product }: Props) => {

    const { items, addItem, removeItem } = useCartStore()
    const price = product.default_price as Stripe.Price

    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price?.unit_amount || 0,
            imageUrl: product.images?.[0] || null,
            quantity: 1,
        })
    }

    return (
        <div className="container mx-auto px-4 py-12">

            <div className="flex flex-col md:flex-row gap-12 items-center">

                {/* Product Image */}
                {product.images?.[0] && (
                    <div className="relative h-[550px] w-full md:w-[55%] rounded-2xl overflow-hidden bg-gray-100 shadow-md flex items-center justify-center">

                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-contain p-8 transition duration-300 hover:scale-105"
                        />

                    </div>
                )}


                {/* Product Details */}
                <div className="md:w-1/2 space-y-6">

                    <h1 className="text-4xl font-bold text-gray-900">
                        {product.name}
                    </h1>


                    {product.description && (
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    )}


                    {/* Price */}
                    {price?.unit_amount && (
                        <p className="text-3xl font-bold text-black">
                            ${(price.unit_amount / 100).toFixed(2)}
                        </p>
                    )}


                    {/* Quantity */}
                    <div className="flex items-center gap-5 pt-4">

                        <Button
                            variant="outline"
                            className="h-10 w-10 text-xl rounded-lg"
                            onClick={() => removeItem(product.id)}
                        >
                            -
                        </Button>


                        <span className="text-xl font-semibold">
                            {quantity}
                        </span>


                        <Button
                            variant="outline"
                            className="h-10 w-10 text-xl rounded-lg"
                            onClick={onAddItem}
                        >
                            +
                        </Button>

                    </div>


                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">

                        <Button
                            variant="outline"
                            onClick={onAddItem}
                            className="w-full sm:w-auto px-8 py-3 text-base rounded-lg"
                        >
                            Add to Cart
                        </Button>


                        <Link href="/checkout">
                            <Button
                                className="w-full sm:w-auto px-8 py-3 text-base rounded-lg bg-black text-white hover:bg-gray-900"
                            >
                                Buy Now
                            </Button>
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    )
}