import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashAllService extends ApiService {
  endpoint: string = `${environment.apiURL}/dash-all`;

  totalEnmployesMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-month/${code_entreprise}`);
  }

  totalEnmployesYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-year/${code_entreprise}`);
  }

  totalEnmployesAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-all/${code_entreprise}`);
  }

  totalEnmployeFemmeMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-femme-month/${code_entreprise}`);
  }

  totalEnmployeFemmeYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-femme-year/${code_entreprise}`);
  }

  totalEnmployeFemmeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-femme-all/${code_entreprise}`);
  }

  totalEnmployeHommeMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-homme-month/${code_entreprise}`);
  }

  totalEnmployeHommeYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-homme-year/${code_entreprise}`);
  }

  totalEnmployeHommeAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/total-enmployes-homme-all/${code_entreprise}`);
  }
 
   
  // Performences Employés
  getPerformencesMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/performences-month/${code_entreprise}`);
  }

  getPerformencesYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/performences-year/${code_entreprise}`);
  }

  getPerformencesAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/performences-all/${code_entreprise}`);
  }

  // Finances 
  masseSalarialMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/masse-salarial-month/${code_entreprise}`);
  }

  masseSalarialMonthPrecedement(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/masse-salarial-month-precedement/${code_entreprise}`);
  }

  masseSalarialYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/masse-salarial-year/${code_entreprise}`);
  }

  masseSalarialYearPrecedement(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/masse-salarial-year-precedement/${code_entreprise}`);
  }

  masseSalarialAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/masse-salarial-all/${code_entreprise}`);
  }
 

  // Statut de paie disponible et traitements
  statutPaieMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/statut-paie-month/${code_entreprise}`);
  }

  statutPaieYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/statut-paie-year/${code_entreprise}`);
  }

  statutPaieAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/statut-paie-all/${code_entreprise}`);
  }

  
// Alocations logement, transport, famillial, soins medicaux
  allocationMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/allocation-month/${code_entreprise}`);
  }

  allocationYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/allocation-year/${code_entreprise}`);
  }

  allocationALl(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/allocation-all/${code_entreprise}`);
  }


  
  primesMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/primes-month/${code_entreprise}`);
  }

  primeAncienneteMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/primes-anciennete-month/${code_entreprise}`);
  }

  penaliteMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/penalites-month/${code_entreprise}`);
  }

  avanceSalaireMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/avances-salaires-month/${code_entreprise}`);
  }

  presEntrepriseMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/pres-entreprise-month/${code_entreprise}`);
  } 

  heureSuppMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/heures-supp-month/${code_entreprise}`);
  }

  syndicatMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/syndicats-month/${code_entreprise}`);
  } 




  primesYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/primes-year/${code_entreprise}`);
  }

  primeAncienneteYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/primes-anciennete-year/${code_entreprise}`);
  }

  penaliteYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/penalites-year/${code_entreprise}`);
  }

  avanceSalaireYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/avances-salaires-year/${code_entreprise}`);
  }

  presEntrepriseYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/pres-entreprise-year/${code_entreprise}`);
  }

  heureSuppYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/heures-supp-year/${code_entreprise}`);
  }

  syndicatYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/syndicats-year/${code_entreprise}`);
  }
  

  primesAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/primes-all/${code_entreprise}`);
  }

  primeAncienneteAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/primes-anciennete-all/${code_entreprise}`);
  }

  penaliteAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/penalites-all/${code_entreprise}`);
  }

  avanceSalaireAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/avances-salaires-all/${code_entreprise}`);
  }

  presEntrepriseAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/pres-entreprise-all/${code_entreprise}`);
  }

  heureSuppAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/heures-supp-all/${code_entreprise}`);
  }

  syndicatAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/syndicats-all/${code_entreprise}`);
  } 
  
  // Presences
  presencePieMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/presence-month/${code_entreprise}`);
  }

  presencePieYEAR(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/presence-year/${code_entreprise}`);
  }

  presencePieAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/presence-all/${code_entreprise}`);
  }
  
  // Autres
  recrutementsTotalMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/recrutements-total-month/${code_entreprise}`);
  }

  recrutementsTotalYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/recrutements-total-year/${code_entreprise}`);
  }

  recrutementsTotalAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/recrutements-total-all/${code_entreprise}`);
  }

  postulantsTotalMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/postulants-total-month/${code_entreprise}`);
  }

  postulantsTotalYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/postulants-total-year/${code_entreprise}`);
  }

  postulantsTotalAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/postulants-total-all/${code_entreprise}`);
  }

  postulantsRetenuTotalMonth(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/postulants-retenus-total-month/${code_entreprise}`);
  }

  postulantsRetenuTotalYear(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/postulants-retenus-total-year/${code_entreprise}`);
  }

  postulantsRetenuTotalAll(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/postulants-retenus-total-all/${code_entreprise}`);
  } 
 
}
