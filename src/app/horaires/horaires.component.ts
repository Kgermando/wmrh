import { Component, ViewChild } from '@angular/core'; 
import { PersonnelModel } from '../personnels/models/personnel-model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HoraireService } from './horaire.service';
import { HoraireModel } from './models/horaire.model';

@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.scss']
})
export class HorairesComponent {
  isLoading = false;
  
  currentUser: PersonnelModel | any;
  
  horaireList: HoraireModel[] = [];

  displayedColumns: string[] = ['numero', 'user'];
  ELEMENT_DATA: string[] = [];
  
  dataSource = new MatTableDataSource<string>(this.ELEMENT_DATA);
  selection = new SelectionModel<string>(true, []);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(
    private router: Router,
    private authService: AuthService, 
      private horaireService: HoraireService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void { 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;

        this.horaireService.refreshDataList$.subscribe(() => {
          this.getAllData(this.currentUser.code_entreprise);
        })
        this.getAllData(this.currentUser.code_entreprise);
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    }); 
  }

  getAllData(code_entreprise: string) {
    this.horaireService.getAll(code_entreprise).subscribe(res => {
      this.horaireList = res;
    });
  }


}

