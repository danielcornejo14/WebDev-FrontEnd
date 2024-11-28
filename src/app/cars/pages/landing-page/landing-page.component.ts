import { Component, HostListener, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { FeaturedCardComponent } from '../../components/featured-card/featured-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/products/category';
import { ButtonModule } from 'primeng/button';
import { DiscountCardComponent } from "../../components/discount-card/discount-card.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CategoryCardComponent,
    FeaturedCardComponent,
    DiscountCardComponent,
    MatDividerModule,
    CarouselModule,
    ButtonModule
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  public products: Product[] = [];
  public categories: Category[] = [];
  public numVisible: number = 3;

  constructor(
    private productsService: ProductsService, 
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategorySelected(category: Category): void {
    this.router.navigate(['/home/product-list'], { queryParams: { category: category.name } });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCarouselItems(event.target.innerWidth);
  }

  updateCarouselItems(width: number): void {
    if (width <= 768) { 
      this.numVisible = 1;
    } else {
      this.numVisible = 3;
    }
  }
  
}
