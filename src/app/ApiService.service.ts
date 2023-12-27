import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://dev.c15b19b.kyma.ondemand.com';

  constructor(private http: HttpClient) { }

  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const options = { params, headers };
    return this.http.get<T>(`${this.baseUrl}/${url}`, options);
  }
  getID<T>(url: string, id: number, params?: HttpParams, headers?: HttpHeaders): Observable<T> {
    const options = { params, headers };
    console.log(this.http.get<T>(`${this.baseUrl}/${url}/${id}`, options));
    return this.http.get<T>(`${this.baseUrl}/${url}/${id}`, options);
  }

  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    const options = { headers };
    return this.http.post<T>(`${this.baseUrl}/${url}`, body, options);
  }

  put<T>(url: string, id: number, body: any, headers?: HttpHeaders): Observable<T> {
    const options = { headers };
    return this.http.put<T>(`${this.baseUrl}/${url}/${id}`, body, options);
  }

  patch<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    const options = { headers };
    return this.http.patch<T>(`${this.baseUrl}/${url}`, body, options);
  }

  delete<T>(url: string, id: number, headers?: HttpHeaders): Observable<T> {
    const options = { headers };
    return this.http.delete<T>(`${this.baseUrl}/${url}/${id}`, options);
  }
}