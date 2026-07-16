import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-black">Clothique</h2>
                    <p className="text-gray-500 mt-3 text-sm">
                        Elevate your everyday style with modern, minimal fashion.
                    </p>
                </div>

                {/* Shop */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Shop</h3>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <li className="hover:text-black cursor-pointer">Hoodies</li>
                        <li className="hover:text-black cursor-pointer">T-Shirts</li>
                        <li className="hover:text-black cursor-pointer">Shorts</li>
                        <li className="hover:text-black cursor-pointer">New Arrivals</li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
                    <ul className="space-y-2 text-gray-500 text-sm">
                        <Link href="/about"><li className="hover:text-black cursor-pointer">About Us</li></Link>
                        <Link href="/careers"><li className="hover:text-black cursor-pointer">Careers</li></Link>
                        <Link href="/contact"><li className="hover:text-black cursor-pointer">Contact</li></Link>
                        <Link href="/blog"><li className="hover:text-black cursor-pointer">Blog</li></Link>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Stay Updated</h3>
                    <p className="text-gray-500 text-sm mb-3">
                        Get updates on new drops & exclusive offers.
                    </p>

                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 text-sm outline-none"
                        />
                        <button className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Clothique. All rights reserved.
            </div>
        </footer>
    );
};