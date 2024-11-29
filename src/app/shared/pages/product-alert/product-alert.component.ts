import { Component, inject } from '@angular/core';
import { Product } from '../../../cars/models/products/product';
import { ProductsService } from '../../../cars/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RestockDialogComponent } from '../../components/restock-dialog/restock-dialog.component';

@Component({
  selector: 'app-product-alert',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './product-alert.component.html',
  styleUrl: './product-alert.component.scss'
})
export class ProductAlertComponent {
  
  private productService:ProductsService = inject(ProductsService)
  private dialog: MatDialog = inject(MatDialog);

  public products: Product[] = [];




  ngOnInit(): void {
    this.productService.fetchUnstockedProducts().subscribe(products => {
      this.products = products;
    });
  }

  onRestock(product: Product): void {
    const dialogRef = this.dialog.open(RestockDialogComponent, {
      data: product
    }).afterClosed().subscribe((data) => {
      if (data){
        const { id, quantity } = data;
        this.productService.replenishStock(id, quantity).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

}
