import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Review } from '../models/products/review';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.baserURL + '/review';

  constructor( private http: HttpClient) { }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`
    });
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}`);
  }

  getReviewByProduct(productId: string | number): Observable<Review[]> {
    if (!productId) {
      throw Error('El id del producto es necesario');
    }
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`);
  }

  createReview(review: Review): Observable<Review> {
    const headers = this.createAuthHeaders();

    return this.http.post<Review>(`${this.apiUrl}/createReview`, review, { headers });
  }



}
