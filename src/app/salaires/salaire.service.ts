import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaireService extends ApiService {
  endpoint: string = `${environment.apiURL}/salaires`;

  farde(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-farde-paie/${code_entreprise}`);
  } 

  fardeMaxValue(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-farde-max-value/${code_entreprise}`);
  }

  statutPaie(code_entreprise: string, is_paie: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-statut-paie/${code_entreprise}/${is_paie}`);
  }

  relevePaie(code_entreprise: string, is_paie: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-releve-paie/${code_entreprise}/${is_paie}`);
  }

  mesBulletins(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-mes-bulletins/${code_entreprise}/${matricule}`);
  }

  getJrPrestE(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-jrs-preste/${code_entreprise}/${matricule}`);
  }

  getJrCongePayE(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-jrs-conge/${code_entreprise}/${matricule}`);
  } 

  nbrHeureSupp(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-nbr-heures-supp/${code_entreprise}/${id}`);
  }

  primeTotalCDF(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-prime-total-cdf/${code_entreprise}/${id}`);
  }
  primeTotalUSD(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-prime-total-usd/${code_entreprise}/${id}`);
  }

  penaliteTotalCDF(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-penalite-total-cdf/${code_entreprise}/${id}`);
  }
  penaliteTotalUSD(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-penalite-total-usd/${code_entreprise}/${id}`);
  }

  avanceSalaireTotalCDF(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-avance-salaire-total-cdf/${code_entreprise}/${id}`);
  }
  avanceSalaireTotalUSD(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-avance-salaire-total-usd/${code_entreprise}/${id}`);
  }

  preEntrepriseCDF(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/pres-entreprise-cdf/${code_entreprise}/${id}`);
  }

  preEntrepriseUSD(code_entreprise: string, id: number): Observable<any> {
    return this.http.get(`${this.endpoint}/pres-entreprise-usd/${code_entreprise}/${id}`);
  }

  getAnciennete(code_entreprise: string, id: number, date_debut_contrat: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-date-debut-contrat/${code_entreprise}/${id}/${date_debut_contrat}`);
  }


  netAPayerTotal(code_entreprise: string, is_paie: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-net-a-payer-total/${code_entreprise}/${is_paie}`);
  } 

  iprTotal(code_entreprise: string, is_paie: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-ipr-total/${code_entreprise}/${is_paie}`);
  } 

  cnssQPOTotal(code_entreprise: string, is_paie: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-cnss-qpo-total/${code_entreprise}/${is_paie}`);
  }

  fraisBancaireTotal(code_entreprise: string, is_paie: number): Observable<any> {
    return this.http.get(`${this.endpoint}/get-frais-bancaire-total/${code_entreprise}/${is_paie}`);
  }
 

  downloadReport(code_entreprise: string, is_paie: number, start_date: string, end_date: string): Observable<any> {
    return this.http.post(`${this.endpoint}/download-xlsx/${code_entreprise}/${is_paie}/${start_date}/${end_date}`, {}, {responseType: 'blob'});
  } 
}


