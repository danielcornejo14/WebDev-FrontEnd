import { environment } from '../../../../environments/environment';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, map, of } from 'rxjs';
import { Product } from '../models/products/product';
import { Category } from '../models/products/category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = environment.baserURL + '/product';
  
  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`
    });
  }

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
    return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }

  deleteProduct(id: number|string ): Observable<boolean> {
    const headers = this.createAuthHeaders();
    return this.http.delete<boolean>(`${this.apiUrl}/deleteProduct/${id}`, { headers })
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    console.log('PreRquest');
    console.log(product);
    if (!product.id) {
      throw Error('El id del producto es necesario');
    }
 
    const headers = this.createAuthHeaders();
    return this.http.patch<Product>
      (`${this.apiUrl}/updateProduct/${product.id}`,
       product, 
       { headers });
  }
  
  createProduct(product: Product): Observable<Product> {
    const headers = this.createAuthHeaders();
    return this.http.post<Product>(`${this.apiUrl}/createProduct`, product, { headers });
  }
}
