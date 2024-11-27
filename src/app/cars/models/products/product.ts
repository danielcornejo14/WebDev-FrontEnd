import { Category } from "./category";


export interface Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}


