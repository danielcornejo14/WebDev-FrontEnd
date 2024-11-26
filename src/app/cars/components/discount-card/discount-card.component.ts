import { Product } from './../../models/products/product';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discount-card',
  standalone: true,
  imports: [CardModule],
  templateUrl: './discount-card.component.html',
  styleUrl: './discount-card.component.scss'
})
export class DiscountCardComponent {
  
  constructor(private router: Router) { }
  
  @Input()
  public product!: Product;

  ngOnInit(): void {
    if(!this.product){
      throw new Error('Product is required');
    }
  }

  navigateToProduct(): void {
    this.router.navigate(['/home/product-list', this.product.id]);
  }

}
