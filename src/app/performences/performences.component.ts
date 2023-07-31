import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PerformenceModel } from './models/performence-model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { PersonnelModel } from '../personnels/models/personnel-model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { PerformenceService } from './performence.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Validators } from 'ngx-editor';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonnelService } from '../personnels/personnel.service';

@Component({
  selector: 'app-performences',
  templateUrl: './performences.component.html',
  styleUrls: ['./performences.component.scss']
})
export class PerformencesComponent implements AfterViewInit {
  displayedColumns: string[] = ['created', 'matricule', 'fullname', 'ponctualite', 'hospitalite', 'travail'];
  
  ELEMENT_DATA: PersonnelModel[] = [];
  
  dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<PerformenceModel>(true, []);

  isLoading = false;
  currentUser: PersonnelModel | any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private personnelService: PersonnelService,
      public dialog: MatDialog,
  ) {}

  toggleTheme() {
      this.themeService.toggleTheme();
  }



    ngAfterViewInit() { 
        this.isLoading = true;
        this.authService.user().subscribe({
            next: (user) => {
                this.currentUser = user;
                this.personnelService.getAll(this.currentUser.code_entreprise).subscribe({
                    next: res => {
                        this.ELEMENT_DATA = res; 
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
 

