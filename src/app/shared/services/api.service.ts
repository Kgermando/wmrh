import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  abstract get endpoint(): string;

  constructor(protected http: HttpClient) { }

  preference(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/preference/${code_entreprise}`);
  }

  getAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-all/${code_entreprise}`);
  }

  all(code_entreprise: string, page?: number): Observable<any> {
    let url = `${this.endpoint}/${code_entreprise}`;
    if (page) { // page is optional
      url += `?page=${page}`;
    } 
    return this.http.get(url); 
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get/${id}`);
  }

  presence(matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/presence/${matricule}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.endpoint, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
