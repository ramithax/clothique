"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types/product";
import { Button } from "./ui/button";

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    return (
        <Link href={`/products/${product.id}`}>
            <div className="group rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-gray-100">
                    <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="(max-width:768px) 100vw, 25vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="mt-4 space-y-2">

                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {product.name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">
                            LKR {product.labeledPrice.toFixed(2)}
                        </span>
                        <span className="text-lg font-bold text-black">
                            LKR {product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Stock + Status */}
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                            Stock: {product.stock}
                        </span>

                        {!product.isAvailable && (
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                                Out of stock
                            </span>
                        )}
                    </div>

                    {/* Button */}
                    <Button className="mt-3 w-full rounded-lg bg-black text-white transition hover:bg-gray-800">
                        View Details
                    </Button>

                </div>
            </div>
        </Link>
    );
};