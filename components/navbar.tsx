"use client"

import Link from "next/link"
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCartStore } from "@/store/cart-store"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { auth } from "@/lib/auth"
import { signOut } from "@/lib/actions/auth-actions"
import { useRouter } from "next/navigation"

type Session = typeof auth.$Infer.Session

export const Navbar = ({ session }: { session: Session | null }) => {

    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const { items } = useCartStore()

    const router = useRouter()

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
        { name: "About", href: "/about" }
    ]

    const mobileLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Settings", href: "/settings" }
    ]


    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between relative">


                {/* Logo */}
                <Link
                    href="/"
                    className="text-3xl font-normal font-[Playfair_Display] tracking-[0.2em] text-black transition-transform duration-300 hover:scale-105"
                >
                    CLOTHIQUE
                </Link>


                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">

                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-gray-700 font-medium tracking-wide transition-colors duration-300 hover:text-black group"
                        >

                            {link.name}

                            <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>

                        </Link>
                    ))}

                </div>



                {/* Right Section */}
                <div className="flex items-center gap-5 md:gap-6">

                    {/* Cart */}
                    <Link href="/checkout" className="relative flex items-center group ml-1">

                        <ShoppingCartIcon className="h-6 w-6 md:h-7 md:w-7 text-gray-800 transition-transform duration-300 group-hover:scale-110" />

                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-black text-white text-[10px] font-bold">
                                {cartCount}
                            </span>
                        )}

                    </Link>

                    {/* Auth Buttons */}
                    {!session && (
                        <div className="hidden md:flex items-center gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => router.push("/sign-in")}
                            >
                                Sign In
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => router.push("/sign-up")}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}

                    <div className="hidden md:block">
                        {session && (
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setIsDropdownOpen(prev => !prev)
                                    }}
                                    className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold uppercase"
                                >
                                    {session.user.name?.charAt(0) || "U"}
                                </button>

                                {/* Dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-xl overflow-visible z-50">

                                        {/* Floating Close Button */}
                                        <button
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:scale-110 transition"
                                        >
                                            ✕
                                        </button>

                                        <div className="py-2">

                                            <button
                                                onClick={() => {
                                                    router.push("/settings")
                                                    setIsDropdownOpen(false)
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                                            >
                                                Settings
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    await signOut()
                                                    router.refresh()
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 transition"
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>



                    {/* Mobile Menu Button */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileOpen((prev) => !prev)}
                    >
                        {isMobileOpen
                            ? <XMarkIcon className="h-5 w-5" />
                            : <Bars3Icon className="h-5 w-5" />
                        }
                    </Button>

                </div>
            </div>



            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >

                <div className="px-6 pb-6 flex flex-col gap-5 text-gray-700 font-medium">

                    {mobileLinks.map((link) => (

                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="py-2 border-b border-gray-100 hover:text-black transition"
                        >
                            {link.name}
                        </Link>

                    ))}

                </div>

            </div>


        </nav>
    )
}