"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { uploadImage } from "@/lib/utils/supabase"

export default function Test() {

    const [image, setImage] = useState<File | null>(null)

    const uploadFile = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!image) {
            console.log("No file selected")
            return
        }

        try {
            const url = await uploadImage(image)
            console.log("Uploaded URL:", url)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={uploadFile}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setImage(e.target.files[0])
                    }
                }}
            />

            <Button type="submit">Submit</Button>
        </form>
    )
}