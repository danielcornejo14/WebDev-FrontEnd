export interface Stock {
    id: number | string;
    quantity: number;
    productId: number | string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}