"use client"

import { Card } from "./ui/card"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Carousel() {

    const images = [
        "/banner01.png",
        "/banner02.png",
        "/banner03.png",
    ]

    const extended = [...images, images[0]]

    const [current, setCurrent] = useState(0)
    const [enableTransition, setEnableTransition] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => prev + 1)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    // 🔥 handle infinite loop reset safely
    const handleTransitionEnd = () => {
        if (current >= images.length) {
            setEnableTransition(false)
            setCurrent(0)

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setEnableTransition(true)
                })
            })
        }
    }

    useEffect(() => {
        if (current > images.length) {
            setCurrent(0)
        }
    }, [current, images.length])

    return (
        <Card className="
            relative 
            w-full 
            h-[200px]
            sm:h-[300px]
            md:h-[400px]
            lg:h-[450px]
            overflow-hidden 
            rounded-3xl 
            border-none 
            shadow-xl 
            p-0
        ">

            <div
                onTransitionEnd={handleTransitionEnd}
                className={`flex h-full will-change-transform ${enableTransition ? "transition-transform duration-700 ease-in-out" : ""
                    }`}
                style={{
                    transform: `translateX(-${current * 100}%)`
                }}
            >
                {extended.map((img, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                        <Image
                            src={img}
                            alt={`slide-${index}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

        </Card>
    )
}