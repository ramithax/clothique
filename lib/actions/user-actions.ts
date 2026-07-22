"use server"

import prisma from "@/lib/prisma"

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        if (!users) {
            return {
                success: false,
                message: "Users not found",
                data: []
            }
        }

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

export async function getUserById(id: string) {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return {
                success: false,
                message: "User not found",
                data: null
            }
        }

        return {
            success: true,
            data: user
        }

    } catch (error) {
        console.log(error)

        return {
            success: false,
            data: []
        }
    }
}