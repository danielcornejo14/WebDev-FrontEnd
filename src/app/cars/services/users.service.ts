import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/users/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.baserURL;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<User> {
    if (!id) {
      throw Error('El id del usuario es necesario');
    }
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/users/deleteUser/${id}`)
      .pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  updateUser(user: User): Observable<User> {
    if (!user.id) {
      throw Error('El id del usuario es necesario');
    }
    return this.http.patch<User>(`${this.apiUrl}/users/updateUser/${user.id}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/createUser`, user);
  }
}