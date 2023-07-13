import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PersonnelService } from 'src/app/personnels/personnel.service';
import { PresenceService } from '../../presence.service';
import { ApointementModel } from '../../models/presence-model';


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
                        this.isLoading = false;
                    },
                    error: (err) => {
                        this.isLoading = false;
                        console.log(err);
                    }
                });
            },
            error: (error) => {
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


 getPresenceIcon(code_entreprise: string, matricule: string) {
  this.presenceService.getLastItem(code_entreprise, matricule).subscribe(res => this.presence = res)
 }


 navigationUrl(matricule: string) {
  this.router.navigate(['/layouts/presences/pointage', matricule]);
 }

      
}
