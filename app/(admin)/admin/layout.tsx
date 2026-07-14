import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (session?.user.role != "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">

            {/* Top Header */}
            <header className="w-full px-6 py-4 bg-white border-b border-gray-200">
                <Link href="/">
                    <p className="text-2xl font-normal font-[Playfair_Display] tracking-[0.2em] text-black text-center">
                        CLOTHIQUE
                    </p>
                </Link>
            </header>

            {/* Body */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="w-64 min-h-screen bg-white border-r shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-8">
                        Admin Panel
                    </h2>

                    <nav className="flex flex-col gap-2 text-sm">

                        <Link
                            href="/admin"
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
                        >
                            Products
                        </Link>

                        <Link
                            href="/admin/orders"
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
                        >
                            Orders
                        </Link>

                        <Link
                            href="/admin/users"
                            className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition"
                        >
                            Users
                        </Link>

                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    )
}