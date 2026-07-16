export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    labeledPrice: number;
    stock: number;
    category: string;
    brand: string;
    isAvailable: boolean;
    images: string[];
}