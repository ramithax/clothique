"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { FiTrash2 } from "react-icons/fi";
import { checkOutAction } from "./checkout-action";

export default function CheckoutPage() {
    const { items, removeItem, addItem, clearCart } = useCartStore();

    const total = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleClearCart = () => {
        if (confirm("Are you sure you want to clear the cart?")) {
            clearCart();
        }
    };

    if (items.length === 0) {
        return (<div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gray-50 text-center">

            <div className="text-6xl mb-4">🛒</div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Your Cart is Empty
            </h1>

            <p className="text-gray-500 mb-6 max-w-sm">
                Looks like you haven’t added anything yet. Start exploring and find something you love.
            </p>

            <Button
                onClick={() => window.location.href = "/products"}
                className="px-8 py-3 text-base font-medium rounded-lg bg-black text-white transition-all duration-300 hover:bg-gray-900 hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg"

            >
                Continue Shopping
            </Button>
        </div>
        );
    }


    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-gray-50">

            {/* Title */}
            <h1 className="text-3xl font-semibold mb-8 text-center">
                Checkout
            </h1>

            {/* Card */}
            <Card className="w-full max-w-md mb-8 shadow-md rounded-xl">

                {/* Header with Clear Button */}
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold">
                        Order Summary
                    </CardTitle>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleClearCart}
                    >
                        <FiTrash2 size={18} />
                    </Button>
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

            {/* Checkout Button */}
            <form action={checkOutAction} className="max-w-md mx-auto w-full flex justify-center">
                <input type="hidden" name="items" value={JSON.stringify(items)} />
                <Button
                    type="submit"
                    className="px-8 py-3 text-base font-medium rounded-lg bg-black text-white transition-all duration-300 hover:bg-gray-900 hover:scale-[1.03] active:scale-[0.97] shadow-md hover:shadow-lg"
                >
                    Proceed to Payment
                </Button>
            </form>


        </div>
    );
}