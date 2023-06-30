import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonnelModel } from '../personnels/models/personnel-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(data: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/login/1234`, data, {
        withCredentials: true
    });
  }


  register(data: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/auth/register`, data);
  }


  user(): Observable<PersonnelModel> {
    return this.http.get<PersonnelModel>(`${environment.apiURL}/auth/user`, {
        withCredentials: true
    });
  }

  isLoggIn() {
    this.router.navigate(['auth/login'])
  }

  logout(): Observable<any> {
    return this.http.get(`${environment.apiURL}/auth/logout`, {
        withCredentials: true
    });
  } 


  updateInfo(data: any): Observable<PersonnelModel> {
    return this.http.put<PersonnelModel>(`${environment.apiURL}/users/info`, data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/users/password`, data);
  }
}
