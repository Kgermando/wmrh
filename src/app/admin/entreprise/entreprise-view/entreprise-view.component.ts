import { Component, Inject, OnInit } from '@angular/core';
import { EntrepriseModel } from '../models/entreprise.model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../entreprise.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PersonnelService } from 'src/app/personnels/personnel.service';

@Component({
  selector: 'app-entreprise-view',
  templateUrl: './entreprise-view.component.html',
  styleUrls: ['./entreprise-view.component.scss']
})
export class EntrepriseViewComponent implements OnInit {
  isLoading = false;
  currentUser: PersonnelModel | any;

  entreprise: EntrepriseModel;

  personnelsList: PersonnelModel[] = [];

  nbrEmploye = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private entrepriseService: EntrepriseService,
    private personnelService: PersonnelService,
    public dialog: MatDialog,) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user; 
          this.entrepriseService.get(Number(id)).subscribe(res => {
            this.entreprise = res;
            this.personnelService.getAll(this.currentUser.code_entreprise).subscribe(personne => {
              this.personnelsList = personne;
              this.nbrEmploye = this.personnelsList.length; 
            });
            this.isLoading = false;
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });
      
    }

    openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
      this.dialog.open(EditEntrepriseDialogBox, {
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
  selector: 'edit-entreprise-dialog',
  templateUrl: './entreprise-edit.html',
})
export class EditEntrepriseDialogBox implements OnInit{
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditEntrepriseDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private entrepriseService: EntrepriseService,
  ) {}
  


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      company_name: '',
      rccm: '',
      id_nat: '',
      responsable: '',
      telephone: '',
      email: '',
      adresse: '',
      nbre_employe: '',
      statut: '',
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.entrepriseService.get(parseInt(this.data['id'])).subscribe(item => {
          this.formGroup.patchValue({
            company_name: item.company_name,
            rccm: item.rccm,
            id_nat: item.id_nat,
            responsable: item.responsable,
            telephone: item.telephone,
            email: item.email,
            adresse: item.adresse,
            nbre_employe: item.nbre_employe,
            statut: item.statut,
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
      this.entrepriseService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
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
