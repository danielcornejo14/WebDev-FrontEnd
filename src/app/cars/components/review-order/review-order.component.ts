import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../models/products/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-order',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './review-order.component.html',
  styleUrl: './review-order.component.scss'
})
export class ReviewOrderComponent {
  
  @Input() cartItems: { product: Product, quantity: number }[] = [];
  @Input() tax: number = 0;
  @Input() total: number = 0;
  @Input() shipping!: FormGroup;
  @Input() payment!: FormGroup;

  

}
