import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { HoraireModel } from '../models/horaire.model'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HoraireService } from '../horaire.service';

@Component({
  selector: 'app-horaire-sidebar',
  templateUrl: './horaire-sidebar.component.html',
  styleUrls: ['./horaire-sidebar.component.scss']
})
export class HoraireSidebarComponent implements OnChanges { 
  @Input() horaireList: HoraireModel[] = [];

  searchText: string | any;

  // horaireFilterList: HoraireModel[] = [];

  // currentUser: PersonnelModel | any;

  constructor(
    public themeService: CustomizerSettingsService, 
    public dialog: MatDialog,
  ) {}


  ngOnChanges(changes: SimpleChanges): void { } 

  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.horaireFilterList = this.horaireList.filter(horaire => horaire.name_horaire.
  //     includes(filterValue.trim().toLowerCase()));
  // }

  openAddEventDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(HoraireAddDialogBox, {
      width: '600px', 
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  } 


  toggleTheme() {
      this.themeService.toggleTheme();
  }
}


@Component({
  selector: 'horaire-dialog',
  templateUrl: './horaire-add.html',
})
export class HoraireAddDialogBox implements OnInit {
  isLoading = false;

  formGroup!: FormGroup;

  currentUser: PersonnelModel | any;    

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<HoraireAddDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService, 
      private horairervice: HoraireService,
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
    
    this.formGroup = this.formBuilder.group({
      name_horaire: ['', Validators.required],
    });
  }


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          name_horaire: this.capitalizeText(this.formGroup.value.name_horaire),
          personnel_shift_1: [],
          date_shift_1: [],
          time_1: '-',
          personnel_shift_2: [],  
          date_shift_2: [],
          time_2: '-',
          personnel_shift_3: [],
          date_shift_3: [],
          time_3: '-',
          signature: this.currentUser.matricule,
          created: new Date(),
          update_created: new Date(),
          entreprise: this.currentUser.entreprise,
          code_entreprise: this.currentUser.code_entreprise, 
        };
        this.horairervice.create(body).subscribe({
          next: (res) => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Success!', 'Ajouté avec succès!');
            // window.location.reload();
            this.close();
            // this.router.navigate(['/layouts/presences', this.data.corporate.id, 'horaires', res.is, 'calendar']);
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

  close(){
      this.dialogRef.close(true);
  } 

  capitalizeText(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }

}