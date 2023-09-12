import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-classeur-filter',
  templateUrl: './classeur-filter.component.html',
  styleUrls: ['./classeur-filter.component.scss']
})
export class ClasseurFilterComponent implements OnInit {
  @Input('farde') farde: any;

  moisClasseur = '';
  annee: any;

   
  ngOnInit(): void {
    const created = new Date(this.farde.created);
    const month = created.getMonth() + 1;
    this.annee = created.getFullYear();
    
    if (month === 1) {
      this.moisClasseur = 'Janvier';
    } else if(month === 2) {
        this.moisClasseur = 'Fevrier';
    } else if(month === 3) {
        this.moisClasseur = 'Mars';
    } else if(month === 4) {
        this.moisClasseur = 'Avril';
    } else if(month === 5) {
        this.moisClasseur = 'Mai';
    } else if(month === 6) {
        this.moisClasseur = 'Juin';
    } else if(month === 7) {
        this.moisClasseur = 'Juillet';
    } else if(month === 8) {
        this.moisClasseur = 'Aôut';
    } else if(month === 9) {
        this.moisClasseur = 'Septembre';
    } else if(month === 10) {
        this.moisClasseur = 'Octobre';
    } else if(month === 11) {
      this.moisClasseur = 'Novembre';
    } else if(month === 12) {
      this.moisClasseur = 'Décembre';
    }
  }

  getMonthClasseur(month: any) {
    if (month === 1) {
      this.moisClasseur = 'Janvier';
    } else if(month === 2) {
        this.moisClasseur = 'Fevrier';
    } else if(month === 3) {
        this.moisClasseur = 'Mars';
    } else if(month === 4) {
        this.moisClasseur = 'Avril';
    } else if(month === 5) {
        this.moisClasseur = 'Mai';
    } else if(month === 6) {
        this.moisClasseur = 'Juin';
    } else if(month === 7) {
        this.moisClasseur = 'Juillet';
    } else if(month === 8) {
        this.moisClasseur = 'Aôut';
    } else if(month === 9) {
        this.moisClasseur = 'Septembre';
    } else if(month === 10) {
        this.moisClasseur = 'Octobre';
    } else if(month === 11) {
      this.moisClasseur = 'Novembre';
    } else if(month === 12) {
      this.moisClasseur = 'Décembre';
    }
  }


}
