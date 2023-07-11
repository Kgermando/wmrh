import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PresenceService } from '../../presence.service';
import { ApointementModel } from '../../models/presence-model';

@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.scss']
})
export class PresenceFormComponent {
  @Input('personne') personne: PersonnelModel; 

  isLoading = false;

  formGroup!: FormGroup;

  currentUser: PersonnelModel | any;

 
  apointementLastItem: ApointementModel[] = [];
  apointementItem: ApointementModel;

  isAbsense = false;

  apointementList: string[] = [
    'P',
    'A',
    'AA',
    'AM',
    'CD',
    'CA',
    'CO',
    'S', 
    'O',
    'M'
  ];

  constructor(
    private router: Router,
      public themeService: CustomizerSettingsService,
      private authService: AuthService,
      private _formBuilder: FormBuilder,
      private presenceService: PresenceService,
      public dialog: MatDialog,
      private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

    this.presenceService.getLastItem(this.personne.code_entreprise, this.personne.matricule).subscribe((res: ApointementModel[]) => {
      this.apointementLastItem = res;
      this.apointementItem = this.apointementLastItem[0]; 
    });
    
    this.formGroup = this._formBuilder.group({
      apointement: ['', Validators.required],
      observation: ['Rien à signaler', Validators.required],
      date_sortie: ['-', Validators.required]
    });
  }

  onPresenceChange(event: any) {
    console.log(event.value);
    if (
      event.value === 'AA' || event.value === 'AM' || 
      event.value === 'CD' || event.value === 'CA' || event.value === 'CO' || 
      event.value === 'S' || event.value === 'M') { 
      this.isAbsense = true;
    } else if(event.value === 'P' || event.value === 'A' || event.value === 'O') {
      this.isAbsense = false;
    }
  }


  onSubmit() {
    try {
      this.isLoading = true;
      if (this.formGroup.valid) {
        var body = { 
          matricule: this.personne.matricule,
          apointement: this.formGroup.value.apointement,
          counter: this.isAbsense ? false : true,  // Si la personne est absente le counter ne compte pas (False)
          presence: this.isAbsense ? false : true,
          observation: this.formGroup.value.observation,
          date_entree: new Date(),
          date_sortie: this.isAbsense ? this.formGroup.value.date_sortie : new Date(),
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise,
          personnel: this.personne.id
        };
        this.presenceService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!');
            this.router.navigate(['/layouts/presences/pointage']);
            // window.location.reload();
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
            console.log(err);
          }
        });
      }
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  openEditDialog(
    enterAnimationDuration: string, 
    exitAnimationDuration: string, 
    apointementItem: ApointementModel,
    personne: PersonnelModel
    ): void {
    this.dialog.open(PresenceSortieDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        apointementItem: apointementItem,
        personne: personne
      }
    }); 
  } 

}



@Component({
  selector: 'edit-departement-dialog',
  templateUrl: './presence-sortie.html',
  styleUrls: ['./presence-form.component.scss']
})
export class PresenceSortieDialogBox implements OnInit{
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<PresenceSortieDialogBox>, 
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private presenceService: PresenceService,
  ) {}
  


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  
  } 


  onSubmitUpdate() {
    try {
      this.isLoading = true; 
        var body = { 
          presence: false,
          date_sortie: new Date(),
          signature: this.currentUser.matricule,
          update_created: new Date(), 
        };
        this.presenceService.update(this.data.apointementItem.id, body).subscribe({
          next: () => {
            this.isLoading = false; 
            this.toastr.success('Success!', 'Sortie confirmée!');
            this.router.navigate(['/layouts/presences/pointage']);
            // window.location.reload();
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
            console.log(err);
          }
        }); 
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  close(){
    this.dialogRef.close(true);
  } 
 
}
