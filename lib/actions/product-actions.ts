"use server";

import prisma from "@/lib/prisma";

export async function createProduct(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price"));
        const labeledPrice = Number(formData.get("labeledPrice"));
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
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: error.message || "Failed to create product",
        };
    }
}


export async function getProducts(options?: {
    includeUnavailable?: boolean
}) {
    const includeUnavailable = options?.includeUnavailable ?? false

    try {
        const products = await prisma.product.findMany({
            where: includeUnavailable
                ? {}
                : { isAvailable: true },
            orderBy: {
                createdAt: "desc"
            }
        })

        return { success: true, data: products }

    } catch (error) {
        return { success: false, message: "Failed to fetch products" }
    }
}

export async function getProductById(id: string) {

    try {

        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        return {
            success: true,
            data: product,
            message: "Product fetched successfully"
        }

    } catch (error) {
        console.log(error)

        return {
            success: false,
            data: null,
            message: "Failed to fetch product"
        }
    }
}


export async function editProduct(id: string, formData: FormData) {

    try {
        const updated = await prisma.product.update({
            where: { id },
            data: {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                labeledPrice: Number(formData.get("labeledPrice")),
                images: JSON.parse(formData.get("images") as string),
                category: formData.get("category") as string,
                stock: Number(formData.get("stock")),
                brand: formData.get("brand") as string,
                isAvailable: formData.get("isAvailable") === "true",
            }
        })

        return { success: true, message: "Product updated" }

    } catch (error) {
        console.log(error)

        return {
            success: false,
            message: "Failed to update product"
        }
    }
}

export async function deleteProduct(id: string) {

    try {

        const product = await prisma.product.delete({
            where: {
                id: id
            }
        })

        return {
            success: true,
            message: "Product deleted successfully"
        }

    } catch (error) {

        console.log(error)

        return {
            success: false,
            message: "Failed to delete product"
        }
    }

}