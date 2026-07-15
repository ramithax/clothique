"use server";

import prisma from "@/lib/prisma";

export async function createProduct(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price"));
        const labeledPrice = formData.get("labeledPrice") as string;
        const images = JSON.parse(formData.get("images") as string) as string[];
        const category = formData.get("category") as string;
        const stock = Number(formData.get("stock"));
        const brand = formData.get("brand") as string;
        const isAvailable =
            formData.get("isAvailable") === "true" ||
            formData.get("isAvailable") === "on";


        if (
            !name || !description || isNaN(price) || !labeledPrice || !category || isNaN(stock) || !brand || images.length === 0
        ) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                labeledPrice,
                images,
                category,
                stock,
                brand,
                isAvailable: stock > 0,
            },
        });

        return {
            success: true,
            message: "Product created successfully",
            product,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to create product",
        };
    }
}