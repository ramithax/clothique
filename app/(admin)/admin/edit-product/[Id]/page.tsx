import EditProductForm from "./edit-product-form"

export default async function EditProductPage({ params }: { params: Promise<{ Id: string }> }) {
    const resolvedParams = await params;

    return <EditProductForm id={resolvedParams.Id} />
}