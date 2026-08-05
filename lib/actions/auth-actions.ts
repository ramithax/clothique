"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"
import prisma from "../prisma"
import { randomInt } from "crypto"
import { transporter } from "../utils/mailsender"
import bcrypt from "bcryptjs"

export const signIn = async (email: string, password: string) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
                callbackURL: "/"
            },
            headers: await headers()
        })

        // success
        if (response?.user) {
            return { user: response.user }
        }

        // fallback (rare case)
        return {
            error: {
                message: "Invalid email or password",
                code: "UNKNOWN"
            }
        }

    } catch (error: any) {

        console.log("SIGN IN ERROR:", error)

        return {
            error: {
                message: error?.message || "Authentication failed",
                code: error?.code || "UNKNOWN"
            }
        }
    }
}

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: "/"
            },
            headers: await headers()
        })

        if (response?.user) {
            return { user: response.user }
        }

        return {
            error: {
                message: "Signup failed",
                code: "UNKNOWN"
            }
        }

    } catch (error: any) {

        console.log("SIGN UP ERROR:", error)

        return {
            error: {
                message: error?.message || "Signup failed",
                code: error?.code || "UNKNOWN"
            }
        }
    }
}

export const socialSignUp = async (provider: string) => {
    const { url } = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: "/"
        },
        headers: await headers()
    })
    if (url) {
        redirect(url)
    }
}

export const signOut = async () => {
    const response = await auth.api.signOut({
        headers: await headers()
    })
    return response
}

export const requestPasswordReset = async (email: string) => {

    try {

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return {
                success: false,
                message: "User not found"
            }
        }

        const code = randomInt(10000, 99999).toString()

        await prisma.verification.deleteMany({
            where: {
                identifier: email
            }
        })

        await prisma.verification.create({
            data: {
                id: crypto.randomUUID(),
                identifier: email,
                value: code,
                expiresAt: new Date(Date.now() + 1000 * 60 * 10)
            }
        })

        await transporter.sendMail({
            from: `"Clothique" <${process.env.EMAIL}>`,
            to: email,
            subject: "Reset Your Password",
            html: `
                <h2>Password Reset Request</h2>
                <p>Your verification code is:</p>
                <h1>${code}</h1>
                <p>This code will expire in 10 minutes.</p>
            `
        })

        return {
            status: "success",
            message: "Reset code sent successfully"
        }
    } catch (error) {

        console.log(error)

        return {
            status: "error",
            message: "Failed to send reset code"
        }
    }
}


export const verifyResetCode = async (email: string, code: string) => {

    try {

        const record = await prisma.verification.findFirst({
            where: {
                identifier: email,
                value: code
            }
        })

        if (!record) {
            return {
                status: "error",
                message: "Invalid or expired code"
            }
        }

        if (record.expiresAt < new Date()) {
            return {
                status: "error",
                message: "Code expired"
            }
        }

        await prisma.verification.delete({
            where: {
                id: record.id
            }
        })

        return {
            status: "success",
            message: "Code verified successfully"
        }

    } catch (error) {

        console.log(error)
        return {
            status: "error",
            message: "Failed to verify code"
        }
    }
}

export const resetPassword = async (email: string, code: string, newPassword: string) => {

    try {

        const record = await prisma.verification.findFirst({
            where: {
                identifier: email,
                value: code
            }
        })

        if (!record) {
            return {
                status: "error",
                message: "Invalid or expired code"
            }
        }

        if (record.expiresAt < new Date()) {
            return {
                status: "error",
                message: "Code expired"
            }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.account.updateMany({
            where: {
                user: { email }
            },
            data: {
                password: hashedPassword
            }
        })

        await prisma.verification.deleteMany({
            where: { identifier: email }
        })

        return { success: true }

    } catch (error) {
        console.log(error)
        return {
            status: "error",
            message: "Failed to verify code"
        }
    }
}
