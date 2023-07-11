import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';   
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ApointementModel } from '../models/presence-model';
import { PresenceService } from '../presence.service';

@Component({
  selector: 'app-registre-presence',
  templateUrl: './registre-presence.component.html',
  styleUrls: ['./registre-presence.component.scss']
})
export class RegistrePresenceComponent implements AfterViewInit {
  @Input('personne') personne: PersonnelModel; 
  
  displayedColumns: string[] = ['matricule','apointement', 'date_entree', 'date_sortie', 'observation'];
  
  ELEMENT_DATA: ApointementModel[] = []; 
  
  dataSource = new MatTableDataSource<ApointementModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<ApointementModel>(true, []);

  isLoading = false;
  currentUser: PersonnelModel;
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private presenceService: PresenceService,
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
                this.presenceService.getAll(this.currentUser.code_entreprise).subscribe({
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

}
