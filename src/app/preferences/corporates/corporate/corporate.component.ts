import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service'; 
import { AuthService } from 'src/app/auth/auth.service'; 
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CorporateModel } from '../models/corporate.model';
import { CorporateService } from '../corporate.service';
import { ReglageService } from '../../reglages/reglage.service';
import { PreferenceModel } from '../../reglages/models/reglage-model';

@Component({
  selector: 'app-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.scss']
})
export class CorporateComponent implements OnInit {

  isLoading = false;

  formGroup!: FormGroup;

  corporateList: CorporateModel[] = [];

  currentUser: PersonnelModel | any;
  
  preference: PreferenceModel;

  constructor(
    private router: Router,
      public themeService: CustomizerSettingsService,
      private authService: AuthService,
      private _formBuilder: FormBuilder,
      private corporateService: CorporateService,
      private reglageService: ReglageService,
      public dialog: MatDialog,
      private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.reglageService.preference(this.currentUser.code_entreprise).subscribe(res => {
          this.preference = res; 
          this.corporateService.getAll(this.currentUser.code_entreprise).subscribe(res => {
            this.corporateList = res; 
            this.isLoading = false;
          });
        });
        
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

    this.formGroup = this._formBuilder.group({ 
      // logo: ['', Validators.required],
      corporate_name: ['', Validators.required],  
      nbre_employe: ['', Validators.required],
      rccm: ['', Validators.required],
      id_nat: ['', Validators.required],
      numero_impot: ['', Validators.required],
      numero_cnss: ['', Validators.required],
      responsable: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }


  onSubmit() {
    try {
      if (this.formGroup.valid) { 
        var code_corporate = 0;
        var code = this.corporateList.length + 1;
        if (code_corporate <= 9) {
          code_corporate = parseInt(`00${code}`);
        } else if (code_corporate > 9 && code_corporate >= 99) {
          code_corporate = parseInt(`0${code}`);
        } else if (code_corporate > 99 && code_corporate >= 999) {
          code_corporate = parseInt(`${code}`);
        }
        
        this.isLoading = true;
        var body = {
          entreprise_id: this.preference.company.id,
          logo: '-',
          corporate_name: this.formGroup.value.corporate_name, // Nom de la corporate 
          statut: true, // statut entreprise sous traitant 
          code_corporate: code_corporate,
          nbre_employe: this.formGroup.value.nbre_employe, 
          rccm: this.formGroup.value.rccm, 
          id_nat: this.formGroup.value.id_nat, 
          numero_impot: this.formGroup.value.numero_impot, 
          numero_cnss: this.formGroup.value.numero_cnss, 
          responsable: this.formGroup.value.responsable, 
          telephone: this.formGroup.value.telephone,
          email: this.formGroup.value.email, 
          adresse: this.formGroup.value.adresse,
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        };
        this.corporateService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!'); 
            window.location.reload();
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

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.corporateService
        .delete(id)
        .subscribe({
          next: () => {
            this.toastr.info('Success!', 'Supprimé avec succès!');
            window.location.reload();
          },
          error: err => {
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          }
        });
    }
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(EditCorporateDialogBox, {
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
}



@Component({
  selector: 'edit-corporate-dialog',
  templateUrl: './corporate-edit.html',
})
export class EditCorporateDialogBox implements OnInit{
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditCorporateDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private corporateService: CorporateService,
  ) {}
  


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      logo: '',
      corporate_name: '', // Nom de la corporate  
      nbre_employe: '', 
      rccm: '', 
      id_nat: '', 
      numero_impot: '', 
      numero_cnss: '', 
      responsable: '', 
      telephone: '',
      email: '', 
      adresse: '',
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.corporateService.get(parseInt(this.data['id'])).subscribe(item => {
          this.formGroup.patchValue({
            logo: item.logo,
            corporate_name: item.corporate_name, // Nom de la corporate  
            nbre_employe: item.nbre_employe, 
            rccm: item.rccm, 
            id_nat: item.id_nat, 
            numero_impot: item.numero_impot, 
            numero_cnss: item.numero_cnss, 
            responsable: item.responsable, 
            telephone: item.telephone,
            email: item.email, 
            adresse: item.adresse,
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
      this.corporateService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Modification enregistré!', 'Success!');
          window.location.reload(); 
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

}
