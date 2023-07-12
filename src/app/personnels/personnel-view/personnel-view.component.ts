import { Component, OnInit } from '@angular/core';
import { PersonnelModel } from '../models/personnel-model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from '../personnel.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private personnelService: PersonnelService,
    private toastr: ToastrService) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
      this.personnelService.get(Number(id)).subscribe(res => {
        this.personne = res;
        this.isLoading = false; 
      });
      this.isLoading = false;
    }

    delete(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        this.personnelService
          .delete(id)
          .subscribe(() => {
            this.toastr.success('Success!', 'Ajouter avec succès!');
            this.router.navigate(['/layouts/personnels/personnel-list']);
          });
      }
    }
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
