import { error } from "console";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function requiredAdmin() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        throw new Error("Unauthorized")
    }

    return session
}