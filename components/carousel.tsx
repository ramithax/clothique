"use client"

import { Card } from "./ui/card"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Carousel() {

    const images = [
        "/banner1.png",
        "/banner4.png",
        "/banner3.png",
    ]

    const [current, setCurrent] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [images.length])

    return (
        <Card className="group relative w-[1100px] h-[450px] overflow-hidden rounded-3xl border-none shadow-xl p-0">

            <div className="relative w-full h-full">
                <Image
                    src={images[current]}
                    alt="carousel image"
                    fill
                    priority
                    className="object-cover "
                />
            </div>

        </Card>
    )
}