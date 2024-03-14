import { Component, Input, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ApointementModel } from 'src/app/presences/models/presence-model';
import { PresenceService } from 'src/app/presences/presence.service';

@Component({
  selector: 'app-presence-pointage',
  templateUrl: './presence-pointage.component.html',
  styleUrls: ['./presence-pointage.component.scss']
})
export class PresencePointageComponent implements OnInit { 
  @Input() matricule!: string; 

  isLoadingPresence: boolean = false;

  presenceList: ApointementModel[] = [];
  presenceFilterDate: ApointementModel[] = [];
  pointage: ApointementModel | any;

  isPToday = false;
  isAToday = false;
  isAAToday = false; 
  isAMToday = false;
  isCCToday = false;
  isCAToday = false;
  isCOToday = false;
  isSToday = false;
  isOToday = false;
  isMToday = false;

    constructor(
      public themeService: CustomizerSettingsService,
      private presenceService: PresenceService
  ) {}

  ngOnInit(): void {
    // this.presenceService.getAllItem(this.item.code_entreprise, this.item.matricule).subscribe(res => {
    //   this.presenceList = res;
      
    //   console.log('presenceList', this.presenceList);

    //   for (let presence of this.presenceList) {
    //     this.pointage = presence;
    //     if(this.apointement) { 
    //         const day = this.date.getDate();
    //         const dayMonth = this.date.getMonth();
    //         const dayYear = this.date.getFullYear(); 
    //         // Date d'entree 
    //         const dateEntree = new Date(presence.date_entree);
    //         const dateEntreeDay = dateEntree.getDate();
    //         const dateEntreeMonth = dateEntree.getMonth();
    //         const dateEntreeYear = dateEntree.getFullYear(); 
    
    //         var datePresenceSortie = new Date(presence.date_sortie);
         
    //       if (presence.apointement === 'P') {
    //         if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
    //           this.isPToday = true;
    //         }
    //       } else if(presence.apointement === 'A'){
    //         if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
    //           this.isAToday = true;
    //         }
    //       } else if(presence.apointement === 'AA'){
    //         if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
    //           this.isAAToday = true;
    //         }
    //       } else if(presence.apointement === 'O'){
    //         if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
    //           this.isOToday = true;
    //         }
    //       }
                      
    //       else if(presence.apointement === 'AM'){
    //         if (datePresenceSortie > this.date) {
    //           this.isAMToday = true;
    //         }
    //       } else if(presence.apointement === 'CC'){
    //         if (datePresenceSortie > this.date) {
    //           this.isCCToday = true;
    //         } 
    //       } else if(presence.apointement === 'CA'){
    //         if (datePresenceSortie > this.date) {
    //           this.isCAToday = true;
    //         }
    //       } else if(presence.apointement === 'CO'){
    //         if (datePresenceSortie > this.date) {
    //           this.isCOToday = true;
    //         }
    //       } else if(presence.apointement === 'S'){
    //         if (datePresenceSortie > this.date) {
    //           this.isSToday = true;
    //         }
    //       } else if(presence.apointement === 'M'){
    //         if (datePresenceSortie > this.date) {
    //           this.isMToday = true;
    //         }
    //       }
    //     }
    //   }  
    // });
 
    var code = this.matricule.split("-");
    var code_entreprise = code[code.length - 1];
    this.presenceService.getLastItem(code_entreprise, this.matricule).subscribe(
      res => {
        this.presenceList = res; 
        this.pointage = this.presenceList[0]; // Recupère la dernière présence pour cet agent 


        if(this.pointage) {
          const dateToday = new Date();
          const day = dateToday.getDate();
          const dayMonth = dateToday.getMonth();
          const dayYear = dateToday.getFullYear(); 
          // Date d'entree 
          const dateEntree = new Date(this.pointage.date_entree);
          const dateEntreeDay = dateEntree.getDate();
          const dateEntreeMonth = dateEntree.getMonth();
          const dateEntreeYear = dateEntree.getFullYear(); 
  
          var datePresenceSortie = new Date(this.pointage.date_sortie);
   
          if (this.pointage.apointement === 'P') {
            if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
              this.isPToday = true;
            }
          } else if(this.pointage.apointement === 'A'){
            if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
              this.isAToday = true;
            }
          } else if(this.pointage.apointement === 'AA'){
            if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
              this.isAAToday = true;
            }
          } else if(this.pointage.apointement === 'O'){
            if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
              this.isOToday = true;
            }
          } 
          
          
          else if(this.pointage.apointement === 'AM'){
            if (datePresenceSortie > dateToday) {
              this.isAMToday = true;
            }
          } else if(this.pointage.apointement === 'CC'){
            if (datePresenceSortie > dateToday) {
              this.isCCToday = true;
            } 
          } else if(this.pointage.apointement === 'CA'){
            if (datePresenceSortie > dateToday) {
              this.isCAToday = true;
            }
          } else if(this.pointage.apointement === 'CO'){
            if (datePresenceSortie > dateToday) {
              this.isCOToday = true;
            }
          } else if(this.pointage.apointement === 'S'){
            if (datePresenceSortie > dateToday) {
              this.isSToday = true;
            }
          } else if(this.pointage.apointement === 'M'){
            if (datePresenceSortie > dateToday) {
              this.isMToday = true;
            }
          }
        }
      
      }
    );
  }


}
