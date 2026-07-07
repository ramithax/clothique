import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe"
import Link from "next/link";

export default async function Home() {

  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 5,
  });

  console.log(products)

  return (
    <div>
      <section>

        <div>
          <div>
            <h2>Welcome to Clothique</h2>
            <p>Step into style with Clothique, your destination for premium fashion. Discover our latest collection of high-quality apparel and elevate your wardrobe today.</p>
          </div>

          <Button asChild variant="default">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>

      </section>
    </div>
  );
}
