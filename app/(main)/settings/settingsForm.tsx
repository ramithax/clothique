type User = {
    id: string
    name: string
    email: string
    createdAt: string
    updatedAt: string
    emailVerified: boolean
}

export default function SettingsForm({ user }: { user: User }) {
    return (
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <p className="text-sm text-gray-500 mb-6">Manage your account</p>

            {/* Avatar Card */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center mb-6">

                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold text-gray-700">
                    {user.name?.charAt(0).toUpperCase()}
                </div>

                <p className="mt-4 font-medium text-gray-800">
                    {user.name}
                </p>

                <p className="text-sm text-gray-500">
                    {user.email}
                </p>

            </div>


            <div className="space-y-4">

                {/* Info */}
                <section className="bg-white rounded-xl shadow p-5">
                    <h2 className="font-semibold mb-3">Account Info</h2>

                    <div className="grid grid-cols-2 gap-4">
                        <input className="border rounded-lg px-3 py-2" value={user.name} readOnly />
                        <input className="border rounded-lg px-3 py-2" value={user.email} readOnly />
                    </div>
                </section>


                {/* Email status */}
                <section className="bg-white rounded-xl shadow p-5">
                    <h2 className="font-semibold mb-3">Email Status</h2>

                    <div className="flex items-center justify-between border rounded-lg px-4 py-3">
                        <span className="text-sm text-gray-600">Verification</span>

                        <span className={`text-sm font-medium ${user.emailVerified ? "text-green-600" : "text-red-500"
                            }`}>
                            {user.emailVerified ? "Verified" : "Not Verified"}
                        </span>
                    </div>
                </section>


                {/* Preferences */}
                <section className="bg-white rounded-xl shadow p-5">
                    <h2 className="font-semibold mb-3">Preferences</h2>

                    <div className="flex justify-between items-center border rounded-lg px-4 py-3">
                        <div>
                            <p className="font-medium text-sm">Currency</p>
                            <p className="text-xs text-gray-500">Default currency</p>
                        </div>

                        <select className="border rounded-lg px-3 py-1.5 text-sm">
                            <option>USD</option>
                            <option>LKR</option>
                        </select>
                    </div>
                </section>


                {/* Account */}
                <section className="bg-white rounded-xl shadow p-5">
                    <h2 className="font-semibold mb-3">Account</h2>

                    <button className="border rounded-lg px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Change Password
                    </button>
                </section>

            </div>

        </div>
    )
}