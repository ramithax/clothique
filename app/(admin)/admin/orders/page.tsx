import { getOrders } from "@/lib/actions/order-actions"
import OrderTable from "./order-table"

export default async function OrdersPage() {
    const res = await getOrders()

    if (!res.success) {
        return (
            <div className="p-6 text-red-500 text-center">
                Failed to load orders
            </div>
        )
    }

    return (
        <OrderTable orders={res.data || []} />
    )
}