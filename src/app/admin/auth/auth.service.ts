import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(credentials: { email: string; password: string }) {
    return this.http.post<any>(this.apiUrl, credentials)
      .pipe(
        tap(res => {
          // Guardamos el token JWT en localStorage
          localStorage.setItem('token', res.token);
        })
      );
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('token');
  }

  // Comprueba si hay token
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Devuelve el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
