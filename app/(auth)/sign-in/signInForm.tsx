"use client"

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const SignInForm = () => {

    const [email, setemail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        try {
            const response = await signIn(email, password)

            if (!response.user) {
                setError("invalid email or password")
            } else {
                router.push("/")
            }
        } catch (error) {
            setError("invalid email or password")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0b0c10] px-4">

            <div className="w-full max-w-md bg-white dark:bg-[#111217] shadow-lg rounded-2xl p-8">

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Sign in to continue shopping
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Inputs */}
                    <div className="space-y-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value)
                                setError("")
                            }}
                            placeholder="Email address"
                            className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setError("")
                            }}
                            placeholder="Password"
                            className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* Button */}
                    <Button
                        className="w-full text-white mt-1"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-2">
                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                    </div>
                </form>

                {/* Google Button */}
                <Button className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 border border-black">
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </Button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-5">
                    Don’t have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-black dark:text-white hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}