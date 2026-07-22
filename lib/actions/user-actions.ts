"use server"

import prisma from "@/lib/prisma"

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return {
            success: true,
            data: users
        }

    } catch (error) {
        console.log(error)

        return {
            success: false,
            data: []
        }
    }
}