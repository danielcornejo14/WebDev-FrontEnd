import { Stock } from "../products/stock";

export interface Cart {
    userId: number;
    products: Stock[];
    createdAt: Date;
    updatedAt: Date;
}