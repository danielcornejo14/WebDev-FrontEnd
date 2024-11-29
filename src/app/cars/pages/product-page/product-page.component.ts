import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

import { Product } from '../../models/products/product';
import { Review } from '../../models/products/review';

import { NewReviewComponent } from "../../components/new-review/new-review.component";
import { PostedReviewComponent } from '../../components/posted-review/posted-review.component';

import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { ProductsService } from '../../services/products.service';

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

  protected isLoggedIn: boolean = false;
  protected userRole: string | null = null;
  protected reviews: Review[] = [];
  protected rating: number = 0;

  constructor(
    private router: ActivatedRoute,
    private routerLink: Router,
    private productService: ProductsService,
    private authService: AuthService,
    private reviewService: ReviewService

  ){}

  ngOnInit(): void {
    this.loadProduct();
    this.checkLogin();
  }

  checkLogin(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const userDetails = this.authService.getUserDetails();
      this.userRole = userDetails ? userDetails.role : null;
    }
  }

  loadProduct():void{
    const productId = this.router.snapshot.paramMap.get('id');
    if(productId){
      this.productService.getProductById(productId)
      .subscribe(product => {
        this.product = product
        this.loadReviews();
      });
    }
  }

  loadReviews(): void {
    this.reviewService.getReviewByProduct(this.product.id)
      .subscribe(reviews => {
        this.reviews = reviews;
        this.rating = this.reviews.length > 0 ? this.reviews.reduce((acc, review) => acc + review.rating, 0) / this.reviews.length : 0
      });
  }

  editProduct(){
    this.routerLink.navigate(['/home/modify-product', this.product.id]);
  }

  addToCart(): void {
    if (!this.isLoggedIn) {
      alert('Debes registrarte o iniciar sesión para agregar productos al carrito.');
    } else {
      // Lógica para agregar al carrito
      console.log('Producto agregado al carrito');
    }
  }


}
