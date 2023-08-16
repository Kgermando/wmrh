import { Component } from '@angular/core'; 
import { AuthService } from 'src/app/auth/auth.service'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CategoriepersonnelDataList } from 'src/app/shared/tools/categorie_personnel';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { RoleDataList } from 'src/app/shared/tools/role-list';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    isLoading: boolean = false; 
    formGroup!: FormGroup;
  
    currentUser: PersonnelModel | any;
  
    userID: number[] = []; // List ID
    userList: PersonnelModel[] = [];
  
   
    sexeList: string[] = [
      'Femme', 'Homme'
    ];

    roleList: string[] = RoleDataList;

  
    categoriList = CategoriepersonnelDataList;
  
  
    constructor(private router: Router,
      private _formBuilder: FormBuilder,
      private authService: AuthService,
      private toastr: ToastrService) {}
  
  
  
    ngOnInit(): void {  
      this.formGroup = this._formBuilder.group({
        nom: ['', Validators.required],
        postnom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: [''],
        telephone: ['', Validators.required],
        sexe: ['', Validators.required],
        adresse: ['', Validators.required],
        matricule: ['', Validators.required],  
        category: ['', Validators.required], 
      });
    }
    
    
    onSubmit() {
      try {
        this.isLoading = true;
        var codeEntreprise = this.currentUser.code_entreprise;
        var mat = this.formGroup.value.matricule;
        var identifiant = `${mat}-${codeEntreprise}`
        if (this.formGroup.valid) {
          var body = {
            nom: this.formGroup.value.nom,
            postnom: this.formGroup.value.postnom,
            prenom: this.formGroup.value.prenom,
            email: this.formGroup.value.email,
            telephone: this.formGroup.value.telephone,
            sexe: this.formGroup.value.sexe,
            adresse: this.formGroup.value.adresse, 
            matricule: identifiant.toLowerCase(),
            roles: this.formGroup.value.roles, 
            category: this.formGroup.value.category,
            signature: this.currentUser.matricule,
            created: new Date(),
            update_created: new Date(),
            entreprise: this.currentUser.entreprise,
            code_entreprise: this.currentUser.code_entreprise
          };
          this.authService.register(body).subscribe({
            next: () => {
              this.isLoading = false;
              this.formGroup.reset();
              this.toastr.success('Success!', 'Ajouter avec succès!');
            //   this.router.navigate(['/layouts/personnels/personnel-list']);
            },
            error: (err) => {
              this.isLoading = false;
              this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
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
  
}
