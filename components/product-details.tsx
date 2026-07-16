"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Session } from "@/lib/types/types";
import type { Product } from "@/lib/types/product";


interface Props {
    product: Product;
    session: Session | null;
}


export const ProductDetail = ({ product, session }: Props) => {

    const { items, addItem, removeItem } = useCartStore();
    const router = useRouter();

    const cartItem = items.find(item => item.id === product.id);
    const quantity = cartItem?.quantity ?? 0;


    const addToCart = () => {

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.images?.[0] || null,
            quantity: 1
        });

        toast.success("Item added to cart");
    };


    return (
        <div className="mx-auto max-w-6xl py-12">

            <div className="flex flex-col items-center gap-12 md:flex-row">

                {product.images?.[0] && (
                    <div className="relative h-[550px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-md md:w-[55%]">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width:768px)100vw,55vw"
                            className="object-contain p-8"
                        />
                    </div>
                )}


                <div className="space-y-6 md:w-1/2">

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>


                    <p className="text-lg text-gray-600">
                        {product.description}
                    </p>


                    <div>
                        {product.labeledPrice > product.price && (
                            <span className="mr-3 text-gray-400 line-through">
                                LKR.{product.labeledPrice.toFixed(2)}
                            </span>
                        )}

                        <span className="text-3xl font-bold">
                            LKR.{product.price.toFixed(2)}
                        </span>
                    </div>


                    <div className="flex items-center gap-5">

                        <Button
                            variant="outline"
                            className="h-10 w-10"
                            onClick={() => removeItem(product.id)}
                        >
                            -
                        </Button>

                        <span className="text-xl font-semibold">
                            {quantity}
                        </span>


                        <Button
                            variant="outline"
                            className="h-10 w-10"
                            onClick={addToCart}
                        >
                            +
                        </Button>

                    </div>


                    <div className="flex flex-col gap-4 sm:flex-row">

                        <Button
                            variant="outline"
                            onClick={addToCart}
                            className="px-6 py-3 text-base rounded-lg"
                        >
                            Add to Cart
                        </Button>


                        <Button
                            className="px-6 py-3 text-base rounded-lg bg-black text-white hover:bg-gray-900"
                            onClick={() => {
                                session
                                    ? router.push("/checkout")
                                    : router.push("/sign-in");
                            }}
                        >
                            Buy Now
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );
};