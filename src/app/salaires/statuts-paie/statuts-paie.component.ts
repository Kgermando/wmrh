import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { SalaireModel } from '../models/salaire-model';
import { SalaireService } from '../salaire.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SalaireExportXLSXDialogBox } from '../releve-paie/releve-paie.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-statuts-paie',
  templateUrl: './statuts-paie.component.html',
  styleUrls: ['./statuts-paie.component.scss']
})
export class StatutsPaieComponent {
  displayedColumns: string[] = ['statut', 'matricule', 'fullname', 'departements', 'services', 'site_locations', 'created'];
  
  ELEMENT_DATA: SalaireModel[] = [];
  
  dataSource = new MatTableDataSource<SalaireModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<SalaireModel>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  isLoading = false;
  currentUser: PersonnelModel | any;

  mois = '';
  
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private salaireService: SalaireService,
      public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    const dateNow = new Date();
    const dateMonth = dateNow.getMonth() + 1; 

    if (dateMonth === 1) {
        this.mois = 'Janvier';
    } else if(dateMonth === 2) {
        this.mois = 'Fevrier';
    } else if(dateMonth === 3) {
        this.mois = 'Mars';
    } else if(dateMonth === 4) {
        this.mois = 'Avril';
    } else if(dateMonth === 5) {
        this.mois = 'Mai';
    } else if(dateMonth === 6) {
        this.mois = 'Juin';
    } else if(dateMonth === 7) {
        this.mois = 'Juillet';
    } else if(dateMonth === 8) {
        this.mois = 'Aôut';
    } else if(dateMonth === 9) {
        this.mois = 'Septembre';
    } else if(dateMonth === 10) {
        this.mois = 'Octobre';
    } else if(dateMonth === 11) {
        this.mois = 'Novembre';
    } else if(dateMonth === 12) {
        this.mois = 'Décembre';
    } else {
        ''
    }
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }



    ngAfterViewInit() { 
        this.isLoading = true;
        this.authService.user().subscribe({
            next: (user) => {
                this.currentUser = user;
                this.salaireService.getAll(this.currentUser.code_entreprise).subscribe({
                    next: res => {
                        this.ELEMENT_DATA = res; 
                        this.dataSource = new MatTableDataSource<SalaireModel>(this.ELEMENT_DATA);
                        this.dataSource.sort = this.sort;
                        this.dataSource.paginator = this.paginator; 
                        this.isLoading = false;
                    },
                    error: (err) => {
                        this.isLoading = false;
                        console.log(err);
                    }
                });
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

 
  openExportDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SalaireExportXLSXDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  } 

}
