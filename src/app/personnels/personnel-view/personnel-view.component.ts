import { Component, OnInit } from '@angular/core';
import { PersonnelModel } from '../models/personnel-model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../personnel.service';

@Component({
  selector: 'app-personnel-view',
  templateUrl: './personnel-view.component.html',
  styleUrls: ['./personnel-view.component.scss']
})
export class PersonnelViewComponent implements OnInit {
  isLoading = false;

  personne: PersonnelModel;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private personnelService: PersonnelService) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
      this.personnelService.get(Number(id)).subscribe(res => {
        this.personne = res;
        this.isLoading = false;
  
        console.log(this.personne); 
        this.isLoading = true;
      });
    }
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
