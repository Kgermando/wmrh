import { Component, ViewChild } from '@angular/core'; 
import { PersonnelModel } from '../personnels/models/personnel-model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; 
import { HoraireModel } from './models/horaire.model';
import { CorporateModel } from '../preferences/corporates/models/corporate.model';
import { CorporateService } from '../preferences/corporates/corporate.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-horaires',
  templateUrl: './horaires.component.html',
  styleUrls: ['./horaires.component.scss']
})
export class HorairesComponent {
  isLoading = false;
  
  currentUser: PersonnelModel | any;

  corporate: CorporateModel;

  horaireList: HoraireModel[] = [];

  displayedColumns: string[] = ['numero', 'user'];
  ELEMENT_DATA: string[] = [];
  
  dataSource = new MatTableDataSource<string>(this.ELEMENT_DATA);
  selection = new SelectionModel<string>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  constructor(
      private route: ActivatedRoute,
      private corporateService: CorporateService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void { 
    this.route.params.subscribe(routeParams => { 
      this.loadData(routeParams['id']);
    });
  } 

  public loadData(id: any): void {
    this.isLoading = true;
    this.corporateService.get(Number(id)).subscribe(res => {
      this.corporate = res;
      this.horaireList = this.corporate.horaires;
      this.isLoading = false; 
    });
  }

}


