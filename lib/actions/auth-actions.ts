"use server"

import { headers } from "next/headers"
import { auth } from "../auth"

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

export const signOut = async () => {
    const response = await auth.api.signOut({
        headers: await headers()
    })
    return response
}