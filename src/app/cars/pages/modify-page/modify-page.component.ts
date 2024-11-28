import { Component, Input } from '@angular/core';
import { Product } from '../../models/products/product';
import { FormsModule,FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/products/category';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  
  
  product: Product = {} as Product;
  categories: Category[] = [];
  productForm: FormGroup;

  ngOnInit(): void {
    this.loadCategories();
    this.getProduct();
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private categoriesService: CategoriesService,
    public dialog: MatDialog
  ) 
{
      this.productForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  getProduct(): void {
    const productId = this.activeRouter.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
        const selectedCategory = this.categories.find(category => category.id === product.category.id);
        this.productForm.patchValue({
          name: product.name,
          brand: product.brand,
          description: product.description,
          price: product.price,
          image: product.image,
          category: selectedCategory
        });
      });
    }
  }

  
  isFieldInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return control ? control.invalid && control.touched : false;
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
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

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      console.log('Producto actualizado', updatedProduct); 
      this.productService.updateProduct(updatedProduct).subscribe({
        next: (product) => {
          this.router.navigate(['/home'])
        },
        error: (err) => console.error('Error al Actualizar el producto', err)
      });

    } 
    else {
      this.productForm.markAllAsTouched();
      this.clearInvalidFields();
      console.log('Formulario inválido');
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.product) {
          this.productService.deleteProduct(this.product.id).subscribe({
            next: () => {
              console.log('Producto eliminado');
              this.router.navigate(['/home']);
            },
            error: (err) => console.error('Error al eliminar el producto', err)
          });
        }
      }
    });
  }
}
