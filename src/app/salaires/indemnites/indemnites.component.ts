import { Component, OnInit, ViewChild } from '@angular/core';
import { IndemniteModel } from './models/indemnite.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { IndemniteService } from './indemnite.service';

@Component({
  selector: 'app-indemnites',
  templateUrl: './indemnites.component.html',
  styleUrls: ['./indemnites.component.scss']
})
export class IndemnitesComponent implements OnInit {
  displayedColumns: string[] = ['statut', 'matricule', 'fullname', 'intitule', 'created'];
  
  ELEMENT_DATA: IndemniteModel[] = [];
  
  dataSource = new MatTableDataSource<IndemniteModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<IndemniteModel>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  isLoading = false; 
  currentUser: PersonnelModel | any;

  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private indminteService: IndemniteService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.user().subscribe({
        next: (user) => {
            this.currentUser = user; 
            this.indminteService.getAll(this.currentUser.code_entreprise).subscribe(res => {
              this.ELEMENT_DATA = res; 
              this.dataSource = new MatTableDataSource<IndemniteModel>(this.ELEMENT_DATA);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
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



}
