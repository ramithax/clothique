"use client"

import { updateUser } from "@/lib/actions/user-actions"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

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

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const router = useRouter()

    function handleView(user: User) {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    async function hanldeOnSubmit() {

        if (!selectedUser) {
            toast.error("Please select a user")
            return
        }

        try {

            const res = await updateUser({
                id: selectedUser.id,
                role: selectedUser.role as "ADMIN" | "USER",
                emailVerified: selectedUser.emailVerified
            })

            if (!res.success) {
                toast.success("User updated successfully")
                setIsModalOpen(false)
                setSelectedUser(null)
                router.refresh()
                return
            }

            toast.error("Failed to update user")
            setIsModalOpen(false)
            setSelectedUser(null)

        } catch (error) {

            console.log(error)
            toast.error("Failed to update user")
            setIsModalOpen(false)
            setSelectedUser(null)
        }

    }



    return (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">

            {
                users.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                        No users found
                    </div>
                ) : (

                    <table className="w-full text-sm text-left min-w-[700px]">

                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-4 md:px-6 py-3">Name</th>
                                <th className="px-4 md:px-6 py-3">Email</th>
                                <th className="px-4 md:px-6 py-3">Email Verified</th>
                                <th className="px-4 md:px-6 py-3">Role</th>
                                <th className="px-4 md:px-6 py-3">Date</th>
                                <th className="px-4 md:px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                users.map(user => (
                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 md:px-6 py-4 font-medium text-gray-800">
                                            {user.name}
                                        </td>

                                        <td className="px-4 md:px-6 py-4 break-all text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <span
                                                className={`text-xs font-medium ${user.emailVerified
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                                    }`}
                                            >
                                                {user.emailVerified ? "Verified" : "Not Verified"}
                                            </span>
                                        </td>

                                        <td className="px-4 md:px-6 py-4">
                                            <span
                                                className={
                                                    user.role === "ADMIN"
                                                        ? "text-green-600 font-semibold"
                                                        : "text-gray-500"
                                                }
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="px-4 md:px-6 py-4 text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-4 md:px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleView(user)}
                                                className="text-black hover:text-blue-800 transition"
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

            {
                isModalOpen && selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">

                            <h2 className="text-lg font-semibold mb-4">
                                Update User
                            </h2>

                            <div className="space-y-4">

                                {/* Email */}
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium text-gray-800 break-all">
                                        {selectedUser.email}
                                    </p>
                                </div>

                                {/* Email Verified Toggle */}
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">
                                        Email Verified
                                    </span>

                                    <button
                                        onClick={() =>
                                            setSelectedUser(prev =>
                                                prev
                                                    ? {
                                                        ...prev,
                                                        emailVerified: !prev.emailVerified
                                                    }
                                                    : null
                                            )
                                        }
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser.emailVerified
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-500"
                                            }`}
                                    >
                                        {selectedUser.emailVerified ? "Verified" : "Not Verified"}
                                    </button>
                                </div>

                                {/* Role Select */}
                                <div>
                                    <label className="text-sm text-gray-700">
                                        Role
                                    </label>

                                    <select
                                        value={selectedUser.role}
                                        onChange={(e) =>
                                            setSelectedUser(prev =>
                                                prev
                                                    ? { ...prev, role: e.target.value }
                                                    : null
                                            )
                                        }
                                        className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
                                    >
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-2 mt-6">

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => hanldeOnSubmit()}
                                    className="px-4 py-2 bg-black text-white text-sm rounded-md hover:cursor-pointer hover:bg-gray-800"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}