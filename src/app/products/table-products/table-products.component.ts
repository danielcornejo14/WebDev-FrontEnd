import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../cars/services/products.service';
import { Product } from '../../cars/models/products/product';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-products.component.html',
  styleUrl: './table-products.component.scss'
})

export class TableProductsComponent {
  @Input() products: Product[] = [];
  @Output() editProduct = new EventEmitter<Product>();
  @Output() deleteProduct = new EventEmitter<number | string>();

  onEditProduct(product: Product): void {
    this.editProduct.emit(product);
  }

  onDeleteProduct(id: number | string): void {
    this.deleteProduct.emit(id);
  }
}
