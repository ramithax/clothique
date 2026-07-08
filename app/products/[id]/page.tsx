import { ProductDetail } from "@/components/product-details"
import { stripe } from "@/lib/stripe"

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

    return <ProductDetail product={plainProduct} />
}