import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY!

const supabase = createClient(url, key)

export async function uploadImage(file: File) {
    if (!file) throw new Error("No image file")

    const filename = `${Date.now()}_${file.name}`

    const { error } = await supabase.storage
        .from("clothique")
        .upload(filename, file)

    if (error) throw new Error(error.message)

    const { data } = supabase.storage
        .from("clothique")
        .getPublicUrl(filename)

    return data.publicUrl
}