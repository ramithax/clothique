"use server"

import prisma from "@/lib/prisma"

export const getOrders = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true, // to show email/name
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return { success: true, data: orders }
    } catch (error) {
        console.error(error)
        return { success: false }
    }
}