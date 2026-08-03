"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordPage() {

    const params = useSearchParams()
    const token = params.get("token")

    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirm) {
            return toast.error("Passwords do not match")
        }

        setLoading(true)
        const toastId = toast.loading("Updating password...")

        try {
            // TODO: call backend with token + password

            toast.success("Password updated successfully", {
                id: toastId,
            })

        } catch (err) {

            toast.error("Invalid or expired link", {
                id: toastId,
            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0b0c10] px-4">

            <div className="w-full max-w-md bg-white dark:bg-[#111217] shadow-lg rounded-2xl p-8">

                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                    Reset Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="password"
                        placeholder="New password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700"
                    />

                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700"
                    />

                    <Button className="w-full text-white" disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </Button>

                </form>

            </div>

        </div>
    )
}