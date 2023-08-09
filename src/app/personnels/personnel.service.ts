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

  uploadCSV(data: any): Observable<any> {
    return this.http.post(`${this.endpoint}/upload-csv`, data);
  }

  downloadReport(code_entreprise: string, start_date: string, end_date: string): Observable<any> {
    return this.http.get(`${this.endpoint}/download-xlsx/${code_entreprise}/${start_date}/${end_date}`);
  }
}
