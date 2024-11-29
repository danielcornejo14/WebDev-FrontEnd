import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Order } from '../models/orders/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.baserURL + '/orders';

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`
    });
  }


  getAllOrders(): Observable<Order[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Order[]>(`${this.apiUrl}`, { headers }, ).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  constructor(private http: HttpClient) {}


  getOrderById(orderId: string): Observable<Order> {
    const headers = this.createAuthHeaders();
    
    return this.http.get<Order>(`${this.apiUrl}/getByOrderId`, { headers, params: { orderId } });
  }

  getOrdersByUserId(userId: string): Observable<Order> {
    const headers = this.createAuthHeaders();
    return this.http.get<Order>(`${this.apiUrl}/getOrdersByUserId`, { headers, params: { userId } });
  }

  createOrder(orderData: any): Observable<Order> {
    const headers = this.createAuthHeaders();
    return this.http.post<Order>(`${this.apiUrl}/createOrder`, orderData, { headers });
  }

  updateOrder(orderId: string, orderData: any ): Observable<Order> {
    console.log("Order data:", orderData);
    const headers = this.createAuthHeaders();
    return this.http.put<Order>(`${this.apiUrl}/updateOrder`, orderData, { headers, params: { orderId } });
  }

  deleteOrder(orderId: string): Observable<Order> {
    const headers = this.createAuthHeaders();
    return this.http.delete<Order>(`${this.apiUrl}/deleteOrder`, { headers, params: { orderId } });
  }
}