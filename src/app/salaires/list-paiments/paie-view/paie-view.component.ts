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
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-paie-view',
  templateUrl: './paie-view.component.html',
  styleUrls: ['./paie-view.component.scss']
})
export class PaieViewComponent implements OnInit {
  isLoading = false;
  isLoadingSubmit = false;

  personne: PersonnelModel;

  preference: PreferenceModel;

  currentUser: PersonnelModel | any;

  nbreJrsPreste = 0;
  congepayeNbr = 0;
  nbrHeureSupp = 0;
  primeNbr = 0;
  primeAncennete = 0;
  penaliteNbr = 0;
  avanceSalaireNbr = 0;
  allocLogement = 0;
  allocTransport = 0;
  allocFamilliale = 0;

  rbi = 0;
  rni = 0;
  ipr = 0;

  dateNow = new Date();
  dateMonth = this.dateNow.getMonth() + 1;
 

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
            this.reglageService.preference(this.currentUser.code_entreprise).subscribe(res => {
              this.preference = res; 
            });
            this.salaireService.primeTotal(this.currentUser.code_entreprise, this.personne.id).subscribe(prime => {
              var primes  = prime;
              primes.map((item: any) => this.primeNbr = parseFloat(item.sum));
              console.log(`primeNbr ${this.primeNbr}`);
            });
            this.salaireService.penaliteTotal(this.currentUser.code_entreprise, this.personne.id).subscribe(penalite => {
              var penalites  = penalite;
              penalites.map((item: any) => this.penaliteNbr = parseFloat(item.sum));
              console.log(`penaliteNbr ${this.penaliteNbr}`);
            });
            this.salaireService.nbrHeureSupp(this.currentUser.code_entreprise, this.personne.id).subscribe(
              heureSup => {
                var heureSupp  = heureSup;
                heureSupp.map((item: any) => this.nbrHeureSupp = parseFloat(item.sum)); 
                console.log(`nbrHeureSupp ${this.nbrHeureSupp}`);
              }
            );
            this.salaireService.avanceSalaireTotal(this.currentUser.code_entreprise, this.personne.id).subscribe(
              avanceSalaire => {
                var avanceSalaires = avanceSalaire; 
                avanceSalaires.map((item: any) => this.avanceSalaireNbr = parseFloat(item.sum));
                console.log(`avanceSalaireNbr ${this.avanceSalaireNbr}`);
              }
            );
            this.salaireService.getJrPrestE(this.currentUser.code_entreprise, this.personne.matricule).subscribe(
              jrsPreste => {
                var jrsPrestE = jrsPreste; 
                jrsPrestE.map((item: any) => this.nbreJrsPreste = parseFloat(item.presence));
                console.log(`nbreJrsPreste ${this.nbreJrsPreste}`);
              }
            );
            this.salaireService.getJrCongePayE(this.currentUser.code_entreprise, this.personne.matricule).subscribe(
              jrsCongE => {
                var congepayes = jrsCongE; 
                congepayes.map((item: any) => this.congepayeNbr = parseFloat(item.conge));
                console.log(`congepayeNbr ${this.congepayeNbr}`);
              }
            );
            var date_debut = formatDate(this.personne.date_debut_contrat, 'yyyy-MM-dd', 'en-US') 
            this.salaireService.getAnciennete(this.currentUser.code_entreprise, this.personne.id, date_debut).subscribe(
              date_debut_contrat => {
                var date_debut_contrats = date_debut_contrat;  
                date_debut_contrats.map((item: any) => this.primeAncennete = parseFloat(item.age['years']));
                console.log(`primeAncennete ${this.primeAncennete}`)
              }
            );
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
        this.isLoadingSubmit = true;

        var salaire = 0;
        var alloc_famillialeMonnaie = 0;
        var alloc_transportMonnaie = 0;
        var alloc_logementMonnaie = 0;
        var primeMonnaie = 0;
        var penaliteMonnaie = 0;
        var avanceSalaireMonnaie = 0;

        if (this.personne.monnaie == 'USD') {
          salaire = parseFloat(this.personne.salaire_base) * this.preference.taux_dollard;
            alloc_famillialeMonnaie = parseFloat(this.personne.alloc_familliale) * this.preference.taux_dollard;
            alloc_transportMonnaie = parseFloat(this.personne.alloc_transport) * this.preference.taux_dollard;
            alloc_logementMonnaie = parseFloat(this.personne.alloc_logement) * this.preference.taux_dollard;
            primeMonnaie = this.primeNbr * this.preference.taux_dollard;
            penaliteMonnaie = this.penaliteNbr * this.preference.taux_dollard;
            avanceSalaireMonnaie = this.avanceSalaireNbr * this.preference.taux_dollard;
        } else if (this.personne.monnaie == 'CDF'){
          if (this.preference.monnaie == 'USD') {
            salaire = parseFloat(this.personne.salaire_base) * this.preference.taux_dollard;
            alloc_famillialeMonnaie = parseFloat(this.personne.alloc_familliale) * this.preference.taux_dollard;
            alloc_transportMonnaie = parseFloat(this.personne.alloc_transport) * this.preference.taux_dollard;
            alloc_logementMonnaie = parseFloat(this.personne.alloc_logement) * this.preference.taux_dollard;
            primeMonnaie = this.primeNbr * this.preference.taux_dollard;
            penaliteMonnaie = this.penaliteNbr * this.preference.taux_dollard;
            avanceSalaireMonnaie = this.avanceSalaireNbr * this.preference.taux_dollard; 
          } 
          salaire =  parseFloat(this.personne.salaire_base);
          alloc_famillialeMonnaie = parseFloat(this.personne.alloc_familliale);
          alloc_transportMonnaie = parseFloat(this.personne.alloc_transport);
          alloc_logementMonnaie = parseFloat(this.personne.alloc_logement);
          primeMonnaie = this.primeNbr;
          penaliteMonnaie = this.penaliteNbr;
          avanceSalaireMonnaie = this.avanceSalaireNbr;
        }

        var salaire_base = 0;
        
        if (this.congepayeNbr >= 1) {
          salaire_base = (salaire * this.nbreJrsPreste) * 2/3;
        } else {
          salaire_base = salaire * this.nbreJrsPreste;
        }

        console.log(`salaire_base ${salaire_base}`);

        var ancennete = 0;
        if (this.primeAncennete >=5) {
          ancennete = salaire_base * this.preference.prime_ancien_5 / 100;
        } else if(this.primeAncennete >=10) {
          ancennete = salaire_base * this.preference.prime_ancien_10 / 100;
        } else if(this.primeAncennete >=15) {
          ancennete = salaire_base * this.preference.prime_ancien_15 / 100;
        } else if(this.primeAncennete >=20) {
          ancennete = salaire_base * this.preference.prime_ancien_20 / 100;
        } else if(this.primeAncennete >=25) {
          ancennete = salaire_base * this.preference.prime_ancien_25 / 100;
        }

        var heureSupplementaireMonnaie = 0;

        if (this.nbrHeureSupp === 2) {
          heureSupplementaireMonnaie = salaire_base * 30 / 100;
        } else if(this.nbrHeureSupp > 2) {
          heureSupplementaireMonnaie = salaire_base * 60 / 100;
        } else if(this.nbrHeureSupp > 8) {
          heureSupplementaireMonnaie = salaire_base * 100 / 100;
        }

        var alloc_familliale = alloc_famillialeMonnaie * this.personne.nbr_dependants * this.nbreJrsPreste;
        var alloc_transport = alloc_transportMonnaie * this.nbreJrsPreste;

        // Remuneration Brute impôsable
        var rbi = salaire_base + alloc_logementMonnaie + 
            alloc_transport + alloc_familliale +
            primeMonnaie + ancennete + heureSupplementaireMonnaie;

        // Remuneration Nette impôsable
        var rni = rbi - (rbi * parseFloat(this.preference.cnss_qpo) / 100); // RNI = RBI(RBI * CNSQPO)


        // Calcul IPR retenu
        var iprRetenu = 0;
        var iprTrois = 0;
        var iprQuinze = 0;
        var iprTrente = 0;

        if (rni <= 162000) {
          iprRetenu = rni * 3 / 100;
          iprTrois = (162000 - 0) * 3 / 100;

        } else if (rni <= 1800000){
          iprRetenu = (rni - 162000) * 15 / 100 + iprTrois;

          iprQuinze = 1800000 * 15 / 100;

        } else if (rni <= 3600000){
          iprRetenu = (rni - 3600000) * 30 / 100 + iprTrois + iprQuinze;
          iprTrente = 1800000 * 30 / 100;

        } else if (rni > 3600001){
          iprRetenu = (rni - 3600000) * 40 / 100 + iprTrois + iprQuinze + iprTrente;
        } 


        // IPR à payé
        var iprApeyE = iprRetenu - (0.02 * iprRetenu * this.personne.nbr_dependants);

        // Syndicat souscrit
        var syndicat = 0;
        if (this.personne.syndicat) {
          syndicat = salaire_base * parseFloat(this.preference.cotisation_syndicale) / 100;
        }
        

        var deductions = rni - penaliteMonnaie - avanceSalaireMonnaie

        var totalAPayE = iprApeyE + alloc_logementMonnaie + 
            alloc_transport + alloc_familliale +
            primeMonnaie + ancennete + heureSupplementaireMonnaie;
        

        var net_a_payer = totalAPayE - deductions;

        var body = {
          personnel: this.personne.id,
          monnaie: this.personne.monnaie,
          taux_dollard: this.preference.taux_dollard,
          nbr_dependants: this.personne.nbr_dependants, 
          alloc_logement: alloc_logementMonnaie,
          alloc_transport: alloc_transport,
          alloc_familliale: alloc_familliale,
          salaire_base: salaire_base,  // Par jour * 26
          primes: primeMonnaie,
          prime_anciennete: ancennete,
          heures_supp: this.nbrHeureSupp,
          heureSupplementaireMonnaie: heureSupplementaireMonnaie,
          conge_paye: this.congepayeNbr,
          nbre_jrs_preste: this.nbreJrsPreste, // Nombre de jours presents
          rbi: rbi,  // Remuneration brute imposable
          cnss_qpo: this.preference.cnss_qpo, // Impôt de 5% => 0.05
          rni: rni,  // Remuneration Nette Imposable
          ipr: iprApeyE,  // Impôt Professionnel sur les Rémunérations (IPR)
          syndicat: syndicat,  // 1 %
          penalites: penaliteMonnaie,  // Sanctions sur le salaire net à payer
          avance_slaire: avanceSalaireMonnaie,
          net_a_payer: net_a_payer,
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
                this.isLoadingSubmit = false; 
                console.log(personne);
                this.toastr.success('Success!', 'Genéré avec succès!');
                this.router.navigate(['/layouts/salaires/traitement', res['id'], 'fiche-paie']);
              },
              error: err => {
                this.isLoadingSubmit = false;
                this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
                console.log(err);
              }
            }); 
          }, 
          error: (err) => {
            this.isLoadingSubmit = false;
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        });
        
        this.isLoadingSubmit = false;
      } catch (error) {
        this.isLoadingSubmit = false;
        console.log(error);
      }
    } 
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
