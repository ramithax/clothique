"use server"

import prisma from "@/lib/prisma"
import { isAdmin } from "../utils/session"

export async function getUsers() {
    try {

        const admin = await isAdmin()

        if (!admin) {
            return { success: false, message: "Not allowed" }
        }

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

        const admin = await isAdmin()

        if (!admin) {
            return { success: false, message: "Not allowed" }
        }

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


export async function updateUser(data: {
    id: string
    role: string
    emailVerified: boolean
}) {

    try {

        const admin = await isAdmin()

        if (!admin) {
            return { success: false, message: "Not allowed" }
        }

        const updated = await prisma.user.update({
            where: { id: data.id },
            data: {
                role: data.role,
                emailVerified: data.emailVerified
            }
        })

        if (!updated) {
            return {
                success: false,
                message: "Failed to update user"
            }
        }

        return {
            success: true,
            data: updated
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            message: "Failed to update user"
        }

    }
}

export async function deleteUser(id: string) {

    try {

        const admin = await isAdmin()

        if (!admin) {
            return { success: false, message: "Not allowed" }
        }

        const deleted = await prisma.user.delete({
            where: {
                id: id
            }
        })

        if (!deleted) {
            return {
                success: false,
                message: "Failed to delete user"
            }
        }

        return {
            success: true,
            data: deleted
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            message: "Failed to delete user"
        }

    }
}

