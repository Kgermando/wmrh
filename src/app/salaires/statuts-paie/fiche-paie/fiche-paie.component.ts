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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeureSuppService } from 'src/app/heures-supp/heure-supp.service';
import { PrimeService } from 'src/app/primes/prime.service';
import { PenaliteService } from 'src/app/penalites/penalite.service';
import { AvanceSalaireService } from 'src/app/avance-salaires/avance-salaire.service';
import { PresenceService } from 'src/app/presences/presence.service';
import { ApointementModel } from 'src/app/presences/models/presence-model';
import { HeureSuppModel } from 'src/app/heures-supp/models/heure-supp-model';
import { PrimeModel } from 'src/app/primes/models/prime-model';
import { PenaliteModel } from 'src/app/penalites/models/penalite-model';
import { AvanceSalaireModel } from 'src/app/avance-salaires/models/avance-salaire-model';

@Component({
  selector: 'app-fiche-paie',
  templateUrl: './fiche-paie.component.html',
  styleUrls: ['./fiche-paie.component.scss']
})
export class FichePaieComponent implements OnInit {
  isLoading = false;

  title = 'Traitement de la Fiche de paie';

  salaire: SalaireModel;

  preference: PreferenceModel;

  currentUser: PersonnelModel | any;

  presenceList: ApointementModel[] = [];
  presenceFilter: ApointementModel[] = [];
  nbrHeureSuppList: HeureSuppModel[] = [];
  primeList: PrimeModel[] = [];
  penaliteList: PenaliteModel[] = [];
  AvanceSalaireList: AvanceSalaireModel[] = [];

 
  formGroup!: FormGroup;
 

  rbiUSD = 0;
  rniUSD = 0;
  iprUSD = 0;
  syndicatUSD = 0;
  net_a_payerUSD = 0;
  penalitesUSD = 0;
  avanceSalaireNbrUSD = 0;
  heureSupplementaireMonnaieUSD = 0;
  primesUSD = 0;
  prime_ancienneteUSD = 0;
  alloc_famillialeUSD = 0;
  alloc_transportUSD = 0;
  alloc_logementUSD = 0;
  salaire_baseUSD = 0;

    

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private salaireService: SalaireService,
    private reglageService: ReglageService, 
    private toastr: ToastrService) {}


    ngOnInit(): void {
      this.isLoading = true;
      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          let id = this.route.snapshot.paramMap.get('id'); 
          // const dateNow = new Date();
          // const dateMonth = dateNow.getMonth() + 1;
          this.salaireService.get(Number(id)).subscribe(res => {
            this.salaire = res; 

            this.reglageService.preference(this.currentUser.code_entreprise).subscribe(reglage => {
              this.preference = reglage;
              
              var net_a_payer = parseFloat(this.salaire.net_a_payer)  / this.preference.taux_dollard;
              this.net_a_payerUSD = parseFloat(net_a_payer.toFixed(2)); 

              var rbi = parseFloat(this.salaire.rbi)  / this.preference.taux_dollard;
              this.rbiUSD = parseFloat(rbi.toFixed(2));

              var rni = parseFloat(this.salaire.rni)  / this.preference.taux_dollard;
              this.rniUSD = parseFloat(rni.toFixed(2));

              var ipr = parseFloat(this.salaire.ipr)  / this.preference.taux_dollard;
              this.iprUSD = parseFloat(ipr.toFixed(2));

              var syndicat = parseFloat(this.salaire.syndicat)  / this.preference.taux_dollard;
              this.syndicatUSD = parseFloat(syndicat.toFixed(2));

              var avance_slaire = parseFloat(this.salaire.avance_slaire)  / this.preference.taux_dollard;
              this.avanceSalaireNbrUSD = parseFloat(avance_slaire.toFixed(2));

              var penalites = parseFloat(this.salaire.penalites)  / this.preference.taux_dollard;
              this.penalitesUSD = parseFloat(penalites.toFixed(2));

              var heureSupplementaireMonnaie = parseFloat(this.salaire.heureSupplementaireMonnaie)  / this.preference.taux_dollard;
              this.heureSupplementaireMonnaieUSD = parseFloat(heureSupplementaireMonnaie.toFixed(2));

              var primes = parseFloat(this.salaire.primes)  / this.preference.taux_dollard;
              this.primesUSD = parseFloat(primes.toFixed(2));

              var prime_anciennete = parseFloat(this.salaire.prime_anciennete)  / this.preference.taux_dollard;
              this.prime_ancienneteUSD = parseFloat(prime_anciennete.toFixed(2));

              var alloc_familliale = parseFloat(this.salaire.alloc_familliale)  / this.preference.taux_dollard;
              this.alloc_famillialeUSD = parseFloat(alloc_familliale.toFixed(2));

              var alloc_transport = parseFloat(this.salaire.alloc_transport)  / this.preference.taux_dollard;
              this.alloc_transportUSD = parseFloat(alloc_transport.toFixed(2));

              var alloc_logement = parseFloat(this.salaire.alloc_logement)  / this.preference.taux_dollard;
              this.alloc_logementUSD = parseFloat(alloc_logement.toFixed(2));

              var salaire_base = parseFloat(this.salaire.salaire_base)  / this.preference.taux_dollard;
              this.salaire_baseUSD = parseFloat(salaire_base.toFixed(2));
              
              
              
            });
 
 

            this.formGroup = this._formBuilder.group({
              alloc_logement: ['', Validators.required],
              alloc_transport: ['', Validators.required],
              alloc_familliale: ['', Validators.required],
              salaire_base: [''],
              primes: ['', Validators.required],
              prime_anciennete: ['', Validators.required],
              heures_supp: [``, Validators.required],
              conge_paye: ['', Validators.required],
              nbre_jrs_preste: ['', Validators.required],
              rbi: ['', Validators.required],
              cnss_qpo: ['', Validators.required],
              rni: ['', Validators.required],
              ipr: ['', Validators.required],
              syndicat: ['', Validators.required],
              penalites: ['', Validators.required],
              net_a_payer: ['', Validators.required],
            });
             
            // this.salaireService.get(this.id).subscribe(item => {
            //   this.formGroup.patchValue({
            //     search_profil: item.search_profil,
            //     resume: item.resume,
            //     type_contrat: item.type_contrat,
            //     statut: item.statut,
            //     echeance: item.echeance,
            //     signature: this.currentUser.matricule,
            //     update_created: new Date()
            //   }); 
            // });




            
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
        var codeEntreprise = this.currentUser.code_entreprise;
        var mat = this.formGroup.value.matricule;
        var identifiant = `${mat}-${codeEntreprise}`
        if (this.formGroup.valid) {
          var body = {
            nom: this.formGroup.value.nom,
            postnom: this.formGroup.value.postnom,
            prenom: this.formGroup.value.prenom,
            email: this.formGroup.value.email,
            telephone: this.formGroup.value.telephone,
            sexe: this.formGroup.value.sexe,
            adresse: this.formGroup.value.adresse, 
            matricule: identifiant.toLowerCase(),
            category: this.formGroup.value.category,
            role: this.formGroup.value.role, 
            signature: this.currentUser.matricule,
            created: new Date(),
            update_created: new Date(),
            entreprise: this.currentUser.entreprise,
            code_entreprise: this.currentUser.code_entreprise
          };
          this.salaireService.create(body).subscribe({
            next: () => {
              this.isLoading = false;
              this.formGroup.reset();
              this.toastr.success('Success!', 'Ajouter avec succès!');
              this.router.navigate(['/layouts/salaires/statuts-paies']);
            },
            error: (err) => {
              this.isLoading = false;
              this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
              console.log(err);
            }
          });
        }
        
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
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
