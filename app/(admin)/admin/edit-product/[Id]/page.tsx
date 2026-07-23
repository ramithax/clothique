"use client"

import { Button } from "@/components/ui/button";
import { createProduct } from "@/lib/actions/product-actions";
import { uploadImage } from "@/lib/utils/supabase";
import React, { useState } from "react";
import { toast } from "sonner";

export default function EditProduct() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [labeledPrice, setLabeledPrice] = useState("")
    const [images, setImages] = useState<File[]>([])
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [brand, setBrand] = useState("")
    const [isAvailable, setIsAvailable] = useState(false)

    const [loading, setLoading] = useState(false)
    const [fileKey, setFileKey] = useState(0)

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true)

        if (!name.trim()) {
            toast.error("Product name is required")
            setLoading(false)
            return
        }

        if (!price || Number(price) <= 0) {
            toast.error("Price must be greater than 0")
            setLoading(false)
            return
        }

        if (images.length === 0) {
            toast.error("At least one image is required")
            setLoading(false)
            return
        }

        const imageUploadPromises: Promise<string>[] = []

        for (let i = 0; i < images.length; i++) {
            const file = images[i]

            if (!file.type.startsWith("image/")) {
                toast.error("Only image files are allowed")
                setLoading(false)
                return
            }

            if (file.size > 2 * 1024 * 1024) {
                toast.error("Each image must be less than 2MB")
                setLoading(false)
                return
            }

            imageUploadPromises.push(uploadImage(file))
        }

        try {
            const imageUrls = await Promise.all(imageUploadPromises)

            const formData = new FormData()

            formData.append("name", name.trim())
            formData.append("description", description.trim())
            formData.append("price", price)
            formData.append("labeledPrice", labeledPrice)
            formData.append("images", JSON.stringify(imageUrls))
            formData.append("category", category.trim())
            formData.append("stock", stock)
            formData.append("brand", brand.trim())
            formData.append("isAvailable", String(isAvailable))

            const response = await createProduct(formData)

            if (response.success) {
                toast.success(response.message)


                setName("")
                setDescription("")
                setPrice("")
                setLabeledPrice("")
                setImages([])
                setCategory("")
                setStock("")
                setBrand("")
                setIsAvailable(false)

                setFileKey(prev => prev + 1)

            } else {
                toast.error(response.message)
            }

        } catch (error) {
            console.error("Something went wrong", error)
            toast.error("Upload failed. Try again.")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Add Product
            </h1>

            <form className="space-y-5" onSubmit={handleOnSubmit}>

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        rows={4}
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
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
                            className="w-full border rounded-lg px-4 py-2"
                            value={labeledPrice}
                            onChange={(e) => setLabeledPrice(e.target.value)}
                        />
                    </div>
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Images
                    </label>

                    <input
                        key={fileKey}
                        type="file"
                        multiple
                        accept="image/*"
                        disabled={loading}
                        className="w-full border rounded-lg px-4 py-2 bg-white"
                        onChange={(e) => {
                            if (!e.target.files) return;

                            const files = Array.from(e.target.files)
                            const validFiles: File[] = []

                            for (const file of files) {
                                if (!file.type.startsWith("image/")) {
                                    toast.error(`${file.name} is not an image`)
                                    continue
                                }

                                if (file.size > 2 * 1024 * 1024) {
                                    toast.error(`${file.name} > 2MB`)
                                    continue
                                }

                                validFiles.push(file)
                            }

                            setImages(validFiles)
                        }}
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        Max size: 2MB per image
                    </p>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                    </label>
                    <input
                        type="number"
                        className="w-full border rounded-lg px-4 py-2"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>

                {/* Brand */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand
                    </label>
                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={isAvailable}
                        onChange={(e) => setIsAvailable(e.target.checked)}
                    />
                    <label className="text-sm font-medium text-gray-700">
                        Is Available
                    </label>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Product"}
                </Button>

            </form>
        </div>
    );
}