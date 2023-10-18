import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { IndemniteService } from '../indemnite.service';
import { CorporateModel } from 'src/app/preferences/corporates/models/corporate.model';
import { CorporateService } from 'src/app/preferences/corporates/corporate.service';

@Component({
  selector: 'app-indemnite-edit',
  templateUrl: './indemnite-edit.component.html',
  styleUrls: ['./indemnite-edit.component.scss']
})
export class IndemniteEditComponent {
  isLoading = false;

  formGroup!: FormGroup;
  dynamicFormGroup!: FormGroup;

  currentUser: PersonnelModel | any;
  corporate: CorporateModel;

  isActive: boolean = false;;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private route: ActivatedRoute,
      private corporateService: CorporateService,
      private toastr: ToastrService, 
      private indemniteService: IndemniteService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => { 
      this.loadData(routeParams['id']);
    });
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
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
    });
 
    this.dynamicFormGroup = this.formBuilder.group({
      content: new FormArray([this.createItem]),
    });
  }

  public loadData(id: any): void {
    this.isLoading = true;
    this.corporateService.get(Number(id)).subscribe(res => {
      this.corporate = res;
      this.isLoading = false;
    });
  }

  get createItem(): FormGroup {
    return this.formBuilder.group({
      nom: [],
      monnaie:[],
      montant:[]
    });
  }


  // onSubmit() {
  //   try {
  //     if (this.formGroup.valid) {
  //       this.isLoading = true;
  //       var body = {
  //         personnel: this.formGroup.value.personnel,
  //         statut: this.isActive,
  //         content: this.dynamicFormGroup.controls['content'].value,
  //         signature: this.currentUser.matricule,
  //         created: new Date(),
  //         update_created: new Date(),
  //         entreprise: this.currentUser.entreprise,
  //         code_entreprise: this.corporate.code_entreprise,
  //       };
  //       this.indemniteService.create(body).subscribe({
  //         next: () => {
  //           this.isLoading = false;
  //           this.formGroup.reset();
  //           this.toastr.success('Success!', 'Ajouté avec succès!');
  //           this.router.navigate(['']);
  //         },
  //         error: (err) => {
  //           this.isLoading = false;
  //           this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
  //           console.log(err);
  //         }
  //       });
  //     } 
  //   } catch (error) {
  //     this.isLoading = false;
  //     console.log(error);
  //   }
  // }
 
}
