import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();

    // ✅ FIX: await headers()
    const sig = (await headers()).get("stripe-signature");

    if (!sig) {
        return NextResponse.json(
            { error: "Missing Stripe signature" },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("❌ Webhook signature verification failed:", err);
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    // 🎯 Handle event
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const orderId = session.metadata?.orderId;

        if (!orderId) {
            console.error("❌ Missing orderId in metadata");
            return NextResponse.json(
                { error: "Missing orderId" },
                { status: 400 }
            );
        }

        try {
            // ✅ Get order first to prevent double-processing
            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: { items: true },
            });

            if (!order) {
                throw new Error("Order not found");
            }

            // 🛡️ Prevent double-processing (Stripe webhooks can be retried)
            if (order.status !== "PENDING") {
                console.log("⚠️ Order already processed:", orderId);
                return NextResponse.json({ received: true });
            }

            // ✅ Update order status
            await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: "PAID",
                    stripeSessionId: session.id,
                },
            });

            // ✅ Reduce stock
            for (const item of order.items) {
                await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });
            }

            console.log("✅ Order marked as PAID:", orderId);
        } catch (err) {
            console.error("❌ Error processing order:", err);
            return NextResponse.json(
                { error: "Database update failed" },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({ received: true });
}