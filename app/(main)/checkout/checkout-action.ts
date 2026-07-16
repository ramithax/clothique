"use server"

import { auth } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { CartItem } from "@/store/cart-store"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export const checkOutAction = async (formData: FormData): Promise<void> => {

    const userSession = await auth.api.getSession({
        headers: await headers()
    })


    if (!userSession) {
        redirect("/sign-in")
    }


    const itemsJson = formData.get("items") as string;
    const items: CartItem[] = JSON.parse(itemsJson);


    const line_items = items.map((item) => ({
        quantity: item.quantity,

        price_data: {
            currency: "usd",

            unit_amount: Math.round(item.price * 100),

            product_data: {
                name: item.name
            }
        }
    }));


    const session = await stripe.checkout.sessions.create({

        payment_method_types: ["card"],

        line_items,

        mode: "payment",

        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,

        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });


    redirect(session.url!);
}