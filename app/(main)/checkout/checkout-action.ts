"use server"

import { stripe } from "@/lib/stripe"
import { CartItem } from "@/store/cart-store"
import { redirect } from "next/navigation"

export const checkOutAction = async (formData: FormData): Promise<void> => {

    const itemsJson = formData.get("items") as string
    const items = JSON.parse(itemsJson)
    const line_items = items.map((item: CartItem) => ({
        quantity: item.quantity,
        price_data: {
            currency: "usd",
            unit_amount: item.price,
            product_data: {
                name: item.name
            }
        }
    }))
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: line_items,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    })

    redirect(session.url!)
}