import { Injectable } from '@angular/core';
import { Product } from '../../cars/models/products/product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  public loadWishlist(): Product[] {
    let wishlist: Product[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if(!wishlist) {
      localStorage.setItem('wishlist', JSON.stringify([]));
      wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    }
    return wishlist;
  }

  public saveWishlist(wishlist: Product[]): void {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  public addToWishlist(product: Product): void {
    const wishlist = this.loadWishlist();
    if(!wishlist.some((p) => p.id === product.id)) {
      wishlist.push(product);
    }
    this.saveWishlist(wishlist);
  }

  public removeFromWishlist(product: Product): void {
    const wishlist = this.loadWishlist();
    const index = wishlist.findIndex((p) => p.id === product.id);
    wishlist.splice(index, 1);
    this.saveWishlist(wishlist);
  }

  public clearWishlist(): void {
    this.saveWishlist([]);
  }

  public isInWishlist(product: Product): boolean {
    const wishlist = this.loadWishlist();
    return wishlist.some((p) => p.id === product.id);
  }

  public getWishlistCount(): number {
    return this.loadWishlist().length;
  }
}
