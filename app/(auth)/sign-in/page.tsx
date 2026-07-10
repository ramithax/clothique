import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0b0c10] px-4">

            <div className="w-full max-w-md bg-white dark:bg-[#111217] shadow-lg rounded-2xl p-8 space-y-6">

                {/* Title */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Sign in to continue shopping
                    </p>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-[#1a1b20] border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Sign In Button */}
                <Button className="w-full text-white">
                    Sign In
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                    <span className="text-xs text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Google Button */}
                <Button
                    className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-900 border border-black"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="google"
                        className="w-5 h-5"
                    />
                    Continue with Google
                </Button>

                {/* Footer */}
                <p className="text-sm text-center text-gray-500">
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