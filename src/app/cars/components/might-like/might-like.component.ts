import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products/product';
import { CarouselModule } from 'primeng/carousel';
import { FeaturedCardComponent } from "../featured-card/featured-card.component";

import { Router } from '@angular/router';



@Component({
  selector: 'app-might-like',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    FeaturedCardComponent
],
  templateUrl: './might-like.component.html',
  styleUrl: './might-like.component.scss'
})
export class MightLikeComponent implements OnInit {

  @Input() categoryName!:string;
  products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProductsByCategory(this.categoryName).subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }


}
