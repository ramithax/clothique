import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function isAdmin() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user?.email) return false

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { role: true },
    })

    return user?.role === "ADMIN"
}