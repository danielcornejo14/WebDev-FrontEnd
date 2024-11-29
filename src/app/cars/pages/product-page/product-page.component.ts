import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products/product';
import { NewReviewComponent } from "../../components/new-review/new-review.component";
import { PostedReviewComponent } from '../../components/posted-review/posted-review.component';
import { Review } from '../../models/products/review';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';

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
