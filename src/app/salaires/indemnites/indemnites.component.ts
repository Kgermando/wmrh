import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ActivatedRoute } from '@angular/router';
import { IndeminteModel } from './models/indemnite.model';
import { CorporateModel } from 'src/app/preferences/corporates/models/corporate.model';
import { CorporateService } from 'src/app/preferences/corporates/corporate.service';


@Component({
  selector: 'app-indemnites',
  templateUrl: './indemnites.component.html',
  styleUrls: ['./indemnites.component.scss']
})
export class IndemnitesComponent implements OnInit {
  displayedColumns: string[] = ['statut', 'matricule', 'fullname', 'intitule', 'created'];
  
  ELEMENT_DATA: IndeminteModel[] = [];
  
  dataSource = new MatTableDataSource<IndeminteModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<IndeminteModel>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator; 

  isLoading = false; 
  currentUser: PersonnelModel | any;
  corporate: CorporateModel;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private corporateService: CorporateService,
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
      this.ELEMENT_DATA = this.corporate.indemnites;
      console.log('List', this.ELEMENT_DATA)
      this.dataSource = new MatTableDataSource<IndeminteModel>(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
      this.isLoading = false;
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


  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
