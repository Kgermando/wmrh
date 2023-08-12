import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { PersonnelService } from 'src/app/personnels/personnel.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 

@Component({
  selector: 'app-fiche-paie',
  templateUrl: './fiche-paie.component.html',
  styleUrls: ['./fiche-paie.component.scss']
})
export class FichePaieComponent implements OnInit {
  isLoading = false;

  title = 'Traitement de la Fiche de paie';

  @ViewChild('htmlData', { static: false}) htmlData!: ElementRef;

  isPublie = false;

  salaire: SalaireModel;

  preference: PreferenceModel;

  currentUser: PersonnelModel | any;

  formGroup!: FormGroup;
 

  alloc_logement = 0;
  alloc_transport = 0;
  alloc_familliale = 0;
  soins_medicaux = 0;
  salaire_base = 0;
  primes = 0;
  prime_anciennete = 0;
  heure_supplementaire_monnaie = 0;
  rbi = 0;
  rni = 0;
  ipr = 0;
  impot_elide = 0;
  syndicat = 0;
  cnss_qpo = 0;
  penalites = 0;
  avance_slaire = 0;
  prise_en_charge_frais_bancaire = 0; 
  net_a_payer = 0;


  // Condition pour verrouiller l'allocation input si negatif
  alloc_logementPlafond = 0;
  alloc_transportPlafond = 0;
  alloc_famillialePlafond = 0;
  redressement = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private salaireService: SalaireService,
    private reglageService: ReglageService,
    private personnelService: PersonnelService,
    private toastr: ToastrService) {} 

    public toggle(event: MatSlideToggleChange) {
      this.isPublie = event.checked;
    }


    ngOnInit(): void {
      this.isLoading = true;
      this.formGroup = this._formBuilder.group({
        alloc_logement: ['', Validators.required],
        alloc_transport: ['', Validators.required],
        alloc_familliale: ['', Validators.required],
        soins_medicaux: ['', Validators.required],
        salaire_base: ['', Validators.required],
        primes: ['', Validators.required],
        prime_anciennete: ['', Validators.required],
        heure_supplementaire_monnaie: ['', Validators.required],
        rbi: ['', Validators.required],
        rni: ['', Validators.required],
        ipr: ['', Validators.required],
        impot_elide: ['', Validators.required],
        syndicat: ['', Validators.required],
        cnss_qpo: ['', Validators.required],
        penalites: ['', Validators.required],
        avance_slaire: ['', Validators.required],
        prise_en_charge_frais_bancaire: ['', Validators.required],
        net_a_payer: ['', Validators.required],
        statut: this.isPublie ? 'Disponible' : 'Traitement', 



        // salaire_base: ['', Validators.required],
        // alloc_logement: ['', Validators.required],
        // alloc_transport: ['', Validators.required],
        // alloc_familliale: ['', Validators.required],
        // soins_medicaux: ['', Validators.required],
        // primes: ['', Validators.required], 
        // rni: ['', Validators.required], 
        // ipr: ['', Validators.required],
        // prime_anciennete: ['', Validators.required],
        // heure_supplementaire_monnaie: ['', Validators.required],
        
      });

      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          let id = this.route.snapshot.paramMap.get('id');
          this.salaireService.get(Number(id)).subscribe(res => {
            this.salaire = res; 
            this.reglageService.preference(this.currentUser.code_entreprise).subscribe(reglage => {
              this.preference = reglage;
              if (this.salaire.personnel.monnaie == 'USD') {
                this.formGroup.patchValue({
                  alloc_logement: parseFloat(this.salaire.alloc_logement) * this.preference.taux_dollard,
                  alloc_transport: parseFloat(this.salaire.alloc_transport) * this.preference.taux_dollard,
                  alloc_familliale: parseFloat(this.salaire.alloc_familliale) * this.preference.taux_dollard,
                  soins_medicaux: parseFloat(this.salaire.soins_medicaux) * this.preference.taux_dollard,
                  salaire_base: parseFloat(this.salaire.salaire_base) * this.preference.taux_dollard,
                  primes: parseFloat(this.salaire.primes) * this.preference.taux_dollard,
                  prime_anciennete: parseFloat(this.salaire.prime_anciennete) * this.preference.taux_dollard,
                  heure_supplementaire_monnaie: parseFloat(this.salaire.heure_supplementaire_monnaie) * this.preference.taux_dollard,
                  rbi: parseFloat(this.salaire.rbi) * this.preference.taux_dollard,  // Remuneration brute imposable
                  rni: parseFloat(this.salaire.rni) * this.preference.taux_dollard,  // Remuneration Nette Imposable
                  ipr: parseFloat(this.salaire.ipr) * this.preference.taux_dollard,  // Impôt Professionnel sur les Rémunérations (IPR)
                  impot_elide: parseFloat(this.salaire.impot_elide) * this.preference.taux_dollard,
                  syndicat: parseFloat(this.salaire.syndicat) * this.preference.taux_dollard,  // 1 %
                  penalites: parseFloat(this.salaire.penalites) * this.preference.taux_dollard,  // Sanctions sur le salaire net à payer
                  avance_slaire: parseFloat(this.salaire.avance_slaire) * this.preference.taux_dollard,
                  prise_en_charge_frais_bancaire:  parseFloat(this.salaire.prise_en_charge_frais_bancaire) * this.preference.taux_dollard,
                  net_a_payer: parseFloat(this.salaire.net_a_payer) * this.preference.taux_dollard,
                  statut: this.isPublie ? 'Disponible' : 'Traitement',
                  signature: this.currentUser.matricule,
                  update_created: new Date(),
                  entreprise: this.currentUser.entreprise,
                  code_entreprise: this.currentUser.code_entreprise
                });
              } else if (this.salaire.personnel.monnaie == 'CDF') { 
                this.formGroup.patchValue({
                  alloc_logement: parseFloat(this.salaire.alloc_logement),
                  alloc_transport: parseFloat(this.salaire.alloc_transport),
                  alloc_familliale: parseFloat(this.salaire.alloc_familliale),
                  soins_medicaux: parseFloat(this.salaire.soins_medicaux),
                  salaire_base: parseFloat(this.salaire.salaire_base),
                  primes: parseFloat(this.salaire.primes),
                  prime_anciennete: parseFloat(this.salaire.prime_anciennete),
                  heure_supplementaire_monnaie: parseFloat(this.salaire.heure_supplementaire_monnaie),
                  rbi: this.rbi,  // Remuneration brute imposable
                  rni: parseFloat(this.salaire.rni),  // Remuneration Nette Imposable
                  ipr: parseFloat(this.salaire.ipr),  // Impôt Professionnel sur les Rémunérations (IPR)
                  impot_elide: parseFloat(this.salaire.impot_elide),
                  syndicat: parseFloat(this.salaire.syndicat),  // 1 %
                  penalites: parseFloat(this.salaire.penalites),  // Sanctions sur le salaire net à payer
                  avance_slaire: parseFloat(this.salaire.avance_slaire),
                  prise_en_charge_frais_bancaire:  parseFloat(this.salaire.prise_en_charge_frais_bancaire),
                  net_a_payer: parseFloat(this.salaire.net_a_payer),
                  statut: this.isPublie ? 'Disponible' : 'Traitement',
                  signature: this.currentUser.matricule,
                  update_created: new Date(),
                  entreprise: this.currentUser.entreprise,
                  code_entreprise: this.currentUser.code_entreprise
                });
              }
            });

            this.onChanges();
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

    onChanges(): void {
      this.formGroup.valueChanges.subscribe(val => {

      // Variables 
      this.salaire_base = +val.salaire_base;
      this.soins_medicaux = +val.soins_medicaux; 

      // Aciennetés
      if (this.salaire.anciennete_nbr_age >=5) {
        this.prime_anciennete = this.salaire_base * this.preference.prime_ancien_5 / 100;
      } else if(this.salaire.anciennete_nbr_age >=10) {
        this.prime_anciennete = this.salaire_base * this.preference.prime_ancien_10 / 100;
      } else if(this.salaire.anciennete_nbr_age >=15) {
        this.prime_anciennete = this.salaire_base * this.preference.prime_ancien_15 / 100;
      } else if(this.salaire.anciennete_nbr_age >=20) {
        this.prime_anciennete = this.salaire_base * this.preference.prime_ancien_20 / 100;
      } else if(this.salaire.anciennete_nbr_age >=25) {
        this.prime_anciennete = this.salaire_base * this.preference.prime_ancien_25 / 100;
      }

      // Se refère dans les donnés de heures pour les conditions
      if (this.salaire.heures_supp === 2) {
        this.heure_supplementaire_monnaie = this.salaire_base * 30 / 100;
      } else if(this.salaire.heures_supp > 2) {
        this.heure_supplementaire_monnaie = this.salaire_base * 60 / 100;
      } else if(this.salaire.heures_supp >= 8) {
        this.heure_supplementaire_monnaie = this.salaire_base * 100 / 100;
      }
 

      // Remuneration Brute impôsable
      this.rbi = this.salaire_base + +val.primes + this.prime_anciennete + this.heure_supplementaire_monnaie;


      // Avantages sociaux
      this.alloc_familliale = +val.alloc_familliale;
      this.alloc_transport = +val.alloc_transport;
      this.alloc_logement = +val.alloc_logement;


      // L'allocation familliale
      this.alloc_famillialePlafond = (parseFloat(this.preference.smig) *  
            this.salaire.personnel.nbr_dependants * this.salaire.nbre_jrs_preste);

       var alloc_famillialeExces = 0;
        if (this.alloc_familliale > this.alloc_famillialePlafond) {
          alloc_famillialeExces = this.alloc_familliale - this.alloc_famillialePlafond;
        } else if (this.alloc_famillialePlafond <= this.alloc_familliale) {
          alloc_famillialeExces = 0;
        } 

        // L'allocation transport
        if (this.salaire.personnel.category === 'Cadres supérieurs' ||
            this.salaire.personnel.category === 'Cadres subalternes') {
              this.alloc_transportPlafond = (this.preference.courses_transport * 
                parseFloat(this.preference.montant_travailler_quadre) * this.salaire.nbre_jrs_preste);  
        } else {
          this.alloc_transportPlafond = (this.preference.courses_transport * 
            parseFloat(this.preference.montant_travailler_non_quadre) * this.salaire.nbre_jrs_preste);  
        }

        var alloc_transportExces = 0;
        if (this.alloc_transport > this.alloc_transportPlafond) {
          alloc_transportExces = this.alloc_transport - this.alloc_transportPlafond;
        } else if (this.alloc_transport <= this.alloc_transportPlafond) {
          alloc_transportExces = 0;
        } 

        // L'allocation logement à ne pas dépasser
        this.alloc_logementPlafond = this.rbi * 30 / 100; // Le logement ne depasse le 30% de rbi 
        
        var alloc_logementExces = 0;
        if (this.alloc_logement > this.alloc_logementPlafond) {
          alloc_logementExces = this.alloc_logement - this.alloc_logementPlafond;
        } else if (this.alloc_logement <= this.alloc_logementPlafond) {
          alloc_logementExces = 0;
        } 
      
      // Redressement de la base net imposable
      this.redressement = (alloc_famillialeExces + alloc_transportExces + alloc_logementExces + this.soins_medicaux);

      // NETTE IMPOSABELE
      this.cnss_qpo = this.rbi * parseFloat(this.preference.cnss_qpo) / 100; // (RBI * CNSQPO)

      // Remuneration Nette impôsable
      this.rni = this.rbi - this.cnss_qpo + this.redressement; // RNI = RBI-(RBI * CNSQPO) 

      

    // Calcul IPR retenu
      var iprRetenu = 0;
      var iprTrois = 0;
      var iprQuinze = 0;
      var iprTrente = 0;

      if (this.rni <= +this.preference.bareme_3) {
        iprRetenu = this.rni * 3 / 100;
        iprTrois = (+this.preference.bareme_3 - 0) * 3 / 100;

      } else if (this.rni <= +this.preference.bareme_15){
        iprRetenu = (this.rni - +this.preference.bareme_3) * 15 / 100 + iprTrois;
        iprQuinze = +this.preference.bareme_15 * 15 / 100;

      } else if (this.rni <= +this.preference.bareme_30){
        iprRetenu = (this.rni - +this.preference.bareme_30) * 30 / 100 + iprTrois + iprQuinze;
        iprTrente = +this.preference.bareme_15 * 30 / 100;

      } else if (this.rni > +this.preference.bareme_30 + 1){
        iprRetenu = (this.rni - +this.preference.bareme_30) * 40 / 100 + iprTrois + iprQuinze + iprTrente;
      }

 
      // IPR à payé 
      this.ipr = iprRetenu - (iprRetenu * this.salaire.personnel.nbr_dependants * 2 / 100);

      // Impôt Elide trouvé 
      this.impot_elide = this.redressement - this.ipr;

      if (this.impot_elide > 0) {
        this.impot_elide = this.impot_elide;
      } else {
        this.impot_elide = 0;
      }

   
      if (this.salaire.personnel.syndicat) {
        this.syndicat = this.rni * parseFloat(this.preference.cotisation_syndicale) / 100;
      }

      // prise_en_charge_frais_bancaire
      if(this.preference.prise_en_charge_frais_bancaire) {
        this.prise_en_charge_frais_bancaire = parseFloat(this.salaire.personnel.frais_bancaire);
      }

      var deductions = this.ipr + this.penalites + this.avance_slaire + this.syndicat;

      var avantageSocials = +this.alloc_logement + +this.alloc_familliale  +  +val.primes +
        +this.prime_anciennete + +this.heure_supplementaire_monnaie + 
          +this.prise_en_charge_frais_bancaire + +val.soins_medicaux;
 

        let net_a_payE = this.rni + avantageSocials - deductions;

        this.net_a_payer = parseFloat(net_a_payE.toFixed(2));
      });
    }

        
  

    onSubmit() { 
      try {
        this.isLoading = true;
        this.formGroup.patchValue({
          alloc_logement: this.alloc_logement,
          alloc_transport: this.alloc_transport,
          alloc_familliale: this.alloc_familliale,
          soins_medicaux: this.soins_medicaux,
          salaire_base: this.salaire_base,
          primes: this.primes,
          prime_anciennete: this.prime_anciennete,
          heure_supplementaire_monnaie: this.heure_supplementaire_monnaie,
          rbi: this.rbi,
          rni: this.rni,
          ipr: this.ipr,
          impot_elide: this.impot_elide,
          syndicat: this.syndicat,
          cnss_qpo: this.cnss_qpo,
          penalites: this.penalites,
          avance_slaire: this.avance_slaire,
          prise_en_charge_frais_bancaire: this.prise_en_charge_frais_bancaire,
          net_a_payer: this.net_a_payer,
          statut: this.isPublie ? 'Disponible' : 'Traitement', 
          signature: this.currentUser.matricule, 
          update_created: new Date(),
        });
        console.log('formGroup', this.formGroup.getRawValue());
        this.salaireService.update(this.salaire.id, this.formGroup.getRawValue())
        .subscribe({
          next: () => {
            this.toastr.success(this.isPublie ? 'Bulletin publié' : 'Traitement enregistré', 'Success!');
            this.formGroup.reset();
            this.router.navigate(['/layouts/salaires/statuts-paies']);
            this.isLoading = false;
          },
          error: err => {
            console.log(err);
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            this.isLoading = false;
          }
        });
  
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    }
 
    delete(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        const dateNow = new Date();
        const dateMonth = dateNow.getMonth();
        var personnel = {  
          is_paie: dateMonth,
          signature: this.currentUser.matricule,
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        }; 
        this.personnelService.update(this.salaire.personnel.id, personnel).subscribe({
          next: () => {  
            this.salaireService
            .delete(id)
            .subscribe(() => { 
              this.toastr.info('Supprimé avec succès!', 'Supprimée!');
              this.router.navigate(['/layouts/salaires/statuts-paies']);
            }); 
          },
          error: err => { 
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        });
        
      }
    } 

 

    // public openPDF(): void {
    //   let DATA: any = document.getElementById('htmlData');
    //   var dateNow = new Date();
    //   var dateNowFormat = formatDate(dateNow, 'dd-MM-yyyy_HH:mm', 'en-US');
    //   html2canvas(DATA).then((canvas) => {
    //     let fileWidth = 210;
    //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //     const FILEURI = canvas.toDataURL('image/png');
    //     let PDF = new jsPDF('p', 'mm', 'a4');
    //     let position = 0;
    //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //     PDF.save(`Bulletin-${dateNowFormat}.pdf`);
    //   });
    // }
    

    public openPDF(): void {
      let pdf = new jsPDF("p", "pt", "a4");
      var dateNow = new Date();
      var dateNowFormat = formatDate(dateNow, 'dd-MM-yyyy_HH:mm', 'en-US');
      pdf.html(this.htmlData.nativeElement, {
        callback: (pdf) => {
          pdf.addPage("a4", "p")
          pdf.save(`Bulletin-${dateNowFormat}.pdf`)
        }
      }) 
    }

    generatePDF() {  
      let docDefinition = {  
        header: 'C#Corner PDF Header',  
        content: this.htmlData.nativeElement
      };  
     
      // this.figureTwoChart = document.getElementById('figureTwo').innerHTML;
      pdfMake.createPdf(docDefinition).open();  
    }  
  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}
