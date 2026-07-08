import Carousel from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 8,
  });

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="flex min-h-[60vh] items-center py-10">

        <div className="mx-auto flex h-[50vh] w-full max-w-6xl items-center rounded-3xl bg-neutral-100 px-8 sm:px-12">

          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">

            {/* Left Content */}
            <div className="space-y-5">

              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Welcome to Clothique
              </h1>

              <p className="max-w-md text-neutral-600">
                Step into style with Clothique, your destination for premium fashion.
                Discover our latest collection of high-quality apparel and elevate
                your wardrobe today.
              </p>

              <Button asChild className="rounded-full bg-black px-8 py-6 text-white hover:bg-neutral-800 hover:cursor-pointer hover:scale-110">
                <Link href="/products">
                  Shop Now
                </Link>
              </Button>

            </div>


            {/* Right Image */}
            <div className="flex h-full items-center justify-center overflow-hidden mb-8">

              <Image
                src={products.data[7].images[0]}
                alt="Hoodie"
                width={900}
                height={900}
                className="h-auto w-[390px] object-contain scale-110"
              />

            </div>

          </div>

        </div>

      </section>


      {/* Carousel Section */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <Carousel />
      </section>

    </main>
  );
}