"use client"

import Link from "next/link"
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export const Navbar = () => {

    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const { items } = useCartStore()

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])


    const links = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "Checkout", href: "/checkout" },
        { name: "About", href: "/about" },
    ]


    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">


                {/* Logo */}
                <Link href="/" className="text-3xl font-black tracking-[0.15em] text-black transition-transform duration-300 hover:scale-105">
                    CLOTHIQUE
                </Link>


                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">

                    {links.map((link) => (
                        <Link key={link.name} href={link.href} className="relative text-gray-700 font-medium tracking-wide transition-colors duration-300 hover:text-black group">

                            {link.name}

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>

                        </Link>
                    ))}

                </div>



                {/* Right Section */}
                <div className="flex items-center gap-5">


                    {/* Cart */}
                    <Link href="/checkout" className="relative group">

                        <ShoppingCartIcon className="h-7 w-7 text-gray-800 transition-transform duration-300 group-hover:scale-110" />

                        {cartCount > 0 && (
                            <span className="absolute -top-3 -right-3 flex items-center justify-center h-5 w-5 rounded-full bg-black text-white text-xs font-bold">
                                {cartCount}
                            </span>
                        )}

                    </Link>



                    {/* Mobile Menu Button */}
                    <Button variant="ghost" className="md:hidden hover:bg-gray-100" onClick={() => setIsMobileOpen((prev) => !prev)}>

                        {isMobileOpen
                            ? <XMarkIcon className="h-7 w-7" />
                            : <Bars3Icon className="h-7 w-7" />
                        }

                    </Button>


                </div>

            </div>



            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>

                <div className="px-6 pb-6 flex flex-col gap-5 text-gray-700 font-medium">

                    {links.map((link) => (

                        <Link key={link.name} href={link.href} onClick={() => setIsMobileOpen(false)} className="py-2 border-b border-gray-100 hover:text-black transition">

                            {link.name}

                        </Link>

                    ))}

                </div>

            </div>


        </nav>
    )
}