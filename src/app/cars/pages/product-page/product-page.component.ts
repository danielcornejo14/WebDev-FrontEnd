import { Component } from '@angular/core';
import { Product } from '../../models/products/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NewReviewComponent } from "../../components/new-review/new-review.component";
import { PostedReviewComponent } from '../../components/posted-review/posted-review.component';


@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    RatingModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    NewReviewComponent,
    PostedReviewComponent
],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  product!: Product;

  reviews = [
    { rating: 5, comment: 'Great product!', user: 'User1' },
    { rating: 4, comment: 'Very good, but could be improved.', user: 'User2' },
    { rating: 3, comment: 'Average product.', user: 'User3' },
  ];

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

  //TODO: Verificar Login para agregar review y carrito
}
