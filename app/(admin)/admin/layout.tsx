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

    console.log("Session:", session?.user);

    if (session?.user.role != "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">

            {/* Top Header */}
            <header className="w-full px-6 py-4 bg-white border-b border-gray-200">
                <Link href="/">
                    <p className="text-2xl font-normal font-[Playfair_Display] tracking-[0.2em] text-black">
                        CLOTHIQUE
                    </p>
                </Link>
            </header>

            {/* Body */}
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className="w-64 border-r p-6 space-y-6">
                    <nav className="flex flex-col gap-4 text-sm">
                        <Link href="/admin" className="hover:underline">
                            Dashboard
                        </Link>
                        <Link href="/admin/products" className="hover:underline">
                            Products
                        </Link>
                        <Link href="/admin/orders" className="hover:underline">
                            Orders
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