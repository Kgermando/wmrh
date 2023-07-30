import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router'; 
import { PersonnelService } from 'src/app/personnels/personnel.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { Subject, finalize } from 'rxjs';


@Component({
  selector: 'app-list-paiments',
  templateUrl: './list-paiments.component.html',
  styleUrls: ['./list-paiments.component.scss']
})
export class ListPaimentsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['matricule','nom', 'postnom', 'prenom', 'email', 'telephone', 'sexe'];
  
  personnelFilter: PersonnelModel[] = []; // Filter des personnels qui sont deja payé!
  ELEMENT_DATA: PersonnelModel[] = [];
  
  dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<PersonnelModel>(true, []);

  public loading$ = new Subject<boolean>();

  isLoading = false;
  currentUser: PersonnelModel | any;

    mois = '';
    dateNow = new Date();
    dateMonth = this.dateNow.getMonth() + 1;
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private personnelService: PersonnelService
  ) {}


  ngOnInit(): void { 

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
                this.personnelService.getAll(this.currentUser.code_entreprise)
                .pipe(finalize(() => this.loading$.next(false)))
                .subscribe({
                    next: res => {  
                        this.personnelFilter = res;
                        this.ELEMENT_DATA = this.personnelFilter.filter(v => v.is_paie < this.dateMonth && parseFloat(v.salaire_base) > 0);
                        this.dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
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
 

}
 