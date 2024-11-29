import { Injectable } from '@angular/core';
import { Cart } from '../models/cart/Cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = environment.baserURL;

  constructor(private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`
    });
  }

  getCart(): Observable<Cart> {
    const headers = this.createAuthHeaders();
    debugger;
    return this.http.get<Cart>(`${this.apiUrl} + /cart`, { headers });
  }

  addProductToCart(userId: string, productId: string, quantity: number): Observable<any> {
    const headers = this.createAuthHeaders();
    const body = {
      userId: userId,
      productId: productId,
      quantity: quantity
    };
    return this.http.post<any>(`${this.apiUrl}/addProduct`, body, { headers });
  }

  deleteProductFromCart(productId: string): Observable<any> {
    const headers = this.createAuthHeaders();
    const body = {
      productId: productId
    };
    return this.http.delete<any>(`${this.apiUrl}/deleteProduct`, { headers, body });
  }

}
