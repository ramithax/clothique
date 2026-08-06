"use client"

import { Button } from "@/components/ui/button";
import { requestPasswordReset } from "@/lib/actions/auth-actions";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        const toastId = toast.loading("Sending reset link...")
        try {

            const res = await requestPasswordReset(email)

            if (res.status === "success") {
                toast.success(res.message, { id: toastId })
                window.location.href = `/reset-password?email=${email}`

            } else {
                toast.error(res.message, { id: toastId })
            }

        } catch (err) {

            toast.error("Something went wrong", {
                id: toastId,
            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0b0c10] px-4">

            <div className="w-full max-w-md bg-white dark:bg-[#111217] shadow-lg rounded-2xl p-8">

                <div className="text-center mb-6">

                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Forgot Password
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Enter your email to receive a reset code
                    </p>

                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        required
                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <Button className="w-full text-white" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Code"}
                    </Button>

                </form>

            </div>

        </div>
    )
}