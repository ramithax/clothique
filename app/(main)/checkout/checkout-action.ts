"use server";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { CartItem } from "@/store/cart-store";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const checkOutAction = async (formData: FormData): Promise<void> => {
    // ✅ Get session
    const userSession = await auth.api.getSession({
        headers: await headers(),
    });

    if (!userSession) {
        redirect("/sign-in");
    }

    // ✅ Parse cart
    const itemsJson = formData.get("items") as string;
    const items: CartItem[] = JSON.parse(itemsJson);

    if (!items.length) {
        throw new Error("Cart is empty");
    }

    // ✅ Fetch products from DB (secure pricing)
    const dbProducts = await prisma.product.findMany({
        where: {
            id: {
                in: items.map((item) => item.id),
            },
        },
    });

    // ✅ Build Stripe line items
    const line_items = items.map((item) => {
        const product = dbProducts.find((p) => p.id === item.id);

        if (!product) {
            throw new Error("Product not found");
        }

        // ✅ Stock check
        if (product.stock < item.quantity) {
            throw new Error(`${product.name} is out of stock`);
        }

        return {
            quantity: item.quantity,
            price_data: {
                currency: "usd",

                // 🔥 IMPORTANT: Stripe expects cents
                unit_amount: Math.round(product.price * 100),

                product_data: {
                    name: product.name,
                    images: product.images?.[0]
                        ? [product.images[0]]
                        : [],
                },
            },
        };
    });

    // ✅ Calculate total (USD, not cents)
    const totalAmount = items.reduce((sum, item) => {
        const product = dbProducts.find((p) => p.id === item.id);
        if (!product) throw new Error("Product not found");
        return sum + product.price * item.quantity;
    }, 0);

    let order;
    let sessionUrl: string;

    try {
        // ✅ Create order in DB
        order = await prisma.order.create({
            data: {
                userId: userSession.user.id,
                totalAmount,
                status: "PENDING",
                items: {
                    create: items.map((item) => {
                        const product = dbProducts.find(
                            (p) => p.id === item.id
                        )!;
                        return {
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: item.quantity,
                        };
                    }),
                },
            },
        });

        // ✅ Create Stripe session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",

            customer_email: userSession.user.email,

            metadata: {
                userId: userSession.user.id,
                orderId: order.id,
            },

            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
        });

        sessionUrl = session.url!;
    } catch (error) {
        // ❗ Rollback order if Stripe fails
        if (order) {
            await prisma.order.delete({
                where: { id: order.id },
            });
        }

        throw error;
    }

    // ✅ Redirect to Stripe
    redirect(sessionUrl);
};