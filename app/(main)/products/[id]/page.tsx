import { ProductDetail } from "@/components/product-details"
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers";

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const resolvedParams = await params;

    const product = await stripe.products.retrieve(resolvedParams.id, {
        expand: ["default_price"],
    })

    const plainProduct = JSON.parse(JSON.stringify(product))

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return <ProductDetail product={plainProduct} session={session} />
}