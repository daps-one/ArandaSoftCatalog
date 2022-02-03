import { Category } from "./category.interface";

export interface Product {
    productId: number;
    name: string;
    description: string;
    image: string;
    status: boolean;
    category: Category
}