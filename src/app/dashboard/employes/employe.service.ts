import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService extends ApiService {
  endpoint: string = `${environment.apiURL}/dashboard-employes`;

 
  getPieSexeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-sexe-all/${code_entreprise}`);
  }


  // Count
  departementAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-departement-all/${code_entreprise}`);
  } 
    
  syndicatAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-syndicat-all/${code_entreprise}`);
  } 
    
  siteLocationAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-site-location-all/${code_entreprise}`);
  } 

  compteActifAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-compte-actif-all/${code_entreprise}`);
  }
 

// Employés par departement, service, Site de travail
  employeDepartementAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-dep-all/${code_entreprise}`);
  }
  employeServiceAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-service-all/${code_entreprise}`);
  }
  employeSiteLocationAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-site-travail-all/${code_entreprise}`);
  } 


  
  // Age de contrat par employés 
  ageContratEmployeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-contrats-all/${code_entreprise}`);
  }
  
  // Age des employés 
  ageEmployeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-employes-all/${code_entreprise}`);
  } 
 
}
