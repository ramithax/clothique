"use server"

import prisma from "@/lib/prisma"
import { isAdmin } from "../utils/session"

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

export const editOrderStatus = async (id: string, status: string) => {

    const admin = await isAdmin()

    if (!admin) {
        return { error: "Not allowed" }
    }

    try {

    } catch (error) {
        return {
            success: false,
            message: "Failed to update order status"
        }
    }

}