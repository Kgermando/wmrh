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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-statuts-paie',
  templateUrl: './statuts-paie.component.html',
  styleUrls: ['./statuts-paie.component.scss']
})
export class StatutsPaieComponent implements OnInit {
  displayedColumns: string[] = [ 'numero', 'statut', 'matricule', 'fullname', 'departements', 'site_locations', 'created'];
  
  ELEMENT_DATA: ReleveSalaireModel[] = [];
  
  dataSource = new MatTableDataSource<ReleveSalaireModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<ReleveSalaireModel>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  isLoading = false;
  isLoad = false;
  currentUser: PersonnelModel | any;

  fardeList: any[] = [];
  entrepriseList: any[] = [];
  dateFarde: any; 

  mois = '';
  dateNow = new Date();
  dateMonth = 0;
  dateYear = 0; 

  formGroup!: FormGroup;
  
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      private formBuilder: FormBuilder,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private salaireService: SalaireService, 
      public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    
    var date = new Date();
    var dateMonth = date.getMonth() + 1;
    var dateYear = date.getFullYear();
 
    this.authService.user().subscribe({
        next: (user) => {
            this.currentUser = user;
            this.salaireService.farde(this.currentUser.code_entreprise).subscribe(farde => {
              this.fardeList = farde;
              this.salaireService.statutPaieOnly(
                this.currentUser.code_entreprise, dateMonth.toString(), dateYear.toString()).subscribe(res => { 
                  this.ELEMENT_DATA = res;
                  this.dataSource = new MatTableDataSource<ReleveSalaireModel>(this.ELEMENT_DATA);
                  this.dataSource.sort = this.sort;
                  this.dataSource.paginator = this.paginator; 
                }
              ); 
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
    this.isLoad = true;
    this.salaireService.statutPaieOnly(
      this.currentUser.code_entreprise, event.value.month, event.value.year).subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<ReleveSalaireModel>(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
        this.isLoad = false;
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
