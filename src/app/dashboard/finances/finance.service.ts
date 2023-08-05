import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService  extends ApiService {
  endpoint: string = `${environment.apiURL}/dashboard-finances`;

  iprMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-ipr-month/${code_entreprise}`);
  }

  cnssQPOMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-cnss-qpo-month/${code_entreprise}`);
  }

  iprYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-ipr-year/${code_entreprise}`);
  }

  cnssQPOYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-cnss-qpo-year/${code_entreprise}`);
  }

  iprAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-ipr-all/${code_entreprise}`);
  }

  cnssQPOAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-cnss-qpo-all/${code_entreprise}`);
  }
 

  // Depenses payés
  depensePayEMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-depenses-paye-month/${code_entreprise}`);
  }

  depensePayEYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-depenses-paye-year/${code_entreprise}`);
  }

  depensePayEALl(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-depenses-paye-all/${code_entreprise}`);
  } 

  
}
