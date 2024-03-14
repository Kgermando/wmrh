import { Component, Input, OnInit } from '@angular/core';
import { HeureSuppModel } from '../models/heure-supp-model';
import { PreferenceModel } from 'src/app/preferences/reglages/models/reglage-model';

@Component({
  selector: 'app-heure-supp-filter',
  templateUrl: './heure-supp-filter.component.html',
  styleUrls: ['./heure-supp-filter.component.scss']
})
export class HeureSuppFilterComponent implements OnInit {
  @Input('element') element: HeureSuppModel | any;
  @Input() preference: PreferenceModel | any;

  

  isValid = false; 
  isMoisSuivantValid = false;
  isMoisSuivantANValid = false;
  isMoisPrecedentValid = false;

  isMoisPrecedent = false;

  dateNow = new Date();  
  dateMonth = this.dateNow.getMonth();
  dateAN = this.dateNow.getFullYear(); 
 
   
  ngOnInit(): void {
    const created = new Date(this.element.created);
    const moisSuivant = created.getMonth() + 1;
    const annee = created.getFullYear();

    if (this.preference.pris_en_compte_mois_plus_1) {
      this.isMoisSuivantValid = moisSuivant > this.dateMonth  && annee === this.dateAN; // Mois suivant pour payer
      this.isMoisSuivantANValid = moisSuivant > this.dateMonth && annee < this.dateAN;
      this.isValid = moisSuivant === this.dateMonth  && annee === this.dateAN; // Mois actual pour payer
      this.isMoisPrecedentValid  = created.getMonth() < this.dateMonth && annee === this.dateAN; // Deja bouffé!  
  
    } else {
      // Cette ligne ne prend pas en compte +1
      this.isMoisPrecedent = created.getMonth() +1 < new Date().getMonth() + 1 && created.getFullYear() === new Date().getFullYear();
      
    }
   

  }
}
