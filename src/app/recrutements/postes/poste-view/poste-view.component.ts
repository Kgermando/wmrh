import { Component, OnInit } from '@angular/core';
import { PosteModel } from '../models/poste-model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostesService } from '../../postes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-poste-view',
  templateUrl: './poste-view.component.html',
  styleUrls: ['./poste-view.component.scss']
})
export class PosteViewComponent implements OnInit {
  isLoading = false;

  poste: PosteModel;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private postesService: PostesService,
    private toastr: ToastrService) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id'); 
      this.postesService.get(Number(id)).subscribe(res => {
        this.poste = res;
        this.isLoading = false; 
      });
      this.isLoading = false;
    }

    delete(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        this.postesService
          .delete(id)
          .subscribe(() => {
            this.toastr.success('Success!', 'Ajouter avec succès!');
            this.router.navigate(['recrutements/postes']);
          });
      }
    }
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}