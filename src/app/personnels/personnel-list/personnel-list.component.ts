import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from '../models/personnel-model';
import { PersonnelService } from '../personnel.service'; 
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { EntrepriseService } from 'src/app/admin/entreprise/entreprise.service';
import { EntrepriseModel } from 'src/app/admin/entreprise/models/entreprise.model'; 
import * as xls from 'xlsx'; 

@Component({
  selector: 'app-personnel-list',
  templateUrl: './personnel-list.component.html',
  styleUrls: ['./personnel-list.component.scss']
})
export class PersonnelListComponent implements OnInit {
  displayedColumns: string[] = ['matricule', 'fullname', 'email', 'telephone', 'sexe', 'id'];
  
  ELEMENT_DATA: PersonnelModel[] = [];
  
  dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<PersonnelModel>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  isLoading = false;
  currentUser: PersonnelModel | any;
 
  entreprise: EntrepriseModel;
  isActive = false;

 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private personnelService: PersonnelService,
      private entrepriseService: EntrepriseService,
      public dialog: MatDialog,
      private toastr: ToastrService,
  ) {}


  toggleTheme() {
    this.themeService.toggleTheme();
  }


  ngOnInit() {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user; 
        this.personnelService.refreshDataList$.subscribe(() => {
          this.getAllData(this.currentUser.code_entreprise);
        });
        this.getAllData(this.currentUser.code_entreprise);
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
      });
    }

    private getAllData(code_entreprise: string) {
      this.personnelService.getAll(code_entreprise).subscribe(res => {
        this.ELEMENT_DATA = res; 
        this.dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.entrepriseService.getCodeEntreprise(code_entreprise).subscribe(e => {
          this.entreprise = e;
          this.isLoading = false;
        });
      });
    }

 
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) { 
      if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
          this._liveAnnouncer.announce('Sorting cleared');
      }
  }

  detail(id: number) {
    this.router.navigate(['/layouts/personnels', id, 'personnel-edit'])
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PersonnelUploadCSVDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  } 


  openExportDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PersonnelExportXLSXDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    });
  }

  downloadModelReport() {
    try {
      this.isLoading = true;
      this.personnelService.downloadModelReport(this.currentUser.code_entreprise).subscribe({
      next: (res) => {
        this.isLoading = false; 
        const downloadUrl = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Votre_model_employes.xlsx`;
        link.click(); 
        this.toastr.info('Extraction effectuée!', 'Info!'); 
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
        console.log(err); 
      }
    });
    } catch (error) {
      
    }
  } 

}




@Component({
  selector: 'personnel-upload-xlsx-dialog',
  templateUrl: './personnel-upload-xlsx.html',
})
export class PersonnelUploadCSVDialogBox implements OnInit {
  isLoading = false; 
  personnelList: any[] = [];
  currentUser: PersonnelModel | any;

  pourcent = 0;

  constructor( 
      public dialogRef: MatDialogRef<PersonnelUploadCSVDialogBox>, 
      private toastr: ToastrService,
      private router: Router,
      private authService: AuthService,
      private personnelService: PersonnelService, 
  ) {}

  ngOnInit() { 
    this.authService.user().subscribe({
      next: (user) => {
          this.currentUser = user;  
      },
      error: (error) => { 
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    }); 
  }

  upload(event: any) {
    this.isLoading = true;
    const file = event.target.files[0];
    let fileRedaer = new  FileReader();
    fileRedaer.readAsArrayBuffer(file);
    fileRedaer.onload = () => {
      let data = fileRedaer.result; 
      let workBook = xls.read(data, {type: 'array'});
      const sheetName = workBook.SheetNames[0];
      const sheet1 = workBook.Sheets[sheetName];
      this.personnelList = xls.utils.sheet_to_json(sheet1, {raw : true});
      console.log(this.personnelList);
      if (this.personnelList.length > 0) {
        for (let index = 0; index < this.personnelList.length; index++) {
          const length = this.personnelList.length;
          const element = this.personnelList[index];
          
          var codeEntreprise = this.currentUser.code_entreprise;
          var mat = element.matricule;
          var identifiant = `${mat}-${codeEntreprise}`;
  
          const body = {
            nom: (element.nom) ? this.capitalizeTest(element.nom) : '-',
            postnom: (element.postnom) ? this.capitalizeTest(element.postnom) : '-',
            prenom: (element.prenom) ? this.capitalizeTest(element.prenom) : '-',
            email: (element.email) ? element.email.toLowerCase() : 'contact@eventdrc.tech',
            telephone: (element.telephone) ? element.telephone : '000',
            sexe: (element.sexe) ? element.sexe : 'Homme',
            adresse: (element.adresse) ? element.adresse : '-',
            matricule: identifiant.toLowerCase(),
            category: 'Manoeuvres Ordinaires (MO)',
  
            numero_cnss: element.numero_cnss,
            date_naissance: element.date_naissance,
            lieu_naissance: element.lieu_naissance,
            nationalite: this.capitalizeTest(element.nationalite),
            etat_civile: element.etat_civile,
            nbr_dependants: element.nbr_dependants,
  
            departements: element.departements,
            fonctions: element.fonctions,
            services: element.services,
            site_locations: element.site_locations,
            titles: element.titles,
            type_contrat: element.type_contrat,
            date_debut_contrat: element.date_debut_contrat,
            date_fin_contrat: (element.type_contrat === 'CDI') ? new Date('2099-01-01') : element.date_fin_contrat,
  
            monnaie: (element.monnaie) ? element.monnaie.toUpperCase() : 'USD',
            salaire_base: (element.salaire_base) ? element.salaire_base : '0',
            alloc_logement: (element.alloc_logement) ? element.alloc_logement : '0',
            alloc_transport: (element.alloc_transport) ? element.alloc_transport : '0',
            alloc_familliale: (element.alloc_familliale) ? element.alloc_familliale : '0',
            soins_medicaux: (element.soins_medicaux) ? element.soins_medicaux : '0',
            compte_bancaire: (element.compte_bancaire) ? element.compte_bancaire : '-',
            nom_banque: (element.nom_banque) ? this.capitalizeTest(element.nom_banque) : '-',
            frais_bancaire: (element.frais_bancaire) ? element.frais_bancaire : '0',
            syndicat: false,
  
            statut_personnel: false,
            roles: ['Mes Bulletins'],
            permission: 'R',
  
            statut_paie: 'En attente',
            signature: this.currentUser.matricule,
            created: new Date(),
            update_created: new Date(),
            entreprise: this.currentUser.entreprise,
            code_entreprise: this.currentUser.code_entreprise,
            
            is_delete: false,
          };
          this.personnelService.create(body).subscribe({
            next: () => {
              var pourcents = (index + 1) * 100 / length;
              this.pourcent = parseInt(pourcents.toFixed(0));
              if (this.pourcent == 100) {
                this.toastr.success('Ajouter avec succès!', 'Success!');
              }
            },
            error: (err) => {
              this.isLoading = false;
              this.toastr.error(`${err.error.message}`, 'Oupss!');
              console.log(err);
              this.close();
            }
          });
        }
      }
     
      this.isLoading = false; 
      // this.close();
      // this.router.navigate(['/layouts/personnels/personnel-list']);
    }; 
  }
 
  close(){
    this.dialogRef.close(true);
  }


  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }

}

 
@Component({
  selector: 'personnel-export-xlsx-dialog',
  templateUrl: './personnel-export-xlsx.html',
})
export class PersonnelExportXLSXDialogBox implements OnInit {
  isLoading = false;
  currentUser: PersonnelModel | any;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor( 
      public dialogRef: MatDialogRef<PersonnelExportXLSXDialogBox>, 
      private toastr: ToastrService,
      private personnelService: PersonnelService, 
      private router: Router,
      private authService: AuthService,
  ) {}


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
          this.currentUser = user; 
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    }); 
  }

  

  onSubmit() {
    this.isLoading = true; 
    var dateNow = new Date();
    var dateNowFormat = formatDate(dateNow, 'dd-MM-yyyy_HH:mm', 'en-US');
    var start_date = formatDate(this.dateRange.value.start, 'yyyy-MM-dd', 'en-US');
    var end_date = formatDate(this.dateRange.value.end, 'yyyy-MM-dd', 'en-US') ;
    this.personnelService.downloadReport(
        this.currentUser.code_entreprise,
        start_date,
        end_date
      ).subscribe({
      next: (res) => {
        this.isLoading = false;
        const blob = new Blob([res], {type: 'text/xlsx'});
        const downloadUrl = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Employes-${dateNowFormat}.xlsx`;
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


  close(){
      this.dialogRef.close(true);
  } 

}
