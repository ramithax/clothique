"use client"

import { Button } from "@/components/ui/button";
import { requestPasswordReset, verifyResetCode } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [codeSent, setCodeSent] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSendCode = async () => {

        setLoading(true)
        const toastId = toast.loading("Sending code...")

        try {

            const res = await requestPasswordReset(email)

            if (res.status === "success") {
                toast.success("Code sent successfully", { id: toastId })
                setCodeSent(true)
            } else {
                toast.error(res.message, { id: toastId })
            }

        } catch {
            toast.error("Something went wrong", { id: toastId })
        }
        finally {
            setLoading(false)
        }
    }


    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)

        try {

            const res = await verifyResetCode(email, code)

            if (res.status === "success") {
                toast.success("Code verified successfully")
                router.push(`/reset-password?email=${email}`)

            }
            else {
                toast.error("Invalid code")
            }

        } catch (error) {

            console.log(error)
            toast.error("Something went wrong")

        }
        finally {
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


                <div className="space-y-4">


                    <div className="flex gap-2 items-center">

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            disabled={codeSent}
                            required
                            className="flex-1 h-[42px] px-4 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                        <Button
                            type="button"
                            onClick={handleSendCode}
                            disabled={loading || codeSent}
                            className="h-[42px] px-4 text-white"
                        >
                            {loading ? "..." : "Send"}
                        </Button>

                    </div>



                    <form onSubmit={handleVerify} className="space-y-4">

                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Verification code"
                            disabled={!codeSent}
                            className="w-full h-[42px] px-4 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />


                        <Button
                            className="w-full h-[42px] text-white"
                            disabled={!codeSent}
                        >
                            Verify Code
                        </Button>

                    </form>


                </div>

            </div>

        </div>
    )
}