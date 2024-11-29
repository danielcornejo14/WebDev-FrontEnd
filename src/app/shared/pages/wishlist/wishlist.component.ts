import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../../cars/models/products/product';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  wishlistService: WishlistService = inject(WishlistService);

  products = this.wishlistService.loadWishlist();

  onRemove(product: Product): void {
    this.wishlistService.removeFromWishlist(product);
    this.products = this.wishlistService.loadWishlist();
  }

}
