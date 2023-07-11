import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApointementModel } from './models/presence-model';

@Injectable({
  providedIn: 'root'
})
export class PresenceService extends ApiService {
  endpoint: string = `${environment.apiURL}/apointements`;

  apointementList: ApointementModel[]
 
  getMatricule(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-matricule/${code_entreprise}/${matricule}`);
  }

  getPie(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-pie/${code_entreprise}/${matricule}`);
  }

  getPieYEAR(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-pie-year/${code_entreprise}/${matricule}`);
  }

  getPieAll(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-pie-all/${code_entreprise}/${matricule}`);
  }

  // getOne(matricule: string): Observable<any> {
  //   return this.http.get(`${this.endpoint}/get/${matricule}`);
  // }

  getLastItem(code_entreprise: string, matricule: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-last-item/${code_entreprise}/${matricule}`);
  }
}
