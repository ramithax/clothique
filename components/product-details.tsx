import Stripe from "stripe"
import Image from "next/image"
import { Button } from "./ui/button"

interface Props {
    product: Stripe.Product
}

export const ProductDetail = ({ product }: Props) => {

    const price = product.default_price as Stripe.Price

    return (
        <div className="container mx-auto px-4 py-10">

            <div className="flex flex-col md:flex-row gap-10 items-center">

                {/* Image */}
                {product.images?.[0] && (
                    <div className="relative h-96 w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition duration-300 hover:scale-105"
                        />
                    </div>
                )}

                {/* Details */}
                <div className="md:w-1/2 space-y-5">

                    <h1 className="text-4xl font-bold text-gray-900">
                        {product.name}
                    </h1>

                    {product.description && (
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* Price */}
                    {price?.unit_amount && (
                        <p className="text-2xl font-semibold text-black">
                            ${(price.unit_amount / 100).toFixed(2)}
                        </p>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-4">

                        <Button variant="outline" className="px-4 py-2 text-lg">
                            -
                        </Button>

                        <span className="text-lg font-medium">1</span>

                        <Button variant="outline" className="px-4 py-2 text-lg">
                            +
                        </Button>

                    </div>

                    {/* Add to cart */}
                    <div className="mt-6">
                        <Button className="w-full md:w-auto px-8 py-3 text-lg">
                            Add to Cart
                        </Button>
                    </div>

                </div>

            </div>
        </div>
    )
}