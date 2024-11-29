import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../cars/services/products.service';
import { Product } from '../../cars/models/products/product';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './form-products.component.html',
  styleUrl: './form-products.component.scss',
})
export class FormProductsComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    brand: '',
    description: '',
    price: 0,
    image: '',
    category: { id: 0, name: '', subcategories: [] },
    rating: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  @Output() saveProduct = new EventEmitter<Product>();
  @Output() close = new EventEmitter<void>();

  showForm: boolean = true;

  openForm(product?: Product): void {
    this.product = product || {
      id: 0,
      name: '',
      brand: '',
      description: '',
      price: 0,
      image: '',
      category: { id: 0, name: '', subcategories: [] },
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.showForm = true;
  }

  closeModal(): void {
    this.showForm = false;
    this.close.emit();
  }

  submitForm(): void {
    this.saveProduct.emit(this.product);
    this.closeModal();
  }
}
