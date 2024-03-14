import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PostesService } from '../../postes.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';


@Component({
  selector: 'app-poste-edit',
  templateUrl: './poste-edit.component.html',
  styleUrls: ['./poste-edit.component.scss']
})
export class PosteEditComponent implements OnInit{
  isLoading: boolean = false; 
  formGroup!: FormGroup;

  currentUser: PersonnelModel | any;

  typeContratList: string[] = [
    'CDD', 'CDI'
  ];

  statutList: string[] = [
    'Disponible', 'Cloturé'
  ];

  blurred = false
  focused = false
 
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {}

  focus($event:any) {
      this.focused = true
      this.blurred = false
  }

  blur($event:any) {
      this.focused = false
      this.blurred = true
  }

  id: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private authService: AuthService, 
    private postesService: PostesService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.id = this.route.snapshot.paramMap.get('id');

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user; 
        console.log('currentUser', this.currentUser)
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

    this.formGroup = this._formBuilder.group({
      search_profil: [''],
      resume: [''],
      type_contrat: [''],
      statut: [''],
      echeance: ['']
    });
 
    this.postesService.get(Number(this.id)).subscribe(item => {
      this.formGroup.patchValue({
        search_profil: item.search_profil,
        resume: item.resume,
        type_contrat: item.type_contrat,
        statut: item.statut,
        echeance: item.echeance,
        signature: this.currentUser.matricule,
        update_created: new Date()
      }); 
    });

  }

  onSubmit() {
    try {
      this.isLoading = true;
      this.postesService.update(Number(this.id), this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.toastr.success('Modification enregistré!', 'Success!');
          this.router.navigate(['/layouts/recrutements/postes']);
          this.isLoading = false;
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
}
