import { ProductList } from "@/components/product-List";
import { getProducts } from "@/lib/actions/product-actions";


export default async function ProductsPage() {

    const response = await getProducts();


    if (!response.success || !response.data) {
        return (
            <div className="p-10 text-center">
                Failed to load products
            </div>
        );
    }


    return (
        <div>
            <ProductList
                products={response.data}
            />
        </div>
    );
}