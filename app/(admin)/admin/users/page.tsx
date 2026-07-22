import { getUsers } from "@/lib/actions/user-actions"
import UserTable from "./user-table"

export default async function UsersPage() {

    const res = await getUsers()

    if (!res.success) {
        return (
            <div className="p-6 text-red-500 text-center">
                Failed to load users
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6">

            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Users
                </h1>
            </div>

            <UserTable users={res.data || []} />

        </div>
    )
}