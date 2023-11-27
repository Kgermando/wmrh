import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportModuleService extends ApiService {
  endpoint: string = `${environment.apiURL}/support-modules`;


  getAllSupport(): Observable<any> {
    return this.http.get(`${this.endpoint}/get-all`);
  }

}
