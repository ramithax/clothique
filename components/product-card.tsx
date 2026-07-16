"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types/product";


interface Props {
    product: Product;
}


export const ProductCard = ({ product }: Props) => {

    return (

        <Link href={`/products/${product.id}`}>

            <div className="rounded-xl border p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <div className="relative h-60 w-full">

                    <Image
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="(max-width:768px) 100vw, 25vw"
                        className="object-contain"
                    />

                </div>


                <h3 className="mt-4 font-semibold">
                    {product.name}
                </h3>


                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                    {product.description}
                </p>


                <div className="mt-3">

                    <span className="mr-2 text-gray-400 line-through">
                        LKR.{product.labeledPrice.toFixed(2)}
                    </span>


                    <span className="font-bold">
                        LKR.{product.price.toFixed(2)}
                    </span>

                </div>


                <div className="mt-2 flex justify-between text-sm">

                    <span>
                        Stock: {product.stock}
                    </span>


                    {
                        !product.isAvailable && (
                            <span className="text-red-500">
                                Unavailable
                            </span>
                        )
                    }

                </div>


            </div>

        </Link>

    );
};