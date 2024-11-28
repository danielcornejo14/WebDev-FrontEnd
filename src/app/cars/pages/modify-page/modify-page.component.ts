import { Component, Input } from '@angular/core';
import { Product } from '../../models/products/product';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/products/category';

@Component({
  selector: 'app-modify-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modify-page.component.html',
  styleUrl: './modify-page.component.scss'
})
export class ModifyPageComponent {
  
  @Input() 
  product!: Product;
  categories: Category[] = [];
  productForm: FormGroup;

  ngOnInit(): void {
    loadCategories();
  }

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) {
      this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

  clearInvalidFields() {
    Object.keys(this.productForm.controls).forEach(field => {
      const control = this.productForm.get(field);
      if (control && control.invalid) {
        control.setValue('');
      }
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;
      this.productsService.updateProduct(newProduct).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => console.error('Error al crear el producto', err)
      });

      console.log(this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
      this.clearInvalidFields();
      console.log('Formulario inválido');
    }
  }

}
