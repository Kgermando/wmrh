import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReglageService extends ApiService {
  endpoint: string = `${environment.apiURL}/preferences`;

  updatePref(code_entreprise: string, data: any): Observable<any> {
    return this.http.put(`${this.endpoint}/${code_entreprise}`, data);
  }


  getAllReglage(): Observable<any> {
    return this.http.get(`${this.endpoint}/get-all`);
  }

  
}
