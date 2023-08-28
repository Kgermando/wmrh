import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { AbonnementAdminService } from '../abonnement-admin.service';
import { AbonnementAdminModel } from '../models/abonnement.model';

@Component({
  selector: 'app-abonnement-admin-view',
  templateUrl: './abonnement-admin-view.component.html',
  styleUrls: ['./abonnement-admin-view.component.scss']
})
export class AbonnementAdminViewComponent implements OnInit {
  isLoading = false;

  abonnement: AbonnementAdminModel;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private AbonnementAdminService: AbonnementAdminService) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
      this.AbonnementAdminService.get(Number(id)).subscribe(res => {
        this.abonnement = res;
        this.isLoading = false; 
      });
    }
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}