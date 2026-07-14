export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

            <div className="grid grid-cols-3 gap-6">
                <div className="border p-4">Total Products</div>
                <div className="border p-4">Total Orders</div>
                <div className="border p-4">Revenue</div>
            </div>
        </div>
    )
}