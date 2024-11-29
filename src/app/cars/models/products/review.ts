import { User } from '../users/user';

export interface Review {
    productId: string | number;
    user: User;
    rating: number;
    comment?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }