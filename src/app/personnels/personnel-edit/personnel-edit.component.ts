import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonnelModel } from '../models/personnel-model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelService } from '../personnel.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';
import { DepartementService } from 'src/app/preferences/departements/departement.service';
import { FonctionService } from 'src/app/preferences/fonction/fonction.service';
import { TitleService } from 'src/app/preferences/titles/title.service';
import { ServiceService } from 'src/app/preferences/services/service.service';
import { SiteLocationService } from 'src/app/preferences/site-location/site-location.service';
import { DepartementModel } from 'src/app/preferences/departements/model/departement-model';
import { FonctionModel } from 'src/app/preferences/fonction/models/fonction-model';
import { TitleModel } from 'src/app/preferences/titles/models/title-model';
import { ServicePrefModel } from 'src/app/preferences/services/models/service-models';
import { SiteLocationModel } from 'src/app/preferences/site-location/models/site-location-model';

@Component({
  selector: 'app-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrls: ['./personnel-edit.component.scss']
})
export class PersonnelEditComponent implements OnInit {
  isLoading: boolean = false;

  formGroup!: FormGroup;
  formGroup2!: FormGroup;
  formGroup3!: FormGroup;
  formGroup4!: FormGroup;

  currentUser: PersonnelModel | any;

  userID: number[] = []; // List ID
  userList: PersonnelModel[] = [];

  typeContrat: string = 'CDD';

 
  sexeList: string[] = [
    'Femme', 'Homme'
  ];
  etatCivileList: string[] = [
    'Marié(e)', 'Celibataire'
  ];
  roleList: number[] = [
    1,2,3,4,5
  ];
  typeContratList: string[] = [
    'CDD', 'CDI'
  ];
  categoryList: string[] = [
    'Manoeuvres Ordinaires (MO)',
    'Manoeuvres Spécialisés (MS)',
    'Travailleurs semi Qualifiés (TSQ)',
    'Travailleurs Qualifiés (TQ)',
    'Travailleurs Hautement Qualifiés (THQ)',
    'Cadres Subalternes',
    'Cadres Supérieurs' 
  ];

  id: number;

  departementList: DepartementModel[] = [];
  fonctionList: FonctionModel[] = [];
  titleList: TitleModel[] = [];
  serviceList: ServicePrefModel[] = [];
  siteLocationList: SiteLocationModel[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private authService: AuthService, 
    private personnelService: PersonnelService,
    private departementService: DepartementService,
    private fonctionService: FonctionService,
    private titleService: TitleService,
    private serviceService: ServiceService,
    private siteLocation: SiteLocationService,
    private toastr: ToastrService) {}


  public onChange(event: MatSelectChange) { 
    this.typeContrat =  event.value;
    console.log(this.typeContrat ); 
  }


  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.personnelService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.userList = res;
          this.userID = this.userList.map(e => e.id);
        });
        this.departementService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.departementList = res; 
        });
        this.fonctionService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.fonctionList = res; 
        });
        this.titleService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.titleList = res; 
        });
        this.serviceService.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.serviceList = res;
        });
        this.siteLocation.getAll(this.currentUser.code_entreprise).subscribe(res => {
          this.siteLocationList = res;
        });
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });

    this.formGroup = this._formBuilder.group({
      nom: [''],
      postnom: [''],
      prenom: [''],
      email: [''],
      telephone: [''],
      sexe: [''],
      adresse: [''],
      matricule: [''],
      category: [''],
      role: [''],
    });

    this.formGroup2 = this._formBuilder.group({
      numero_cnss: [''],
      date_naissance: [''],
      lieu_naissance: [''],
      nationalite: [''],
      etat_civile: [''],
      nbr_enfant: [''],
      nbr_dependants: [''],
      nbr_dependants_max: [''],
    }); 

    this.formGroup3 = this._formBuilder.group({
      departement: [''],
      title: [''],
      fonction: [''],
      services: [''],
      site_location: [''],
      type_contrat: [''],
      date_debut_contrat: [''],
      date_fin_contrat: ['2099-06-27 15:45:59.632	'],
    });

    this.formGroup4 = this._formBuilder.group({
      salaire: [''],
      compte_bancaire: [''],
      nom_banque: [''],
      frais_bancaire: [''],
      statut_personnel: [''],
      syndicat: [''],
      cv_url: [''], 
    });


    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.personnelService.get(this.id).subscribe(item => { 
        this.formGroup.patchValue({
          nom: item.nom,
          postnom: item.postnom,
          prenom: item.prenom,
          email: item.email,
          telephone: item.telephone,
          sexe: item.sexe,
          adresse: item.adresse,
          matricule: item.matricule,
          category: item.category,
          role: item.role,
          signature: this.currentUser.matricule, 
          update_created: new Date()
        });
        this.formGroup2.patchValue({ 
          numero_cnss: item.numero_cnss,
          date_naissance: item.date_naissance,
          lieu_naissance: item.lieu_naissance,
          nationalite: item.nationalite,
          etat_civile: item.etat_civile,
          nbr_enfant: item.nbr_enfant,
          nbr_dependants: item.nbr_dependants,
          nbr_dependants_max: item.nbr_dependants_max,
          signature: this.currentUser.matricule, 
          update_created: new Date()
        });
        this.formGroup3.patchValue({ 
          departement: item.departement,
          title: item.title,
          fonction: item.fonction,
          services: item.services,
          site_location: item.site_location,
          type_contrat: item.type_contrat,
          date_debut_contrat: item.date_debut_contrat,
          date_fin_contrat: item.date_fin_contrat,
          signature: this.currentUser.matricule,
          update_created: new Date()
        });
        this.formGroup4.patchValue({ 
          salaire: item.salaire,
          compte_bancaire: item.compte_bancaire,
          nom_banque: item.nom_banque,
          frais_bancaire: item.frais_bancaire,
          statut_personnel: item.statut_personnel,
          syndicat: item.syndicat,
          cv_url: item.cv_url, 
          signature: this.currentUser.matricule,
          update_created: new Date()
        });
      }
    );
  }

  onSubmit() {
    try {
      this.isLoading = true;
      this.personnelService.update(this.id, this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.toastr.success('Success!', 'Modification enregistré!');
          // this.router.navigate(['/layouts/personnels/personnel-list']);
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
          this.isLoading = false;
        }
      });

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  onSubmit2() {
    try {
      this.isLoading = true;
      this.personnelService.update(this.id, this.formGroup2.getRawValue())
      .subscribe({
        next: () => {
          this.toastr.success('Success!', 'Modification enregistré!');
          // this.router.navigate(['/layouts/personnels/personnel-list']);
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
          this.isLoading = false;
        }
      });
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  onSubmit3() {
    try {
      this.isLoading = true;
      this.personnelService.update(this.id, this.formGroup3.getRawValue())
      .subscribe({
        next: () => {
          this.toastr.success('Success!', 'Modification enregistré!');
          // this.router.navigate(['/layouts/personnels/personnel-list']);
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
          this.isLoading = false;
        }
      });

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  onSubmit4() {
    try {
      this.isLoading = true;
      this.personnelService.update(this.id, this.formGroup4.getRawValue())
      .subscribe({
        next: () => {
          this.toastr.success('Success!', 'Modification enregistré!');
          // this.router.navigate(['/layouts/personnels/personnel-list']);
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
          this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
          this.isLoading = false;
        }
      });

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  navigate() {
    this.router.navigate(['/layouts/personnels/personnel-list']);
  }
}
