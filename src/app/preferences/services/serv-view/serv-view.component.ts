import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model'; 
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service'; 
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections'; 
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator'; 
import { ServicePrefModel } from '../models/service-models';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-serv-view',
  templateUrl: './serv-view.component.html',
  styleUrls: ['./serv-view.component.scss']
})
export class ServViewComponent implements AfterViewInit {
  isLoading = false;

  currentUser: PersonnelModel | any;
  
  item: ServicePrefModel | any; 

  total = 0;

  displayedColumns: string[] = ['matricule','nom', 'postnom', 'prenom', 'email', 'telephone', 'sexe', 'id'];
  
  ELEMENT_DATA: PersonnelModel[] = [];
  
  dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<PersonnelModel>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 


  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
      private authService: AuthService,
    private serviceService: ServiceService, 
    private _liveAnnouncer: LiveAnnouncer, 
    private toastr: ToastrService) {} 
  
      ngAfterViewInit() { 
          this.isLoading = true;
          let id = this.route.snapshot.paramMap.get('id');
          this.authService.user().subscribe({
              next: () => {
                this.serviceService.get(Number(id)).subscribe(res => {
                  this.item = res; 
                  this.ELEMENT_DATA = this.item.personnels;  
                  this.total = this.item.personnels.length;
                  this.dataSource = new MatTableDataSource<PersonnelModel>(this.ELEMENT_DATA);
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
  
    detail(id: number) {
      this.router.navigate(['/layouts/personnels', id, 'personnel-edit'])
    }



    delete(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
        this.serviceService
          .delete(id)
          .subscribe({
            next: () => {
              this.toastr.info('Success!', 'Supprimé avec succès!');
              this.router.navigate(['layouts/preferences/services']);
            },
            error: err => {
              this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            }
          });
      }
    }




    toggleTheme() {
      this.themeService.toggleTheme();
  }

}
