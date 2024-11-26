import { Component } from '@angular/core';
import { Product } from '../../models/products/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    RatingModule,
    CommonModule,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  product!: Product;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductsService,
  ){}

  ngOnInit(): void {
    const productId = this.router.snapshot.paramMap.get('id');

    if(productId){
      this.productService.getProductById(Number(productId))
      .subscribe(product => this.product = product);
    }
  }
}
