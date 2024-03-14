import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PostesService } from '../../postes.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { CandidaturesService } from '../../candidatures.service';
import { PosteModel } from '../../postes/models/poste-model'; 
import * as CryptoJS from 'crypto-js';
import { secretKey } from 'src/app/shared/tools/secret_key';


@Component({
  selector: 'app-offre-view-candidature',
  templateUrl: './offre-view-candidature.component.html',
  styleUrls: ['./offre-view-candidature.component.scss']
})
export class OffreViewCandidatureComponent  implements OnInit {
  isLoad: boolean = false; 
  isLoading: boolean = false; 
  formGroup!: FormGroup;

  currentUser: PersonnelModel | any;

  poste: PosteModel | any;
   
  sexeList: string[] = [
    'Femme', 'Homme'
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
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService, 
    private postesService: PostesService,
    private candidaturesService: CandidaturesService, 
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); 
    this.isLoad = true; 
    
    const decryptedId = CryptoJS.AES.decrypt(this.id.toString(), secretKey).toString(CryptoJS.enc.Utf8);
 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user; 
        this.postesService.get(Number(decryptedId)).subscribe(res => {
          this.poste = res;  
          this.isLoad = false;
        }); 
      },
      error: (error) => {
        this.isLoad = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
    this.formGroup = this._formBuilder.group({
      scan_url: ['-'],
      full_name: ['', Validators.required],
      sexe: ['', Validators.required], 
      // statut: ['', Validators.required]
    }); 
  }

  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          search_profil: this.poste.search_profil,
          scan_url: this.formGroup.value.scan_url,
          full_name: this.formGroup.value.full_name,
          sexe: this.formGroup.value.sexe,
          departement: '-',
          statut: 'Postulant',
          signature: "-",
          post: this.poste.id,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.poste.entreprise,
          code_entreprise: this.poste.code_entreprise
        };
        this.candidaturesService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!');
            this.router.navigate(['/layouts/recrutements/candidatures']);
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
}
