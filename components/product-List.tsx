"use client"

import Stripe from "stripe"
import { ProductCard } from "./product-card"
import { useState } from "react"

interface Props {
    products: Stripe.Product[]
}

export const ProductList = ({ products }: Props) => {

    const [search, setSearch] = useState<string>("")

    const filteredProduct = products.filter((product) => {
        const term = search.toLowerCase()

        const nameMatch = product.name.toLocaleLowerCase().includes(term)
        const descMatch = product.description ? product.description.toLocaleLowerCase().includes(term) : false

        return nameMatch || descMatch
    })

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            {/* Header + Search */}
            <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">

                <h2 className="text-2xl font-bold tracking-tight">
                    All Products
                </h2>

                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={
                        (e) => setSearch(e.target.value)
                    }
                    className="w-full max-w-xs rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/20"
                />

            </div>

            {/* Products Grid */}
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {filteredProduct.map((product) => (
                    <li
                        key={product.id}
                        className="transition-transform duration-300 hover:-translate-y-1"
                    >
                        <ProductCard product={product} />
                    </li>
                ))}

            </ul>

        </div>
    )
}