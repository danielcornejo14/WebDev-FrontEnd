import { MatCardModule } from '@angular/material/card';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Product } from '../../models/products/product';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-card',
  standalone: true,
  imports: [
    CardModule, 
    MatCardModule,
    RatingModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './featured-card.component.html',
  styleUrl: './featured-card.component.scss'
})
export class FeaturedCardComponent {

  constructor(private router: Router) { }
  
  @Input()
  public product!: Product;

  value: number = 0;

  ngOnInit(): void {
    if(!this.product){
      throw new Error('Product is required');
    }
    
    this.value = this.product.rating;
  }
  
  navigateToProduct(): void {
    this.router.navigate(['/home/product-list', this.product.id]);
  }
}
