import { Component, OnInit } from '@angular/core';
import { SalaireModel } from '../../models/salaire-model';
import { PreferenceModel } from 'src/app/preferences/reglages/models/reglage-model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SalaireService } from '../../salaire.service';
import { ReglageService } from 'src/app/preferences/reglages/reglage.service';
import { ToastrService } from 'ngx-toastr';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';


@Component({
  selector: 'app-bulletin-paie',
  templateUrl: './bulletin-paie.component.html',
  styleUrls: ['./bulletin-paie.component.scss']
})
export class BulletinPaieComponent implements OnInit {
  isLoading = false;

  salaire: SalaireModel;

  preference: PreferenceModel;

  currentUser: PersonnelModel | any;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private salaireService: SalaireService,
    private reglageService: ReglageService,
    private toastr: ToastrService) {}


    ngOnInit(): void {
      this.isLoading = true;
      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
          this.salaireService.get(Number(id)).subscribe(res => {
            this.salaire = res;
            this.isLoading = false; 
          });
          this.reglageService.preference(this.currentUser.code_entreprise).subscribe(res => {
            this.preference = res;
            this.isLoading = false;  
          });
        },
        error: (error) => {
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });  
      this.isLoading = false;
    }

    delete(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        this.salaireService
          .delete(id)
          .subscribe({
            next: () => {
              this.toastr.success('Success!', 'Suppriméé avec succès!');
              this.router.navigate(['/layouts/salaires/statuts-paies']);
            },
            error: err => {
              this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
              console.log(err);
            }
          });
      }
    }
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
