import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SalaireService } from '../salaire.service';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReleveSalaireModel } from '../models/releve-salaire-model';

@Component({
  selector: 'app-releve-paie',
  templateUrl: './releve-paie.component.html',
  styleUrls: ['./releve-paie.component.scss']
})
export class RelevePaieComponent implements OnInit {

  releveList: ReleveSalaireModel[] = [];

  isLoading = false;
  isLoad = false;
  currentUser: PersonnelModel | any;

  entrepriseList: any[] = []; 
  fardeList: any[] = []; 
  dateFarde: any;
  dateNow = new Date();
  dateMonth = 0;
  dateYear: any; 

  mois = '';
  date_paie:any;

  net_a_payer = 0;
  ipr = 0;
  cnss = 0;
  frais_bancaire = 0;
  rbi_total = 0;

  heure_supp_total = 0;
  prime_total = 0;
  penalite_total = 0;
  syndicat_total = 0; 

  formGroup!: FormGroup; 


  constructor( 
      public themeService: CustomizerSettingsService,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private salaireService: SalaireService, 
      public dialog: MatDialog,
  ) {}


  toggleTheme() {
      this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.formGroup = this.formBuilder.group({
      entreprise: new FormControl(''),
      classeur: new FormControl(''),
    });

    var date = new Date();
    var dateMonth = date.getMonth() + 1;
    var dateYear = date.getFullYear(); 

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.salaireService.fardeDisponible(this.currentUser.code_entreprise).subscribe(farde => {
          this.fardeList = farde;

          this.salaireService.relevePaieOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(res => {
            this.releveList = res;
      
            this.salaireService.netAPayerTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              net_a_payer => {
                var net_a_payE = net_a_payer;
                net_a_payE.map((item: any) => this.net_a_payer = parseFloat(item.sum));  
              }
            );
            this.salaireService.iprTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              ipr => {
                var iprs = ipr;
                iprs.map((item: any) => this.ipr = parseFloat(item.sum));
              }
            );
            this.salaireService.cnssQPOTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              cnss => {
                var cnssQPO = cnss; 
                cnssQPO.map((item: any) => this.cnss = parseFloat(item.sum));
              }
            );
            this.salaireService.rbiTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              rbi => {
                var rbis = rbi; 
                rbis.map((item: any) => this.rbi_total = parseFloat(item.sum));
              }
            );
            this.salaireService.heureSuppTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              heure_supp => {
                var heure_supps = heure_supp;
                heure_supps.map((item: any) => this.heure_supp_total = parseFloat(item.sum));  
              }
            );
            this.salaireService.primeTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              prime => {
                var primes = prime;
                primes.map((item: any) => this.prime_total = parseFloat(item.sum));
              }
            );
            this.salaireService.penalitesTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              penalites => {
                var penalitess = penalites; 
                penalitess.map((item: any) => this.penalite_total = parseFloat(item.sum));
              }
            );
            this.salaireService.syndicatTotalOnly(this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(
              syndicat => {
                var syndicats = syndicat; 
                syndicats.map((item: any) => this.syndicat_total = parseFloat(item.sum));
              }
            ); 
          }); 

          this.isLoading = false;
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

 


  onChangeFarde(event: any) {
    this.isLoad = true;

    this.salaireService.relevePaieOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(res => {
      this.releveList = res;

      this.salaireService.netAPayerTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        net_a_payer => {
          var net_a_payE = net_a_payer;
          net_a_payE.map((item: any) => this.net_a_payer = parseFloat(item.sum));  
        }
      );
      this.salaireService.iprTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        ipr => {
          var iprs = ipr;
          iprs.map((item: any) => this.ipr = parseFloat(item.sum));
        }
      );
      this.salaireService.cnssQPOTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        cnss => {
          var cnssQPO = cnss;
          cnssQPO.map((item: any) => this.cnss = parseFloat(item.sum));
        }
      );
      this.salaireService.rbiTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        rbi => {
          var rbis = rbi; 
          rbis.map((item: any) => this.rbi_total = parseFloat(item.sum));
        }
      );
      this.salaireService.heureSuppTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        heure_supp => {
          var heure_supps = heure_supp;
          heure_supps.map((item: any) => this.heure_supp_total = parseFloat(item.sum));  
        }
      );
      this.salaireService.primeTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        prime => {
          var primes = prime;
          primes.map((item: any) => this.prime_total = parseFloat(item.sum));
        }
      );
      this.salaireService.penalitesTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        penalites => {
          var penalitess = penalites; 
          penalitess.map((item: any) => this.penalite_total = parseFloat(item.sum));
        }
      );
      this.salaireService.syndicatTotalOnly(this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(
        syndicat => {
          var syndicats = syndicat; 
          syndicats.map((item: any) => this.syndicat_total = parseFloat(item.sum));
        }
      );
      this.isLoad = false;
    });
    this.isLoad = false;
  }
 


  openExportDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SalaireExportXLSXDialogBox, {
      width: '600px', 
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  }

}



@Component({
  selector: 'salaire-export-xlsx-dialog',
  templateUrl: './salaire-export-xlsx.html',
})
export class SalaireExportXLSXDialogBox implements OnInit {
  isLoading = false;
  currentUser: PersonnelModel | any;

  // dateRange = new FormGroup({
  //   start: new FormControl(),
  //   end: new FormControl() 
  // });
  dateRange!: FormGroup;

  fardeList: any[] = [];

  constructor( 
      public dialogRef: MatDialogRef<SalaireExportXLSXDialogBox>,
      private _formBuilder: FormBuilder,
      private toastr: ToastrService,
      private salaireService: SalaireService,
      private router: Router,
      private authService: AuthService,
  ) {}


  ngOnInit(): void {
    this.dateRange = this._formBuilder.group({
      start: ['', Validators.required],
      end: ['-', Validators.required]
    });
    
    this.authService.user().subscribe({
      next: (user) => {
          this.currentUser = user; 
          this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    }); 
  }

  

  onSubmit() {
    this.isLoading = true; 
    if (this.dateRange.valid) {
      var dateNow = new Date();
      var dateNowFormat = formatDate(dateNow, 'dd-MM-yyyy_HH:mm', 'en-US');
      var start_date = formatDate(this.dateRange.value.start, 'yyyy-MM-dd', 'en-US');
      var end_date = formatDate(this.dateRange.value.end, 'yyyy-MM-dd', 'en-US'); 
      this.salaireService.downloadReport(
          this.currentUser.code_entreprise,
          start_date,
          end_date
        ).subscribe({
        next: (res) => {
          this.isLoading = false;
          // const blob = new Blob([res], {type: 'text/xlsx'});
          const downloadUrl = window.URL.createObjectURL(res);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `Remuneration-${dateNowFormat}.xlsx`;
          link.click();
          this.toastr.success('Success!', 'Extraction effectuée!');
          // window.location.reload();
          this.close();
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          console.log(err);
          this.close();
        }
      });
    } 
  } 


  close(){
      this.dialogRef.close(true);
  } 

}
