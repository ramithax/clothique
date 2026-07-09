"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    const { clearCart } = useCartStore();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

            <div className="bg-white max-w-lg w-full rounded-2xl shadow-md p-10 text-center">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <CheckCircle
                        size={70}
                        className="text-green-500"
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment Successful!
                </h1>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed mb-8">
                    Thank you for your purchase. Your order has been received
                    and is being processed. We appreciate your trust in us.
                </p>

                {/* Button */}
                <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-black text-white transition-all duration-300 hover:bg-gray-900 hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg"
                >
                    Continue Shopping
                </Link>

            </div>

        </div>
    );
}