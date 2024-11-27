import { environment } from '../../../../environments/environment';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, map, of } from 'rxjs';
import { Product } from '../models/products/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.baserURL + '/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getProductById(id: number | string): Observable<Product> {
    console.log(id);
    if (!id) {
      throw Error('El id del producto es necesario');
    }
    const options = {params: {id: id.toString()}};
    return this.http.get<Product>(`${this.apiUrl}/getById`, options);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`); //Falta en el backend
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/deleteProduct/${id}`).pipe(
      map((resp) => true),
      catchError((error) => of(false))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    if (!product.id) {
      throw Error('El id del producto es necesario');
    }
    return this.http.patch<Product>(
      `${this.apiUrl}/updateProduct/${product.id}`,
      product
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/createProduct`, product);
  }
}
