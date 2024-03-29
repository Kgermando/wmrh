import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { AuthService } from '../auth/auth.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AvanceSalaireModel } from './models/avance-salaire-model';
import { SelectionModel } from '@angular/cdk/collections';
import { PersonnelModel } from '../personnels/models/personnel-model';
import { AvanceSalaireService } from './avance-salaire.service';
import { ReglageService } from '../preferences/reglages/reglage.service';
import { PreferenceModel } from '../preferences/reglages/models/reglage-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PersonnelService } from '../personnels/personnel.service';
import { monnaieDataList } from '../shared/tools/monnaie-list';

@Component({
  selector: 'app-avance-salaires',
  templateUrl: './avance-salaires.component.html',
  styleUrls: ['./avance-salaires.component.scss']
})
export class AvanceSalairesComponent implements OnInit {
  displayedColumns: string[] = ['matricule','fullname', 'intitule', 'montant', 'created', 'id'];
  
  ELEMENT_DATA: AvanceSalaireModel[] = [];
  
  dataSource = new MatTableDataSource<AvanceSalaireModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<AvanceSalaireModel>(true, []);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 


  isLoading = false;
  currentUser: PersonnelModel | any;

  preference: PreferenceModel | any;
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService,
      private router: Router,
      private authService: AuthService,
      private avanceSalaireService: AvanceSalaireService,
      private reglageService: ReglageService,
      public dialog: MatDialog,
  ) {} 
  toggleTheme() {
    this.themeService.toggleTheme();
  }


  ngOnInit() { 
    this.isLoading = true;
    this.authService.user().subscribe({
        next: (user) => {
            this.currentUser = user;
            this.avanceSalaireService.refreshDataList$.subscribe(() => {
              this.onChange(this.currentUser.code_entreprise);
            });
            this.onChange(this.currentUser.code_entreprise);
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });
    }


    onChange(code_entreprise: string) { 
      this.reglageService.preference(code_entreprise).subscribe(res => {
        this.preference = res;
        this.avanceSalaireService.getAll(code_entreprise).subscribe(res => {
            this.ELEMENT_DATA = res; 
            this.dataSource = new MatTableDataSource<AvanceSalaireModel>(this.ELEMENT_DATA);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
        }, );
  
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
    this.router.navigate(['/layouts/salaires/avance-salaire', id, 'detail'])
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AvanceSalaireAddDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  } 

}



@Component({
  selector: 'avance-salaire-dialog',
  templateUrl: './avance-salaire-add.html',
})
export class AvanceSalaireAddDialogBox implements OnInit {
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  personneList: PersonnelModel[] = [];

  monnaieList = monnaieDataList;

  constructor( 
      public dialogRef: MatDialogRef<AvanceSalaireAddDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private personnelService: PersonnelService,
      private avanceSalaireService: AvanceSalaireService,
  ) {}
  


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.personnelService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.personneList = res;
        });
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    }); 
    this.formGroup = this.formBuilder.group({ 
      personnel: ['', Validators.required],
      intitule: ['', Validators.required],
      monnaie: ['', Validators.required],
      montant: ['', Validators.required],
      observation: ['', Validators.required]
    }); 
 
  } 


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          personnel: this.formGroup.value.personnel,
          intitule: this.formGroup.value.intitule,
          monnaie: this.formGroup.value.monnaie,
          montant: this.formGroup.value.montant,
          observation: this.formGroup.value.observation,
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        };
        this.avanceSalaireService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!'); 
            // window.location.reload();
            this.close()
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        });
      } 
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  close(){
      this.dialogRef.close(true);
  } 

}
