import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReglageService } from 'src/app/preferences/reglages/reglage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PreferenceModel } from 'src/app/preferences/reglages/models/reglage-model';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PersonnelService } from 'src/app/personnels/personnel.service'; 
import { SalaireService } from '../../salaire.service';

@Component({
  selector: 'app-paie-view',
  templateUrl: './paie-view.component.html',
  styleUrls: ['./paie-view.component.scss']
})
export class PaieViewComponent implements OnInit {
  isLoading = false;

  personne: PersonnelModel;

  preference: PreferenceModel;

  currentUser: PersonnelModel | any;
 

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private personnelService: PersonnelService,
    private salaireService: SalaireService,
    private reglageService: ReglageService,
    private toastr: ToastrService) {}


    ngOnInit(): void {
      this.isLoading = true;
      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
          this.personnelService.get(Number(id)).subscribe(res => {
            this.personne = res;
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


    onSubmit() {
      try {
        this.isLoading = true; 
        // let logement = this.personne.
         
        var body = {
          personnel: this.personne.id,
          monnaie: this.preference.monnaie,
          // alloc_logement: string,
          // alloc_transport: string,
          // alloc_familliale: string,
          // salaire_base: string,  // Par jour 
          // primes: string,
          // prime_anciennete: string,
          // heures_supp: number,
          // conge_paye: string,
          // nbre_jrs_preste: number, // Nombre de jours presents
          // rbi: string,  // Remuneration brute imposable
          // cnss_qpo: string, // Impôt de 5% => 0.05
          // rni: string,  // Remuneration Nette Imposable
          // ipr: string,  // Impôt Professionnel sur les Rémunérations (IPR)
          // syndicat: string,  // 1 % 
          // penalites: string,  // Sanctions sur le salaire net à payer
          // net_a_payer: string,
          statut: 'Traitement',
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        };
        this.salaireService.create(body).subscribe({
          next: (res) => { 
            const dateNow = new Date();
            const dateMonth = dateNow.getMonth() + 1;
            var personnel = { 
              is_paie: dateMonth,
              signature: this.currentUser.matricule,
              created: new Date(),
              update_created: new Date(),
              entreprise: this.currentUser.entreprise,
              code_entreprise: this.currentUser.code_entreprise
            };
            this.personnelService.update(this.personne.id, personnel).subscribe({
              next: personne => {
                this.isLoading = false; 
                console.log(personne);
                this.toastr.success('Success!', 'Genéré avec succès!');
                this.router.navigate(['/layouts/salaires/traitement', res['id'], 'fiche-paie']);
              },
              error: err => {
                this.isLoading = false;
                this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
                console.log(err);
              }
            }); 
          }, 
          error: (err) => {
            this.isLoading = false;
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        });
        
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    } 
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
