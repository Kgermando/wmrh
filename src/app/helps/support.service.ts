import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends ApiService {
  endpoint: string = `${environment.apiURL}/supports`;


  getAllSupport(): Observable<any> {
    return this.http.get(`${this.endpoint}/get-all`);
  }

  findGetAll(id:any): Observable<any> {
    return this.http.get(`${this.endpoint}/get-all-id/${id}`);
  }
 

}
