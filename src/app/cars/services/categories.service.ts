import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/products/category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = environment.baserURL + '/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }


}
