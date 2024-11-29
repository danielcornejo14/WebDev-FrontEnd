import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/products/product';


@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input() cartItems: { product: Product, quantity: number }[] = [];
  @Input() tax: number = 5;
  @Input() total: number = this.tax;
  @Output() proceedToShipping = new EventEmitter<void>();

  onProceedToShipping(): void {
    if (this.cartItems.length > 0) {
      this.proceedToShipping.emit();
    }
    else {
      alert('No hay productos en el carrito');
    }
  }
}