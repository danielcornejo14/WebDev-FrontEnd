import { SliderModule } from 'primeng/slider';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products/product';
import { Category } from '../../models/products/category';
import { MatDividerModule } from '@angular/material/divider';
import { FeaturedCardComponent } from '../../components/featured-card/featured-card.component';
import { CategoriesService } from '../../services/categories.service';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    FeaturedCardComponent,
    SliderModule,
    CheckboxModule,
    RatingModule
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  priceRange: number[] = [0, 1000];
  categories: Category[] = [];
  selectedCategories: string[] = [];
  maxPrice: number = 0;
  selectedRating: number = 5;

  //TODO:Implementar Brands Filtering
  brands: string[] = [];
  selectedBrands: string[] = [];

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  getMaxPrice(): number {
    return Math.ceil(Math.max(...this.products.map(product => product.price)));
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.activeRoute.queryParams.subscribe(params => {
      const categoryName = params['category'];
      if (categoryName) {
        this.selectCategory(categoryName);
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      this.maxPrice = this.getMaxPrice() + 1000;
      this.priceRange = [0, this.maxPrice];
      this.filterProducts(); // Filtrar productos después de cargar
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories.map(category => ({
        ...category,
        selected: false
      }));
      this.activeRoute.queryParams.subscribe(params => {
        const categoryName = params['category'];
        if (categoryName) {
          this.selectCategory(categoryName);
        }
      });
    });
  }

  selectCategory(categoryName: string): void {
    const category = this.categories.find(cat => cat.name === categoryName);
    if (category) {
      category.selected = true;
      if (!this.selectedCategories.includes(category.name)) {
        this.selectedCategories.push(category.name);
      }
    }
    this.filterProducts();
  }

  onPriceChange(event: any): void {
    this.filterProducts();
  }

  onCategoryChange(category: Category): void {
    if (category.selected) {
      this.selectedCategories.push(category.name);
    } else {
      const index = this.selectedCategories.indexOf(category.name);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.filterProducts();
  }

  onRatingChange(event: any): void {
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesPrice = product.price >= this.priceRange[0] && product.price <= this.priceRange[1];
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category.name);
      const matchesRating = product.rating <= this.selectedRating;
      return matchesPrice && matchesCategory && matchesRating;
    });
  }
}