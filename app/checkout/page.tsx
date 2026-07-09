"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
    const { items, removeItem, addItem, clearCart } = useCartStore();

    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6">
                <h1 className="text-2xl font-semibold text-gray-500">
                    Your Cart is Empty 🛒
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-gray-50">

            {/* Title */}
            <h1 className="text-3xl font-bold mb-8 text-center">
                Checkout
            </h1>

            {/* Card */}
            <Card className="w-full max-w-md mb-8 shadow-md rounded-xl">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Order Summary
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">

                    {/* Items */}
                    <ul className="space-y-4">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                className="flex flex-col gap-2 border-b pb-3 last:border-none"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-800">
                                        {item.name}
                                    </span>

                                    <span className="font-semibold">
                                        ${((item.price * item.quantity) / 100).toFixed(2)}
                                    </span>
                                </div>

                                {/* Quantity controls */}
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        –
                                    </Button>

                                    <span className="text-lg font-semibold">
                                        {item.quantity}
                                    </span>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            addItem({ ...item, quantity: 1 })
                                        }
                                    >
                                        +
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-gray-600 font-medium">
                            Total
                        </span>
                        <span className="text-xl font-bold">
                            ${(total / 100).toFixed(2)}
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Button */}
            <form className="max-w-md mx-auto w-full">
                <Button
                    type="submit"
                    className=" w-full py-3 text-lg font-semibold rounded-xl bg-black text-white transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg " >
                    Proceed to Payment
                </Button>

                <Button
                    onClick={() => clearCart()}
                    className=" w-full py-3 text-lg font-semibold rounded-xl bg-black text-white transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg " >
                    Clear Cart
                </Button>
            </form>

        </div>
    );

}