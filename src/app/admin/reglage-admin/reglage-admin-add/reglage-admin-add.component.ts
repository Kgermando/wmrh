import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ReglageService } from 'src/app/preferences/reglages/reglage.service';

@Component({
  selector: 'app-reglage-admin-add',
  templateUrl: './reglage-admin-add.component.html',
  styleUrls: ['./reglage-admin-add.component.scss']
})
export class ReglageAdminAddComponent implements OnInit {

  isLoading: boolean = false; 
  formGroup!: FormGroup; 

  constructor( public themeService: CustomizerSettingsService, 
    private _formBuilder: FormBuilder,
    private router: Router,
    private reglageService: ReglageService,
    private toastr: ToastrService) {}

    ngOnInit(): void {
      this.formGroup = this._formBuilder.group({
        company_name: ['', Validators.required],
        nbr_employe: ['', Validators.required],
        cnss: ['', Validators.required],
        rccm: ['', Validators.required],
        id_nat: ['', Validators.required],
        numero_impot: ['', Validators.required],
        email: ['', Validators.required],
        telephone: ['', Validators.required],
        adresse: ['', Validators.required],
      });
    }
    
    
    onSubmit() {
      try {
        if (this.formGroup.valid) {
          this.isLoading = true;
          var code = Math.floor(1000 + Math.random() * 9000);
          console.log("code", code);
          var body = {
            company_name: this.formGroup.value.company_name,
            nbr_employe: this.formGroup.value.nbr_employe,
            cnss: this.formGroup.value.cnss,
            rccm: this.formGroup.value.rccm,
            id_nat: this.formGroup.value.id_nat,
            numero_impot: this.formGroup.value.numero_impot,
            email: this.formGroup.value.email,
            telephone: this.formGroup.value.telephone,
            adresse: this.formGroup.value.adresse,
            date_paie: "2023-06-27 15:45:59.632",
            cnss_qpp: "13",
            inpp: "2",
            onem: "0.2",
            cotisation_syndicale: "1",
            cnss_qpo: "5",
            monnaie: "USD",
            nbre_heure_travail: "45",
            taux_dollard: "2300",
            new_year: "2024-01-01 15:45:59.632",
            noel: "2023-12-25 15:45:59.632",
            martyr_day: "2024-01-04 15:45:59.632",
            kabila_day: "2024-01-16 15:45:59.632",
            lumumba_day: "2024-01-17 15:45:59.632",
            labour_day: "2024-06-01 15:45:59.632",
            liberation_day: "2024-05-17 15:45:59.632", 
            indepence_day: "2024-06-30 15:45:59.632", 
            parent_day: "2023-08-01 15:45:59.632",
            kimbangu_day: "2024-05-06 15:45:59.632", 
            prime_ancien_0: 0,
            prime_ancien_5: 2,
            prime_ancien_10: 4,
            prime_ancien_15: 6,
            prime_ancien_20: 8,
            prime_ancien_25: 10,
            categorie_mo: 10,
            categorie_ts: 10,
            categorie_tsq: 10,
            categorie_tq: 10,
            categorie_thq: 10,
            smig: 267,
            prise_en_charge_frais_bancaire: 0,
            courses_transport: 6,
            montant_travailler_quadre: 2000,
            montant_travailler_non_quadre: 1500,
            bareme_3: 162000,
            bareme_15: 1800000,
            bareme_30: 3600000,
            nbr_course: 6,
            contre_valeur_logement: 30,
            signature: "-",   
            created: "2023-07-19 08:45:59.632", 
            update_created: "2023-07-19 08:45:59.632", 
            entreprise: this.formGroup.value.company_name,
            code_entreprise: code
          };
          this.reglageService.create(body).subscribe({
            next: () => {
              this.isLoading = false;
              this.formGroup.reset();
              this.toastr.success('Ajouter avec succès!', 'Success!');
              this.router.navigate(['/layouts/support/reglages-admin']);
            },
            error: (err) => {
              this.isLoading = false;
              this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
              console.log(err);
            }
          });
        } 
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    } 
  
}
