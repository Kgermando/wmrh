import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { SalaireService } from '../salaire.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SalaireExportXLSXDialogBox } from '../releve-paie/releve-paie.component';
import { MatDialog } from '@angular/material/dialog'; 
import { ReleveSalaireModel } from '../models/releve-salaire-model';

@Component({
  selector: 'app-statuts-paie',
  templateUrl: './statuts-paie.component.html',
  styleUrls: ['./statuts-paie.component.scss']
})
export class StatutsPaieComponent implements OnInit {
  displayedColumns: string[] = ['statut', 'matricule', 'fullname', 'departements', 'services', 'site_locations', 'created'];
  
  ELEMENT_DATA: ReleveSalaireModel[] = [];
  
  dataSource = new MatTableDataSource<ReleveSalaireModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<ReleveSalaireModel>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  isLoading = false;
  currentUser: PersonnelModel | any;

  fardeList: any[] = [];
  fardeSetList: any[] = [];
  dateFarde: any; 

  mois = '';
  dateNow = new Date();
  dateMonth = 0;
  dateYear = 0; 
  
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private salaireService: SalaireService, 
      public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
        next: (user) => {
            this.currentUser = user;
            this.salaireService.farde(this.currentUser.code_entreprise).subscribe(farde => {
            this.fardeList = farde;
            // var fardeMap = this.fardeSetList.map((item: any) => item.is_paie);
            this.fardeSetList = [...new Set(this.fardeList)];
              this.isLoading = false;
            }
          );
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });
  }

  toggleTheme() {
      this.themeService.toggleTheme();
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



  onChangeFarde(event: any) {
    this.salaireService.statutPaie(this.currentUser.code_entreprise, event.value).subscribe(res => { 
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<ReleveSalaireModel>(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        var datePaieList = this.fardeSetList.filter((v) => v.is_paie == event.value);
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
      }
    );
  }
 
 
  openExportDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SalaireExportXLSXDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  } 

}
