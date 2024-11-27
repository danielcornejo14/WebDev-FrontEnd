import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.baserURL + "/users";
  
  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(`${this.apiUrl}/register`, body, { headers }).pipe(
      map(response => {
        // Guardar el token en el localStorage
        localStorage.setItem('token', response.token);
        return response;
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      map(response => {
        // Guardar el token en el localStorage
        console.log(response);
        localStorage.setItem('token', response.jwt);
        // response.role;
        // response.email;
        // response.password;
        return response.role;
      })
    );
  }

  logout(): void {
    // Eliminar el token del localStorage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Verificar si el token existe en el localStorage
    return !!localStorage.getItem('token');
  }

  getUserDetails(): any {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  // Decodificar el token para obtener los detalles del usuario
  const payload = JSON.parse(atob(token.split('.')[1]));
  return {
    email: payload.email,
    role: payload.role
  };
}

}
