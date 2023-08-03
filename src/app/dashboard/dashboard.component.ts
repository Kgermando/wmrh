import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  categoryList = [
    'Employés', 
    'Finances', 
    'Presences', 
    'Autres', 
    'All'
  ];

  dureeList = ['Mois', 'Année', 'All'];


  isSelectCategory = 'All';
  isSelect = 'Mois';
  
    onSelectCategoryChange(event: any) { 
      if (event.value === 'Employés') {
        this.isSelectCategory = 'Employés';
      } else if(event.value === 'Finances') {
        this.isSelectCategory = 'Finances';
      } else if(event.value === 'Presences') {
        this.isSelectCategory = 'Presences';
      } else if(event.value === 'Autres') {
        this.isSelectCategory = 'Autres';
      } else if(event.value === 'All') {
        this.isSelectCategory = 'All';
      }
    }


    onSelectChange(event: any) { 
      if (event.value === 'Mois') {
        this.isSelect = 'Mois';
      } else if(event.value === 'Année') {
        this.isSelect = 'Année';
      } else if(event.value === 'All') {
        this.isSelect = 'All';
      }
    }

}
