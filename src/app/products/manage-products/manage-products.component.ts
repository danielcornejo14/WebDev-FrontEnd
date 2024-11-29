
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../cars/services/products.service';
import { Product } from '../../cars/models/products/product';
import { TableProductsComponent } from "../table-products/table-products.component";
import { FormProductsComponent } from "../form-products/form-products.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [TableProductsComponent, CommonModule, FormsModule, RouterModule, FormProductsComponent],
  templateUrl: './manage-products.component.html',
  styleUrl: './manage-products.component.scss'
})
export class ManageProductsComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedProduct: Product | null = null;
  showForm: boolean = false;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  closeForm(): void {
    this.selectedProduct = null;
  }

  editProduct(product: Product): void {
    console.log('product', product);
    this.selectedProduct = product;
  }

  deleteProduct(id: number | string): void {
    this.productsService.deleteProduct(id).subscribe(success => {
      if (success) {
        this.products = this.products.filter(product => product.id !== id);
        this.filteredProducts = [...this.products];
      }
    });
  }

  saveProduct(product: Product): void {
    if (product.id) {
      this.productsService.updateProduct(product).subscribe(updatedProduct => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
        this.filteredProducts = [...this.products];
      });
    } else {
      this.productsService.createProduct(product).subscribe(newProduct => {
        this.products.push(newProduct);
        this.filteredProducts = [...this.products];
      });
    }
    this.closeForm();
  }

  ngOnChanges(value:string): void {
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(value.toLowerCase())
    );
  }

}
