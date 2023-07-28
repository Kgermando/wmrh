import { Component, OnInit } from '@angular/core';
import { CandidatureModel } from '../models/candidature-model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidaturesService } from '../../candidatures.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-candidature-view',
  templateUrl: './candidature-view.component.html',
  styleUrls: ['./candidature-view.component.scss']
})
export class CandidatureViewComponent implements OnInit {
  isLoading = false;

  candidature: CandidatureModel;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private candidaturesService: CandidaturesService,
    private toastr: ToastrService) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id'); 
      this.candidaturesService.get(Number(id)).subscribe(res => {
        this.candidature = res;
        this.isLoading = false; 
      });
      this.isLoading = false;
    }

    delete(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        this.candidaturesService
          .delete(id)
          .subscribe({
            next: () => {
              this.toastr.info('Success!', 'Supprimé avec succès!');
              this.router.navigate(['layouts/recrutements/postes']);
            },
            error: err => {
              this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            }
          }); 
      }
    }
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}