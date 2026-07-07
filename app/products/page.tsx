import { ProductList } from "@/components/product-List";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {

    const products = await stripe.products.list({
        expand: ["data.default_price"],
    });

    return (
        <div>
            <ProductList products={products.data} />
        </div>
    )
}