import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { SalaireModel } from '../models/salaire-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { SelectionModel } from '@angular/cdk/collections';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SalaireService } from '../salaire.service';
 

@Component({
  selector: 'app-releve-paie',
  templateUrl: './releve-paie.component.html',
  styleUrls: ['./releve-paie.component.scss']
})
export class RelevePaieComponent implements AfterViewInit {

  displayedColumns: string[] = ['numero', 'matricule', 'fullname', 'departement', 'net_a_payer', 'compte', 'frais_bancaire', 'banque'];
  
  ELEMENT_DATA: SalaireModel[] = [];

  salaireList: SalaireModel[] = []; 
  
  dataSource = new MatTableDataSource<SalaireModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<SalaireModel>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  isLoading = false;
  currentUser: PersonnelModel | any;

  mois = '';

  net_a_payer = 0;
  ipr = 0;
  cnss = 0;
  frais_bancaire = 0;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private salaireService: SalaireService
) {}

 
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
                    this.salaireList = res;
                    this.ELEMENT_DATA = this.salaireList.filter(v => v.statut == 'Disponible');
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

            this.salaireService.netAPayerTotal(this.currentUser.code_entreprise).subscribe(
              net_a_payer => {
                var net_a_payE = net_a_payer;  
                net_a_payE.map((item: any) => this.net_a_payer = parseFloat(item.sum));  
              }
            );
            this.salaireService.iprTotal(this.currentUser.code_entreprise).subscribe(
              ipr => {
                var iprs = ipr; 
                iprs.map((item: any) => this.ipr = parseFloat(item.sum)); 
              }
            );
            this.salaireService.cnssQPOTotal(this.currentUser.code_entreprise).subscribe(
              cnss => {
                var cnssQPO = cnss; 
                cnssQPO.map((item: any) => this.cnss = parseFloat(item.sum));
              }
            );
            this.salaireService.fraisBancaireTotal(this.currentUser.code_entreprise).subscribe(
              frais_bancaire => {
                var frais_bancaires = frais_bancaire; 
                frais_bancaires.map((item: any) => this.frais_bancaire = parseFloat(item.sum));
              }
            );
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


}
