"use client"

import Link from "next/link"

type Order = {
    id: string
    totalAmount: number
    status: string
    createdAt: Date
    user: {
        email: string
        name?: string
    }
}

export default function OrderTable({ orders }: { orders: Order[] }) {

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Orders
                </h1>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">

                {orders.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No orders found
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">

                        {/* Head */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    {/* Order ID */}
                                    <td className="px-6 py-4">
                                        {order.id.slice(0, 8)}...
                                    </td>

                                    {/* Customer */}
                                    <td className="px-6 py-4">
                                        {order.user?.email || "Unknown"}
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        }).format(order.totalAmount)}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-xs font-medium ${order.status === "PAID"
                                                ? "text-green-600"
                                                : order.status === "PENDING"
                                                    ? "text-yellow-500"
                                                    : order.status === "CANCELLED"
                                                        ? "text-red-500"
                                                        : "text-gray-500"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="text-blue-600 text-sm hover:underline"
                                        >
                                            View
                                        </Link>
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