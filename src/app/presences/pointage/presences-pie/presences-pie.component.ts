import { Component, Input, OnInit } from '@angular/core';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';  

@Component({
  selector: 'app-presences-pie',
  templateUrl: './presences-pie.component.html',
  styleUrls: ['./presences-pie.component.scss']
})
export class PresencesPieComponent implements OnInit {
  @Input('personne') personne: PersonnelModel; 

  isSelect = 'Mois';
  
  constructor() { }

  
    ngOnInit(): void {
       
    }

    onSelectChange(event: any) {
      console.log(event.value);
      if (event.value === 'Mois') {
        this.isSelect = 'Mois';
      } else if(event.value === 'Année') {
        this.isSelect = 'Année';
      } else if(event.value === 'All') {
        this.isSelect = 'All';
      }
       
    }
 

}
