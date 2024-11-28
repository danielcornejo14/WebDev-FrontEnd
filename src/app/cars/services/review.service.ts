import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.baserURL + '/review';

  constructor( private http: HttpClient) { }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}`);
  }

  getReviewByProduct(productId: string): Observable<Review[]> {
    if (!productId) {
      throw Error('El id del producto es necesario');
    }
    return this.http.get<Review[]>(`${this.apiUrl}/product/${productId}`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/createReview`, review, { headers: this.createAuthHeaders() });
  }



}
