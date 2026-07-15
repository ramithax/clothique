"use client"

import React, { useState } from "react";

export default function AddProductPage() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [labeledPrice, setLabeledPrice] = useState("")
    const [images, setImages] = useState<File[]>([])
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [brand, setBrand] = useState("")
    const [isAvailable, setIsAvailable] = useState(false)

    const hanldeOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Add Product
            </h1>

            <form className="space-y-5" onSubmit={hanldeOnSubmit}>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            className="w-full border rounded-lg px-4 py-2"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Labeled Price
                        </label>
                        <input
                            type="number"
                            name="labeledPrice"
                            className="w-full border rounded-lg px-4 py-2"
                            value={labeledPrice}
                            onChange={(e) => setLabeledPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Images
                    </label>

                    <input
                        type="file"
                        name="images"
                        multiple
                        accept="image/*"
                        className="w-full border rounded-lg px-4 py-2 bg-white"
                        onChange={(e) => {
                            if (e.target.files) {
                                setImages(Array.from(e.target.files));
                            }
                        }}
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        You can upload multiple product images
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        className="w-full border rounded-lg px-4 py-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        className="w-full border rounded-lg px-4 py-2"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand
                    </label>
                    <input
                        type="text"
                        name="brand"
                        className="w-full border rounded-lg px-4 py-2"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isAvailable"
                        className="w-4 h-4"
                        checked={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                    <label className="text-sm font-medium text-gray-700">
                        Is Available
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                    Add Product
                </button>

            </form>
        </div>
    );
}