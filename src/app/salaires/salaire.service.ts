import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaireService extends ApiService {
  endpoint: string = `${environment.apiURL}/salaires`;

  getJrPrestE(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-jrs-preste/${code_entreprise}/${matricule}`);
  }

  getJrCongePayE(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-jrs-conge/${code_entreprise}/${matricule}`);
  } 

  nbrHeureSupp(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-nbr-heures-supp/${code_entreprise}/${id}`);
  }

  primeTotal(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-prime-total/${code_entreprise}/${id}`);
  }

  penaliteTotal(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-penalite-total/${code_entreprise}/${id}`);
  }

  avanceSalaireTotal(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-avance-salaire-total/${code_entreprise}/${id}`);
  }

  getAnciennete(code_entreprise: string, id: number, date_debut_contrat: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-date-debut-contrat/${code_entreprise}/${id}/${date_debut_contrat}`);
  }


  netAPayerTotal(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-net-a-payer-total/${code_entreprise}`);
  }

  iprTotal(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-ipr-total/${code_entreprise}`);
  }

  cnssQPOTotal(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-cnss-qpo-total/${code_entreprise}`);
  }

  fraisBancaireTotal(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-frais-bancaire-total/${code_entreprise}`);
  }
 
}


