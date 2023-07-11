import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService extends ApiService {
  endpoint: string = `${environment.apiURL}/personnels`;

  
  getSyndicat(code_entreprise: string): Observable<any> {
    return this.http.get(`${this.endpoint}/get-syndicat/${code_entreprise}`);
  }
}
