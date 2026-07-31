"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

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

