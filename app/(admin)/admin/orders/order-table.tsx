"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

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

    const [isModalOpen, setIsMoalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order)
        setIsMoalOpen(true)
    }

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
                                        <Button
                                            variant="outline"
                                            className="hover:cursor-pointer"
                                            onClick={() => {
                                                setIsMoalOpen(true)
                                                setSelectedOrder(order)
                                            }}>
                                            View
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>

            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    {/* Modal Box */}
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">

                        <h2 className="text-lg font-semibold mb-4">Order Details</h2>

                        <p><strong>Email:</strong> {selectedOrder.user.email}</p>
                        <p><strong>Amount:</strong> ${selectedOrder.totalAmount}</p>
                        <p><strong>Status:</strong> {selectedOrder.status}</p>

                        {/* Status Dropdown */}
                        <select className="mt-4 border p-2 w-full">
                            <option>PENDING</option>
                            <option>IN PROGRESS</option>
                            <option>DELIVERED</option>
                            <option>CANCELLED</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsMoalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Close
                            </button>

                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>

    )
}