import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar session={session} />

            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}