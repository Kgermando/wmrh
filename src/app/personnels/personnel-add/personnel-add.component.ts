import { Component, OnInit } from '@angular/core'; 
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelService } from '../personnel.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { PersonnelModel } from '../models/personnel-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personnel-add',
  templateUrl: './personnel-add.component.html',
  styleUrls: ['./personnel-add.component.scss']
})
export class PersonnelAddComponent implements OnInit {
  isLoading: boolean = false; 
  formGroup!: FormGroup;

  currentUser: PersonnelModel | any;

  userID: number[] = []; // List ID
  userList: PersonnelModel[] = [];

 
  sexeList: string[] = [
    'Femme', 'Homme'
  ];
  roleList: number[] = [
    1,2,3,4,5
  ];
  categoryList: string[] = [
    'Manoeuvres Ordinaires (MO)',
    'Travailleur Spécialisés (MS)',
    'Travailleurs semi Qualifiés (TSQ)',
    'Travailleurs Qualifiés (TQ)',
    'Travailleurs Hautement Qualifiés (THQ)',
    'Cadres Subalternes',
    'Cadres Supérieurs' 
  ];

  constructor(private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService, 
    private personnelService: PersonnelService,
    private toastr: ToastrService) {}



  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.personnelService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.userList = res;
          this.userID = this.userList.map(e => e.id);
        });
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

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
      role: ['', Validators.required],
    });
  }
  
  
  onSubmit() {
    try {
      this.isLoading = true;
      var year = formatDate(new Date(), 'yy', 'en');
      var numID = 0;
      if (this.userID.length !== 0) {
        numID = Math.max(...this.userID);
      }
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
          category: this.formGroup.value.category,
          role: this.formGroup.value.role, 
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise
        };
        this.personnelService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouter avec succès!');
            this.router.navigate(['/layouts/personnels/personnel-list']);
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
