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

  isLoadingForm = false;
  isLoading = false;

  formGroup!: FormGroup;

  currentUser: PersonnelModel | any;

 
  apointementLastItem: ApointementModel[] = [];
  apointementItem: ApointementModel;

  isAbsense = false;

  isDisable = true;

  isPToday = false;
  isAToday = false;
  isAAToday = false; 
  isAMToday = false;
  isCDToday = false;
  isCAToday = false;
  isCOToday = false;
  isSToday = false;
  isOToday = false;
  isMToday = false;

  isPTodayForm = false;
  isATodayForm = false;
  isAATodayForm = false; 
  isAMTodayForm = false;
  isCDTodayForm = false;
  isCATodayForm = false;
  isCOTodayForm = false;
  isSTodayForm = false;
  isOTodayForm = false;
  isMTodayForm = false;

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
    this.isLoading = true;
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

      const dateToday = new Date();
      const day = dateToday.getDate();
      const dayMonth = dateToday.getMonth();
      const dayYear = dateToday.getFullYear(); 
      // Date d'entree
      const dateEntree = new Date(this.apointementItem.date_entree);
      const dateEntreeDay = dateEntree.getDate();
      const dateEntreeMonth = dateEntree.getMonth();
      const dateEntreeYear = dateEntree.getFullYear(); 

      var datePresenceSortie = new Date(this.apointementItem.date_sortie);


      if (this.apointementItem.apointement === 'P') {
        if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
          this.isPToday = true;
        }
        if (dateEntreeDay < day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
          this.isPTodayForm = true;
        }
      } else if(this.apointementItem.apointement === 'A'){
        if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
          this.isAToday = true;
        }
        if (dateEntreeDay < day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
          this.isATodayForm = true;
        }
      } else if(this.apointementItem.apointement === 'AA'){
        if (dateEntreeDay === day && dateEntreeMonth === dayMonth && dateEntreeYear === dayYear) {
          this.isAAToday = true;
        }
      }
      
      
      else if(this.apointementItem.apointement === 'AM'){
        if (datePresenceSortie > dateToday) {
          this.isAMToday = true;
        }
      } else if(this.apointementItem.apointement === 'CD'){
        if (datePresenceSortie > dateToday) {
          this.isCDToday = true;
        } 
      } else if(this.apointementItem.apointement === 'CA'){
        if (datePresenceSortie > dateToday) {
          this.isCAToday = true;
        }
      } else if(this.apointementItem.apointement === 'CO'){
        if (datePresenceSortie > dateToday) {
          this.isCOToday = true;
        }
      } else if(this.apointementItem.apointement === 'S'){
        if (datePresenceSortie > dateToday) {
          this.isSToday = true;
        }
      } else if(this.apointementItem.apointement === 'O'){
        if (datePresenceSortie > dateToday) {
          this.isOToday = true;
        }
      } else if(this.apointementItem.apointement === 'M'){
        if (datePresenceSortie > dateToday) {
          this.isMToday = true;
        }
      }
      
      
    });
    
    this.formGroup = this._formBuilder.group({
      apointement: ['', Validators.required],
      observation: ['Rien à signaler', Validators.required],
      date_sortie: ['-', Validators.required]
    });
    this.isLoading = false;
  }

  onPresenceChange(event: any) { 
    if (
      event.value === 'AM' || event.value === 'CD' || 
      event.value === 'CA' || event.value === 'CO' || 
      event.value === 'S' || event.value === 'O' || event.value === 'M') { 
      this.isAbsense = true; 
    } else if(event.value === 'P' || event.value === 'A' || 
      event.value === 'AA') {
      this.isAbsense = false;
    } else {
      this.isAbsense = false;
    }
  }


  onSubmit() {
    try {
      this.isLoadingForm = true;
      if (this.formGroup.valid) {
        var body = { 
          matricule: this.personne.matricule,
          apointement: this.formGroup.value.apointement,
          // counter: this.isAbsense ? false : true,  // Si la personne est absente le counter ne compte pas (False)
          // presence: this.isAbsense ? false : true,
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
            this.isLoadingForm = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!');
            this.router.navigate(['/layouts/presences/pointage']);
            // window.location.reload();
          },
          error: (err) => {
            this.isLoadingForm = false;
            this.toastr.error('Oupss!', 'Une erreur s\'est produite!');
            console.log(err);
          }
        });
      }
      this.isLoadingForm = false;
    } catch (error) {
      this.isLoadingForm = false;
      console.log(error);
    }
  } 

}


