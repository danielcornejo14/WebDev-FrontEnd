import { CartItem } from "./cart-Item";

export interface Cart {
    userId: number;
    products: CartItem[];
    name?: string;
    createdAt: Date;
    updatedAt: Date;
}