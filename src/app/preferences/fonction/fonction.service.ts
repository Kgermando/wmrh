import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FonctionService extends ApiService {
  endpoint: string = `${environment.apiURL}/fonctions`;
}
