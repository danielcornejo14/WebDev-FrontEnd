import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../services/cart.service';

import { Stock } from '../../models/products/stock';
import { Product } from '../../models/products/product';
import { Cart } from '../../models/cart/Cart';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})

export class CartPageComponent implements OnInit {
  cart: Cart[] = [];
  
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    debugger;
    this.cartService.getCart().subscribe(cart => {
      console.log(cart);
      
      
    });
  }

  proceedToCheckout(): void {
    // Lógica para proceder al pago
    console.log('Proceder al pago');
  }

}