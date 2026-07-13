"use client"

import { Button } from "@/components/ui/button";
import { signUp, socialSignUp } from "@/lib/actions/auth-actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const SignUpForm = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        const toastId = toast.loading("Creating account...")

        try {
            setIsLoading(true)

            const response = await signUp(username, email, password)

            if (!response.user) {

                toast.error("Failed to create account", {
                    id: toastId,
                })

            } else {

                toast.success("Account created successfully", {
                    id: toastId,
                })

                router.push("/")
            }

        } catch (error) {

            console.log(error)

            toast.error("Something went wrong. Please try again.", {
                id: toastId,
            })

        } finally {

            setIsLoading(false)

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0b0c10] px-4">

            <div className="w-full max-w-md bg-white dark:bg-[#111217] shadow-lg rounded-2xl p-8">

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Create an Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Join us and start shopping now
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Inputs */}
                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <Button
                        className="w-full text-white mt-2"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-2">
                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                        <span className="text-xs text-gray-400">OR</span>
                        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                    </div>
                </form>

                {/* Google Button */}
                <Button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 border border-black"
                    onClick={() => socialSignUp("google")}>
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </Button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500 mt-5">
                    Already have an account?{" "}
                    <Link
                        href="/sign-in"
                        className="text-black dark:text-white hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}