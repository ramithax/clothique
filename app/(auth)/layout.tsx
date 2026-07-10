import Link from "next/link";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Top Brand Header */}
            <Link href="/">
                <div className="w-full px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                    <p className="text-2xl font-normal font-[Playfair_Display] tracking-[0.2em] text-black">
                        CLOTHIQUE
                    </p>
                </div>
            </Link>

            {/* Centered Content */}
            <div className="flex flex-1 items-center justify-center px-4">
                {children}
            </div>

        </div>
    );
}