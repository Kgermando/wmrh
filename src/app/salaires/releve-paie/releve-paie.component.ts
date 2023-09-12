import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SalaireService } from '../salaire.service';
import { formatDate } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReleveSalaireModel } from '../models/releve-salaire-model';

@Component({
  selector: 'app-releve-paie',
  templateUrl: './releve-paie.component.html',
  styleUrls: ['./releve-paie.component.scss']
})
export class RelevePaieComponent implements OnInit {

  releveList: ReleveSalaireModel[] = [];

  isLoading = false;
  currentUser: PersonnelModel | any;

  fardeList: any[] = [];
  fardeSetList: any[] = [];
  dateFarde: any;
  dateNow = new Date();
  dateMonth = 0;
  dateYear: any; 

  mois = '';
  is_paie:any;

  net_a_payer = 0;
  ipr = 0;
  cnss = 0;
  frais_bancaire = 0;
  rbi_total = 0;



  constructor( 
      public themeService: CustomizerSettingsService,
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
    this.authService.user().subscribe({
      next: (user) => {
          this.currentUser = user;
        //   this.salaireService.fardeDisponible(this.currentUser.code_entreprise).subscribe(farde => {
        //     this.fardeList = farde;
        //     // var fardeMap = this.fardeSetList.map((item: any) => item.is_paie);
        //     this.fardeSetList = [...new Set(this.fardeList)];
            
        //     this.isLoading = false;
        //   }
        // );
        this.salaireService.fardeDisponible(this.currentUser.code_entreprise).subscribe(farde => {
          this.salaireService.fardeIsPaieDisponible(this.currentUser.code_entreprise).subscribe(f => {
            this.fardeSetList = farde;
            this.fardeList = f;
            // this.fardeList = fardeListIsPaie;
            // console.log('dfgggfgf', this.fardeList);
            // var fardeMap = this.fardeSetList.map((item: any) => item.is_paie);
            // this.fardeList = [...new Set(fardeMap)];
              this.isLoading = false;
            }
          );
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
    this.salaireService.relevePaie(this.currentUser.code_entreprise, event.value).subscribe(res => {
      this.releveList = res;
      var datePaieList = this.fardeSetList.filter((v) => v.is_paie == event.value);
      this.is_paie = event.value;
      this.dateFarde = datePaieList[datePaieList.length-1];
      var date = new Date(this.dateFarde.created);
      this.dateMonth = date.getMonth() + 1;
      this.dateYear =  date.getFullYear(); 
      if (this.dateMonth === 1) {
          this.mois = 'Janvier';
      } else if(this.dateMonth === 2) {
          this.mois = 'Fevrier';
      } else if(this.dateMonth === 3) {
          this.mois = 'Mars';
      } else if(this.dateMonth === 4) {
          this.mois = 'Avril';
      } else if(this.dateMonth === 5) {
          this.mois = 'Mai';
      } else if(this.dateMonth === 6) {
          this.mois = 'Juin';
      } else if(this.dateMonth === 7) {
          this.mois = 'Juillet';
      } else if(this.dateMonth === 8) {
          this.mois = 'Aôut';
      } else if(this.dateMonth === 9) {
          this.mois = 'Septembre';
      } else if(this.dateMonth === 10) {
          this.mois = 'Octobre';
      } else if(this.dateMonth === 11) {
        this.mois = 'Novembre';
      } else if(this.dateMonth === 12) {
        this.mois = 'Décembre';
      }
      this.salaireService.netAPayerTotal(this.currentUser.code_entreprise, event.value).subscribe(
        net_a_payer => {
          var net_a_payE = net_a_payer;
          net_a_payE.map((item: any) => this.net_a_payer = parseFloat(item.sum));  
        }
      );
      this.salaireService.iprTotal(this.currentUser.code_entreprise, event.value).subscribe(
        ipr => {
          var iprs = ipr;
          iprs.map((item: any) => this.ipr = parseFloat(item.sum));
        }
      );
      this.salaireService.cnssQPOTotal(this.currentUser.code_entreprise, event.value).subscribe(
        cnss => {
          var cnssQPO = cnss; 
          cnssQPO.map((item: any) => this.cnss = parseFloat(item.sum));
        }
      );
      this.salaireService.rbiTotal(this.currentUser.code_entreprise, event.value).subscribe(
        rbi => {
          var rbis = rbi; 
          rbis.map((item: any) => this.rbi_total = parseFloat(item.sum));
        }
      );

      // this.salaireService.fraisBancaireTotal(this.currentUser.code_entreprise, event.value).subscribe(
      //   frais_bancaire => {
      //     var frais_bancaires = frais_bancaire; 
      //     frais_bancaires.map((item: any) => this.frais_bancaire = parseFloat(item.sum));
      //   }
      // );
    });
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
      farde: ['', Validators.required],
      start: ['', Validators.required],
      end: ['-', Validators.required]
    });
    
    this.authService.user().subscribe({
      next: (user) => {
          this.currentUser = user; 
          this.salaireService.farde(this.currentUser.code_entreprise).subscribe(farde => {
            this.fardeList = farde;
            
            this.isLoading = false;
          })
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
          this.dateRange.value.farde,
          start_date,
          end_date
        ).subscribe({
        next: (res) => {
          this.isLoading = false;
          // const blob = new Blob([res], {type: 'text/xlsx'});
          const downloadUrl = window.URL.createObjectURL(res);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `Salaires-${dateNowFormat}.xlsx`;
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
