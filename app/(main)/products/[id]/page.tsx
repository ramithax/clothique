import { ProductDetail } from "@/components/product-details";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";


export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id }
    });

    if (!product) notFound();


    const session = await auth.api.getSession({
        headers: await headers()
    });


    return (
        <ProductDetail
            product={product}
            session={session}
        />
    );
}