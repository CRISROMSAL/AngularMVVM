import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

 private apiUrl = 'http://localhost:3000/';  // URL base de la API

 constructor(private http: HttpClient) { }

getData(action: string): Observable<any> {
    console.log("getData action:", action);
    const url = `http://localhost:3000/carritos/`;  // URL dinámica basada en la acción
    return this.http.get<any>(url);  // Hacer la solicitud GET
  }
}


