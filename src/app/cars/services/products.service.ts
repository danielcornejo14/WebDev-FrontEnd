import { environment } from '../../../../environments/environment';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, map,of } from 'rxjs';
import { Product } from '../models/products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.baserURL;
  
  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    if(!id){
      throw Error ('El id del producto es necesario');
    }
      return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/category/${category}`);
  }

  deleteProduct(id: number): Observable<boolean> {
    const headers = this.createAuthHeaders();
    return this.http.delete<boolean>(`${this.apiUrl}/product/deleteProduct/${id}`, { headers })
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    if (!product.id) {
      throw Error('El id del producto es necesario');
    }
    const headers = this.createAuthHeaders();
    return this.http.patch<Product>(`${this.apiUrl}/product/updateProduct/${product.id}`, product, { headers });
  }

  createProduct(product: Product): Observable<Product> {
    const headers = this.createAuthHeaders();
    return this.http.post<Product>(`${this.apiUrl}/product/createProduct`, product, { headers });
  }
 
}