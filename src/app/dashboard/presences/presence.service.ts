import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceDashService extends ApiService {
  endpoint: string = `${environment.apiURL}/dashboard-presences`;

  getCourbePresenceMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/courbe-presences-month/${code_entreprise}`);
  }

  getCourbePresenceYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/courbe-presences-year/${code_entreprise}`);
  }

  getCourbePresenceAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/courbe-presences-all/${code_entreprise}`);
  }
  

}
