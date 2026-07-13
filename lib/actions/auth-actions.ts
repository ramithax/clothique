"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const signIn = async (email: string, password: string) => {
    const response = await auth.api.signInEmail({
        body: {
            email,
            password,
            callbackURL: "/"
        },
        headers: await headers()
    })
    return response
}

export const signUp = async (name: string, email: string, password: string) => {
    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            callbackURL: "/"
        },
        headers: await headers()
    })
    return response
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

