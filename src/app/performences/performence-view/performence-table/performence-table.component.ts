import { Component, Input, ViewChild } from '@angular/core';
import { PerformenceModel } from '../../models/performence-model';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelService } from 'src/app/personnels/personnel.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-performence-table',
  templateUrl: './performence-table.component.html',
  styleUrls: ['./performence-table.component.scss']
})
export class PerformenceTableComponent {
  @Input('personne') personne: PersonnelModel; 

  displayedColumns: string[] = ['created', 'ponctualite', 'hospitalite', 'travail', 'observation',  'update_created'];
  
  ELEMENT_DATA: PerformenceModel[] = [];
  
  dataSource = new MatTableDataSource<PerformenceModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<PerformenceModel>(true, []);

  isLoading = false;
  currentUser: PersonnelModel | any; 
 

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private personnelService: PersonnelService, 
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
              this.personnelService.get(this.personne.id).subscribe({
                  next: res => {
                    this.personne = res;
                      this.ELEMENT_DATA = this.personne.performences;
                      this.dataSource = new MatTableDataSource<PerformenceModel>(this.ELEMENT_DATA);
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
  this.router.navigate(['/layouts/salaires/primes', id, 'detail'])
  window.location.reload(); 
} 

}
