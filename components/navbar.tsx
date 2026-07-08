import Link from "next/link"

export const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-wide text-gray-800 transition-transform duration-300 hover:scale-110">
                    Clothique
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
                    <Link href="/" className="transition-transform duration-300 hover:scale-110">
                        Home
                    </Link>
                    <Link href="/products" className="transition-transform duration-300 hover:scale-110">
                        Products
                    </Link>
                    <Link href="/checkout" className="transition-transform duration-300 hover:scale-110">
                        Checkout
                    </Link>
                    <Link href="/about" className="transition-transform duration-300 hover:scale-110">
                        About
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                </div>

            </div>
        </nav>
    )
}