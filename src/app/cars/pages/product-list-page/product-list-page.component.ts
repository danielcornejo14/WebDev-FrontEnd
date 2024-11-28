import { SliderModule } from 'primeng/slider';
import { Component, OnInit } from '@angular/core';
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

export class ProductListPageComponent implements OnInit {
  
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
  


  constructor(private productsService: ProductsService, private categoryService: CategoriesService) {}

  
  getMaxPrice(): number {
    return Math.ceil(Math.max(...this.products.map(product => product.price))) ;
  }

// Cargar productos y categorias

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      //Cargar Productos
      this.products = products;
      this.filteredProducts = products;
      //Obtener el precio maximo
      this.maxPrice = this.getMaxPrice()+1000;
      //Ajustar el rango del slider para que inicie de minimo a maximo
      this.priceRange = [0, this.maxPrice];
    });
  }
  
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      console.log(categories);
      this.categories = categories.map(category => ({
        ...category,
        selected: false
      }));
    });
  }


// Opciones de filtros

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
    const products = this.filteredProducts = this.products.filter(product => {
      
      const matchesPrice = product.price >= this.priceRange[0] && product.price <= this.priceRange[1];
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(product.category.name);
      const matchesRating = product.rating <= this.selectedRating;
      return matchesPrice && matchesCategory;

    });
  }
}