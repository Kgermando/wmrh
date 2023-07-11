import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PersonnelService } from 'src/app/personnels/personnel.service';

@Component({
  selector: 'app-pointage-matricule',
  templateUrl: './pointage-matricule.component.html',
  styleUrls: ['./pointage-matricule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PointageMatriculeComponent implements OnInit {
  isLoading = false;

  personne: PersonnelModel;  

  cumulsMonth: number = 0; 
   

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private personnelService: PersonnelService
    ) {}

 
  ngOnInit(): void {
    this.isLoading = true;
    let id = this.route.snapshot.params['id'];
    this.personnelService.get(id).subscribe(pers => {
      this.personne = pers;
      this.isLoading = false; 
    });
    this.isLoading = false; 
  }
 
  
}
