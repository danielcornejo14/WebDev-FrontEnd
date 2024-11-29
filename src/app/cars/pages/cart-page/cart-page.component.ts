import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

import { Stock } from '../../models/products/stock';
import { Product } from '../../models/products/product';
import { Cart } from '../../models/cart/Cart';
import { CartItem } from '../../models/cart/cart-Item';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataViewModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})

export class CartPageComponent implements OnInit {
  cart: Cart = {} as Cart;
  productList: Product[] = [];
  total: number = 0;
  
  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.loadCartProducts();
    });
  }

  loadCartProducts(): void {
    
  }

  proceedToCheckout(): void {
    // Lógica para proceder al pago
    console.log('Proceder al pago');
  }

}