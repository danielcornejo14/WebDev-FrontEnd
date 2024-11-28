import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Category } from '../../models/products/category';


@Component({
  selector: 'app-sell-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './sell-page.component.html',
  styleUrl: './sell-page.component.scss'
})
export class SellPageComponent {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {
      this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      category: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return control ? control.invalid && control.touched : false;
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
          this.productsService.createProduct(newProduct).subscribe({
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
