import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/users/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.baserURL + '/users';

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/getAllUsers`, { headers }, ).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }

  getUserById(id: number | string): Observable<User> {
    if (!id) {
      throw Error('El id del usuario es necesario');
    }
    const options = { params: { id: id.toString() } };
    return this.http.get<User>(`${this.apiUrl}/getUserById`, options);
  }

  register(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(`${this.apiUrl}/signup`, body, { headers }).pipe(
      map(response => {
        // Guardar el token en el localStorage
        localStorage.setItem('token', response.token);
        return response;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) {
      throw Error('El id del usuario es necesario');
    }
    const headers = this.createAuthHeaders();
    return this.http.patch<User>(`${this.apiUrl}/updateUser/${user.id}`, user, { headers });
  }

  deleteUser(id: number | string): Observable<boolean> {
    const headers = this.createAuthHeaders();
    return this.http.delete<boolean>(`${this.apiUrl}/deleteUser/${id}`, { headers })
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }
}

