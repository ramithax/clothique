import AddButton from "@/components/add-button"
import Link from "next/link"
import Image from "next/image"
import { getProducts } from "@/lib/actions/product-actions"

type Product = {
    id: string
    name: string
    price: number
    labeledPrice: number
    stock: number
    category: string
    brand: string
    isAvailable: boolean
    images: string[]
}

export default async function AdminDashboard() {
    const res = await getProducts({ includeUnavailable: true })

    if (!res.success) {
        return (
            <div className="p-6 text-red-500 text-center">
                Failed to load products
            </div>
        )
    }

    const products: Product[] = res.data || []

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Products
                </h1>

                <Link href="/admin/add-product">
                    <AddButton />
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

                {products.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No products found
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">

                        {/* Table Head */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Labeled Price</th>
                                <th className="px-6 py-3">Stock</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Brand</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    {/* Product */}
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <Image
                                            src={product.images?.[0] || "/placeholder.png"}
                                            alt={product.name}
                                            width={48}
                                            height={48}
                                            className="rounded-md object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {product.name}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "LKR",
                                        }).format(product.price)}
                                    </td>

                                    {/* Labeled Price */}
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "LKR",
                                        }).format(product.labeledPrice)}
                                    </td>

                                    {/* Stock */}
                                    <td className="px-6 py-4">
                                        {product.stock}
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-4">
                                        {product.category}
                                    </td>

                                    {/* Brand */}
                                    <td className="px-6 py-4">
                                        {product.brand}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-xs font-medium ${product.isAvailable
                                                ? "text-green-600"
                                                : "text-red-500"
                                                }`}
                                        >
                                            {product.isAvailable
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right space-x-4">

                                        <Link
                                            href={`/admin/edit-product/${product.id}`}
                                            className="text-blue-600 text-sm hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <button className="text-red-600 text-sm hover:underline">
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    )
}