import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeService extends ApiService {
  endpoint: string = `${environment.apiURL}/dashboard-employes`;

  getPieSexeMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-sexe-month/${code_entreprise}`);
  }

  getPieSexeYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-sexe-year/${code_entreprise}`);
  }

  getPieSexeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-sexe-all/${code_entreprise}`);
  }


  // Count

  departementMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-departement-month/${code_entreprise}`);
  }

  syndicatMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-syndicat-month/${code_entreprise}`);
  }

  siteLocationMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-site-location-month/${code_entreprise}`);
  }

  compteActifMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-compte-actif-month/${code_entreprise}`);
  }

  departementYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-departement-year/${code_entreprise}`);
  }

  syndicatYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-syndicat-year/${code_entreprise}`);
  }

  siteLocationYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-site-location-year/${code_entreprise}`);
  }

  compteActifYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-compte-actif-year/${code_entreprise}`);
  }


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
 


// Employés par departement

  employeDepartementMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-dep-month/${code_entreprise}`);
  } 

  employeDepartementYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-dep-year/${code_entreprise}`);
  } 

  employeDepartementAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-dep-all/${code_entreprise}`);
  } 
 

  // Age de contrat par employés

  ageContratEmployeMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-contrats-month/${code_entreprise}`);
  } 

  ageContratEmployeYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-contrats-year/${code_entreprise}`);
  } 

  ageContratEmployeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-contrats-all/${code_entreprise}`);
  } 
  
  // Age des employés

  agetEmployeMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-employes-month/${code_entreprise}`);
  } 

  ageEmployeYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-employes-year/${code_entreprise}`);
  } 

  ageEmployeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/enmployes-age-employes-all/${code_entreprise}`);
  } 
 
}
