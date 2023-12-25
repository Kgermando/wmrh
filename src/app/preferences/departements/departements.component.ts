import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { DepartementService } from './departement.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DepartementModel } from './model/departement-model';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.scss']
})
export class DepartementsComponent implements OnInit {
  isLoading = false;
  isLoadingForm = false;

  formGroup!: FormGroup;

  departmentList: DepartementModel[] = [];

  currentUser: PersonnelModel | any;

  constructor(
    private router: Router,
      public themeService: CustomizerSettingsService,
      private authService: AuthService,
      private _formBuilder: FormBuilder,
      private departementService: DepartementService,
      public dialog: MatDialog,
      private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.departementService.refreshDataList$.subscribe(() => {
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

    this.formGroup = this._formBuilder.group({
      departement: ['', Validators.required], 
    });
  }

  private getAllData(code_entreprise: string) {
    this.departementService.getAll(code_entreprise).subscribe(res => {
      this.departmentList = res;
      this.isLoading = false; 
    });
  }


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoadingForm = true;
        var body = {
          departement: this.capitalizeTest(this.formGroup.value.departement), 
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        };
        this.departementService.create(body).subscribe({
          next: () => {
            this.isLoadingForm = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!');  
          },
          error: (err) => {
            this.isLoadingForm = false;
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            console.log(err);
          }
        });
      } 
    } catch (error) {
      this.isLoadingForm = false;
      console.log(error);
    }
  } 

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.departementService
        .delete(id)
        .subscribe({
          next: () => {
            this.toastr.info('Success!', 'Supprimé avec succès!');
            // window.location.reload();
          },
          error: err => {
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          }
        });
    }
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(EditDepartementDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id
      }
    }); 
  } 

  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }


  toggleTheme() {
      this.themeService.toggleTheme();
  }
}



@Component({
  selector: 'edit-departement-dialog',
  templateUrl: './departement-edit.html',
})
export class EditDepartementDialogBox implements OnInit{
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditDepartementDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private departementService: DepartementService,
  ) {}
  


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      departement: ''
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.departementService.get(parseInt(this.data['id'])).subscribe(item => {
          this.formGroup.patchValue({
            departement: this.capitalizeTest(item.departement), 
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


  onSubmit() {
    try {
      this.isLoading = true;
      this.departementService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Modification enregistré!', 'Success!');
          // window.location.reload(); 
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

  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }


}
