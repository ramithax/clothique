import { auth } from "@/lib/auth";
import SettingsForm from "./settingsForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user-actions";

export default async function SettingsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/")
    }

    const res = await getUserById(session.user.id)

    if (!res.success || !res.data) {
        return (
            <div className="p-6 text-red-500 text-center">
                Failed to load user
            </div>
        )
    }

    return <SettingsForm user={res.data as any} />
}