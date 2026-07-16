import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="flex min-h-[70vh] items-center py-6 sm:py-10">

        <div className="mx-auto flex w-full max-w-6xl items-center rounded-3xl bg-neutral-100 px-6 py-10 sm:px-12">

          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">

            {/* Left Content */}
            <div className="space-y-5 text-center md:text-left">

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Welcome to Clothique
              </h1>

              <p className="mx-auto max-w-md text-neutral-600 md:mx-0">
                Step into style with Clothique, your destination for premium
                fashion. Discover our latest collection of high-quality apparel
                and elevate your wardrobe today.
              </p>

              <Button
                asChild
                className="rounded-full bg-black px-8 py-6 text-white transition-transform hover:bg-neutral-800 hover:scale-110"
              >
                <Link href="/products">
                  Shop Now
                </Link>
              </Button>

            </div>


            {/* Right Image */}
            <div className="flex items-center justify-center overflow-hidden">

              <Image
                src="/t-shirt.png"
                alt="Hoodie"
                width={900}
                height={900}
                className="
                  w-[250px]
                  sm:w-[320px]
                  md:w-[390px]
                  object-contain
                  scale-130
                "
              />

            </div>

          </div>

        </div>

      </section>


      {/* Carousel Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-10">
        <Carousel />
      </section>

    </main>
  );
}