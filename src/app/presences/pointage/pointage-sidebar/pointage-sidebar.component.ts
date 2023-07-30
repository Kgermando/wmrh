import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PersonnelService } from 'src/app/personnels/personnel.service';
import { PresenceService } from '../../presence.service';
import { ApointementModel } from '../../models/presence-model';
import { PresencePAAAModel } from '../../models/presence-pie-model';


@Component({
  selector: 'app-pointage-sidebar',
  templateUrl: './pointage-sidebar.component.html',
  styleUrls: ['./pointage-sidebar.component.scss']
})
export class PointageSidebarComponent implements OnInit {
  
  isLoading = false;
  currentUser: PersonnelModel | any;

  personnelList: PersonnelModel[] = [];
  personnelFilter: PersonnelModel[] = []; 

  presence: ApointementModel;

  itemsPAAAList: PresencePAAAModel[] = [];
  itemsPList: PresencePAAAModel[] = [];
  itemsAList: PresencePAAAModel[] = [];
  itemsAAList: PresencePAAAModel[] = [];

  itemsCongeList: PresencePAAAModel[] = [];
  itemsAMList: PresencePAAAModel[] = [];
  itemsCCList: PresencePAAAModel[] = [];
  itemsCAList: PresencePAAAModel[] = [];
  itemsCOList: PresencePAAAModel[] = [];
  itemsSList: PresencePAAAModel[] = [];
  itemsOList: PresencePAAAModel[] = [];
  itemsMList: PresencePAAAModel[] = [];
 
  numberP: number = 0;
  numberA: number = 0;
  numberAA: number = 0;

  numberAM: number = 0;
  numberCC: number = 0;
  numberCA: number = 0;
  numberCO: number = 0;
  numberS: number = 0;
  numberO: number = 0;
  numberM: number = 0;
 
    constructor(
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private personnelService: PersonnelService,
      private presenceService: PresenceService
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
        this.authService.user().subscribe({
            next: (user) => {
                this.currentUser = user;
                this.personnelService.getAll(this.currentUser.code_entreprise).subscribe({
                    next: res => {
                        this.personnelList = res; 
                        this.personnelFilter = [...this.personnelList];
                        this.presenceService.getItemsPAAA(this.currentUser.code_entreprise).subscribe(res => {
                          this.itemsPAAAList = res;
                          this.itemsPList = this.itemsPAAAList.filter(v => v.apointement === 'P');
                          this.itemsAList = this.itemsPAAAList.filter(v => v.apointement === 'A');
                          this.itemsAAList = this.itemsPAAAList.filter(v => v.apointement === 'AA');
                          
                          this.itemsPList.map((item: any) => this.numberP = item.count);
                          this.itemsAList.map((item: any) => this.numberA = item.count);
                          this.itemsAAList.map((item: any) => this.numberAA = item.count); 
                        });
                        this.presenceService.getItemsCongE(this.currentUser.code_entreprise).subscribe(res => {
                          this.itemsCongeList = res;
                          this.itemsAMList = this.itemsCongeList.filter(v => v.apointement === 'AM');
                          this.itemsCCList = this.itemsCongeList.filter(v => v.apointement === 'CC');
                          this.itemsCAList = this.itemsCongeList.filter(v => v.apointement === 'CA');
                          this.itemsCOList = this.itemsCongeList.filter(v => v.apointement === 'CO');
                          this.itemsSList = this.itemsCongeList.filter(v => v.apointement === 'S');
                          this.itemsOList = this.itemsCongeList.filter(v => v.apointement === 'O');
                          this.itemsMList = this.itemsCongeList.filter(v => v.apointement === 'M');

                          this.itemsAMList.map((item: any) => this.numberAM = item.count);
                          this.itemsCCList.map((item: any) => this.numberCC = item.count);
                          this.itemsCAList.map((item: any) => this.numberCA = item.count);
                          this.itemsCOList.map((item: any) => this.numberCO = item.count);
                          this.itemsSList.map((item: any) => this.numberS = item.count);
                          this.itemsOList.map((item: any) => this.numberO = item.count);
                          this.itemsMList.map((item: any) => this.numberM = item.count);
                        });
                        this.isLoading = false;
                    },
                    error: (err) => {
                        this.isLoading = false;
                        console.log(err);
                    }
                });
            },
            error: (error) => {
              this.isLoading = false;
              this.router.navigate(['/auth/login']);
              console.log(error);
            }
          }); 
        this.isLoading = false;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value; 
    this.personnelFilter = [...this.personnelList.filter(personne => personne.matricule.includes(filterValue.trim().toLowerCase()))];
 }
    
}
