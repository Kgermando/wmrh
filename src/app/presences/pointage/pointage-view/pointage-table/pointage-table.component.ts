import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { AuthService } from 'src/app/auth/auth.service';
import { ApointementModel } from '../../../models/presence-model';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PresenceService } from '../../../presence.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PrestationModel } from 'src/app/presences/models/prestation.model';


@Component({
  selector: 'app-pointage-table',
  templateUrl: './pointage-table.component.html',
  styleUrls: ['./pointage-table.component.scss']
})
export class PointageTableComponent implements OnInit {
  @Input('personne') personne: PersonnelModel | any; 

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  
  displayedColumns: string[] = ['matricule', 'apointement', 'prestation', 'date_entree', 'date_sortie', 'observation', 'action'];
  
  ELEMENT_DATA: ApointementModel[] = []; 
  
  dataSource = new MatTableDataSource<ApointementModel>(this.ELEMENT_DATA);
  selection = new SelectionModel<ApointementModel>(true, []);

  isLoading = false;
  currentUser: PersonnelModel | any;
 
  constructor(
      private _liveAnnouncer: LiveAnnouncer,
      public themeService: CustomizerSettingsService, 
      private router: Router, 
      private authService: AuthService,
      private presenceService: PresenceService,
      public dialog: MatDialog,
      private toastr: ToastrService
  ) {}
 



  ngOnInit() { 
    this.isLoading = true;
    this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          this.presenceService.refreshDataList$.subscribe(() => {
            this.getAllData(this.currentUser.code_entreprise);
          });
          this.getAllData(this.currentUser.code_entreprise); 
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });
    }

    
    getAllData(code_entreprise: string) {
      this.presenceService.getMatricule(code_entreprise, this.personne.matricule).subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource<ApointementModel>(this.ELEMENT_DATA);
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

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.presenceService
        .delete(id)
        .subscribe({
          next: () => {  
            this.toastr.success('Success!', 'Suppression effectuée!'); 
          },
          error: (err) => {
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        }
      );
    }
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(EditPresenceDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id
      }
    }); 
  }  

}




@Component({
  selector: 'edit-presence-dialog',
  templateUrl: './edit-presence.html',
})
export class EditPresenceDialogBox implements OnInit {
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  prestationList: PrestationModel[] = []

  // isAbsense = false;

  isPresence = false; //Si la personne est presente ou absence autorisée 

  apointementList: string[] = [
    'P',
    'A',
    'AA',
    'AM',
    'CC',
    'CA',
    'CO',
    'S', 
    'O',
    'M'
  ];

  prestation = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditPresenceDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private presenceService: PresenceService,
  ) {
    this.prestationList = [
      { pres:'Journée entière', cote: 1},
      { pres:'Demi-journée', cote: 0.5},
    ]
  }



  ngOnInit(): void {
    console.log("this.data['id']", this.data['id']);
    this.formGroup = this.formBuilder.group({
      apointement: [''],
      prestation: [''],
      date_entree: [''],
      date_sortie: [''],
      observation: [''] 
    });
    
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.presenceService.get(parseInt(this.data['id'])).subscribe(item => {
          if(item.apointement === 'P' || item.apointement === 'AA' || item.apointement === 'M') {
            this.prestation = item.prestation;
            this.isPresence = true;
          } else {
            this.isPresence = false;
            this.prestation = 0; 
          }
          this.formGroup.patchValue({
            apointement: item.apointement,
            prestation: this.prestation, 
            date_entree: item.date_entree,
            date_sortie: item.date_sortie,
            observation: item.observation, 
            signature: this.currentUser.matricule, 
            update_created: new Date(),
          });
        });
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  

   
  } 

  onPresenceChange(event: any) {
    console.log(event.value);
     if(event.value === 'P' || event.value === 'AA' || event.value === 'M') { 
      this.isPresence = true;
    } else {
      this.isPresence = false;
      this.prestation = 0; 
    }
  }



  onSubmit() {
    try {
      this.isLoading = true;
      this.presenceService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Modification enregistré!', 'Success!');
          this.close();
        },
        error: err => {
          console.log(err);
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          this.isLoading = false;
        }
      }); 
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  close(){
      this.dialogRef.close(true);
  } 

  compareFn(c1: PrestationModel, c2: PrestationModel): boolean {
    return c1 && c2 ? c1.cote === c2.cote : c1 === c2;
  }

}
