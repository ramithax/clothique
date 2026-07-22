"use client"

import { Eye } from "lucide-react"

type User = {
    id: string
    name: string
    email: string
    role: string
    createdAt: Date
    emailVerified: boolean
}

export default function UserTable({
    users
}: {
    users: User[]
}) {

    function handleView(user: User) {
        console.log(user)
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">

            {
                users.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No users found
                    </div>
                ) : (

                    <table className="w-full text-sm text-left">

                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Email Verified</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map(user => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            {user.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {user.emailVerified ? "Verified" : "Not Verified"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={
                                                user.role === "ADMIN"
                                                    ? "text-green-600 font-medium"
                                                    : "text-gray-500"
                                            }>
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleView(user)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                )
            }

        </div>
    )
}