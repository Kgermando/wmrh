import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router'; 
import { SalaireModel } from '../models/salaire-model';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { SalaireService } from '../salaire.service';

@Component({
  selector: 'app-releve-paies',
  templateUrl: './releve-paies.component.html',
  styleUrls: ['./releve-paies.component.scss']
})
export class RelevePaiesComponent  implements AfterViewInit {
  displayedColumns: string[] = ['matricule', 'nom', 'postnom', 'prenom', 'email', 'telephone', 'sexe', 'created'];
  
  ELEMENT_DATA: SalaireModel[] = [];
  salaireFilter: SalaireModel[] = [];
  
  dataSource = new MatTableDataSource<SalaireModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<SalaireModel>(true, []);

  isLoading = false;
  currentUser: PersonnelModel | any; 
 
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

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

    ngAfterViewInit() { 
        this.isLoading = true;
        this.authService.user().subscribe({
            next: (user) => {
                this.currentUser = user;
                this.salaireService.getAll(this.currentUser.code_entreprise).subscribe({
                    next: res => {
                      this.salaireFilter = res;

                      const dateNow = new Date();
                      const datamonth = dateNow.getMonth(); 

                      this.ELEMENT_DATA = this.salaireFilter.filter((value) => value.created.getMonth() === datamonth);

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

  detail(id: number) {
    this.router.navigate(['/layouts/salaires/releve-salaire', id, 'fiche-paie'])
  }

}
 