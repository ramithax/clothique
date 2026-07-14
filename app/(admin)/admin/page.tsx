import AddButton from "@/components/add-button";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Products Page</h1>

            <Link href="/admin/add-product">
                <AddButton />
            </Link>
        </div>
    )
}