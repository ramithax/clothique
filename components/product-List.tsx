"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { Product } from "@/lib/types/product";


interface Props {
    products: Product[];
}


export const ProductList = ({ products }: Props) => {

    const [search, setSearch] = useState("");


    const filteredProducts = products.filter((product) => {

        const term = search.toLowerCase().trim();

        if (!term) return true;


        return (
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term)
        );

    });


    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">

                <h2 className="text-2xl font-bold">
                    All Products
                </h2>


                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-xs rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm outline-none focus:border-black"
                />

            </div>


            {
                filteredProducts.length === 0 ? (

                    <div className="py-20 text-center text-gray-500">
                        No products found
                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                        {
                            filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        }

                    </div>

                )
            }


        </div>
    );
};