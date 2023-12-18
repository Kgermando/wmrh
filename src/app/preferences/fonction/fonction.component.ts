import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { FonctionModel } from './models/fonction-model';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { AuthService } from 'src/app/auth/auth.service';
import { FonctionService } from './fonction.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartementService } from '../departements/departement.service';
import { DepartementModel } from '../departements/model/departement-model';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {
  isLoading = false;
  isLoadingForm = false;

  formGroup!: FormGroup;

  fonctionList: FonctionModel[] = [];

  departmentList: DepartementModel[] = [];

  currentUser: PersonnelModel | any;


  constructor(
    private router: Router,
      public themeService: CustomizerSettingsService,
      private authService: AuthService,
      private _formBuilder: FormBuilder,
      private fonctionService: FonctionService,
      private departementService: DepartementService,
      public dialog: MatDialog,
      private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.fonctionService.refreshDataList$.subscribe(() => {
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
      fonction: ['', Validators.required],
      departement: ['', Validators.required],
    });
  }

  private getAllData(code_entreprise: string) {
    this.fonctionService.getAll(code_entreprise).subscribe(res => {
      this.fonctionList = res; 
      this.departementService.getAll(code_entreprise).subscribe(res => {
        this.departmentList = res;
        this.isLoading = false;
      });
    });
  }



  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoadingForm = true;
        var body = {
          fonction: this.capitalizeTest(this.formGroup.value.fonction),
          departement: this.formGroup.value.departement,
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        };
        this.fonctionService.create(body).subscribe({
          next: () => {
            this.isLoadingForm = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!');
            // window.location.reload();
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
      this.fonctionService
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
    this.dialog.open(EditFonctionDialogBox, {
      width: '600px', 
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id
      }
    }); 
  } 

  toggleTheme() {
    this.themeService.toggleTheme();
  }


  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }
}


@Component({
  selector: 'edit-fonction-dialog',
  templateUrl: './fonction-edit.html',
})
export class EditFonctionDialogBox implements OnInit{
  isLoading = false;

  formGroup!: FormGroup;

  departmentList: DepartementModel[] = [];
 

  currentUser: PersonnelModel | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditFonctionDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private fonctionService: FonctionService,
      private departementService: DepartementService,
  ) {}
  


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      fonction: '',
      departement: '',
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.departementService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.departmentList = res; 
        });
        this.fonctionService.get(parseInt(this.data['id'])).subscribe(item => {
          this.formGroup.patchValue({
            fonction: this.capitalizeTest(item.fonction),
            departement: item.departement,
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
      this.fonctionService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
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

       // this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  close(){
    this.dialogRef.close(true);
  }

  compareFn(c1: DepartementModel, c2: DepartementModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }

}
