export interface Review {
    productId: string | number; // ObjectId as string
    user: string; // ObjectId as string
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }