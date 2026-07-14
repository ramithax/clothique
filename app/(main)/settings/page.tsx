import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function SettingsPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    return (
        <div>
            <h1 className="text-center font-semibold text-3xl">Settings</h1>


            <h1>{session?.user.name}</h1>
            <h1>{session?.user.email}</h1>
        </div>
    )
}