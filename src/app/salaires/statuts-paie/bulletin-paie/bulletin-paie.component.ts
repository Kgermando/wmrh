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
  title = 'Bulletin de paie';

  isLoading = false;

  salaire: SalaireModel;

  preference: PreferenceModel;

  currentUser: PersonnelModel | any;

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
  prise_en_charge_frais_bancaireUSD = 0; 
  cnss_qpoUSD = 0;
    

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
          let id = this.route.snapshot.paramMap.get('id');
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

              var prise_en_charge_frais_bancaire = parseFloat(this.salaire.prise_en_charge_frais_bancaire)  / this.preference.taux_dollard;
              this.prise_en_charge_frais_bancaireUSD = parseFloat(prise_en_charge_frais_bancaire.toFixed(2)); 

              var cnss_qpo = parseFloat(this.salaire.cnss_qpo)  / this.preference.taux_dollard;
              this.cnss_qpoUSD = parseFloat(cnss_qpo.toFixed(2)); 
            }); 
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
 
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
