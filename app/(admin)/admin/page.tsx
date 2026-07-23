import { getProducts } from "@/lib/actions/product-actions"
import ProductTable from "./product-table"

export default async function AdminDashboard() {
    const res = await getProducts({ includeUnavailable: true })

    if (!res.success) {
        return (
            <div className="p-6 text-red-500 text-center">
                Failed to load products
            </div>
        )
    }

    return (
        <ProductTable products={res.data || []} />
    )
}