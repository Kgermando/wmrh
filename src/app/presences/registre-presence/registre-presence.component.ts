import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';   
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ApointementModel } from '../models/presence-model';
import { PresenceService } from '../presence.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { SiteLocationModel } from 'src/app/preferences/site-location/models/site-location-model';
import { SiteLocationService } from 'src/app/preferences/site-location/site-location.service';

@Component({
  selector: 'app-registre-presence',
  templateUrl: './registre-presence.component.html',
  styleUrls: ['./registre-presence.component.scss']
})
export class RegistrePresenceComponent implements OnInit, AfterViewInit {
  @Input('personne') personne: PersonnelModel; 
  
  displayedColumns: string[] = ['site_location', 'matricule', 'apointement', 'date_entree', 'date_sortie', 'observation'];
   
  ELEMENT_DATA: ApointementModel[] = []; 
  
  dataSource = new MatTableDataSource<ApointementModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<ApointementModel>(true, []);

  isLoading = false;
  currentUser: PersonnelModel;

  mois = '';
  dateNow = new Date();
  dateMonth = 0; 


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private presenceService: PresenceService,
      public dialog: MatDialog,
  ) {}

  toggleTheme() {
      this.themeService.toggleTheme();
  }

  ngOnInit(): void {
    this.dateNow = new Date();
    this.dateMonth = this.dateNow.getMonth() + 1; 

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
    } else {
        ''
    }
  }

    ngAfterViewInit() { 
        this.isLoading = true;
        this.authService.user().subscribe({
            next: (user) => {
                this.currentUser = user;
                if(this.currentUser.site_locations.site_location.toUpperCase() === 'ALL') {
                  this.presenceService.getRegisterPresenceAll(
                    this.currentUser.code_entreprise).subscribe({
                    next: res => {
                        this.ELEMENT_DATA = res;
                        this.dataSource = new MatTableDataSource<ApointementModel>(this.ELEMENT_DATA);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                        this.isLoading = false;
                    },
                    error: (err) => {
                        this.isLoading = false;
                        console.log(err);
                    }
                });
                } else {
                  this.presenceService.getRegisterPresence(
                    this.currentUser.code_entreprise, 
                    this.currentUser.site_locations.site_location).subscribe({
                    next: res => {
                        this.ELEMENT_DATA = res;
                        this.dataSource = new MatTableDataSource<ApointementModel>(this.ELEMENT_DATA);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator;
                        this.isLoading = false;
                    },
                    error: (err) => {
                        this.isLoading = false;
                        console.log(err);
                    }
                });
                }
                
            },
            error: (error) => {
              this.router.navigate(['/auth/login']);
              console.log(error);
            }
          }); 
        this.isLoading = false;
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

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.presenceService
        .delete(id)
        .subscribe(() => this.ELEMENT_DATA = this.ELEMENT_DATA.filter(item => item.id !== id));
    }
  }


  openExportDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(PresenceExportXLSXDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  }

}



@Component({
  selector: 'presence-export-xlsx-dialog',
  templateUrl: './presence-export-xlsx.html',
})
export class PresenceExportXLSXDialogBox implements OnInit {
  isLoading = false;
  currentUser: PersonnelModel | any;

  siteLocationList: SiteLocationModel[] = [];

  dateRange = new FormGroup({
    site_location: new FormControl(),
    start: new FormControl(),
    end: new FormControl()
  });

  constructor( 
      public dialogRef: MatDialogRef<PresenceExportXLSXDialogBox>, 
      private toastr: ToastrService,
      private presenceService: PresenceService,
      private router: Router,
      private authService: AuthService,
      private siteLocation: SiteLocationService,
  ) {}


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
          this.currentUser = user;
          this.siteLocation.getAll(this.currentUser.code_entreprise).subscribe(res => {
            this.siteLocationList = res;
          });
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
    this.presenceService.downloadReport(
        this.currentUser.code_entreprise,
        this.dateRange.value.site_location,
        start_date,
        end_date
      ).subscribe({
      next: (res) => {
        this.isLoading = false;
        const blob = new Blob([res], {type: 'text/xlsx'});
        const downloadUrl = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Presences-${dateNowFormat}.xlsx`;
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
