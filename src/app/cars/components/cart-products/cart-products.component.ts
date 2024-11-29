import { Component, Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/products/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,

  ],
  templateUrl: './cart-products.component.html',
  styleUrl: './cart-products.component.scss'
})
export class CartProductsComponent {

  @Input() 
  product!: Product;

  @Output()
  removeProduct = new EventEmitter<string | number>();

  constructor(private cartService: CartService) { }
  deleteProductFromCart(productId: string | number): void {
    this.removeProduct.emit(productId);
  }

}
