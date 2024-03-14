import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PersonnelService } from 'src/app/personnels/personnel.service';

@Component({
  selector: 'app-corbeil-view',
  templateUrl: './corbeil-view.component.html',
  styleUrls: ['./corbeil-view.component.scss']
})
export class CorbeilViewComponent implements OnInit {
  isLoading = false;

  personne: PersonnelModel | any;

  currentUser: PersonnelModel | any;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private personnelService: PersonnelService,
    private dialog: MatDialog) {}


    ngOnInit(): void {
      this.isLoading = true;
      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          let id = this.route.snapshot.paramMap.get('id');  // this.route.snapshot.params['id'];
          this.personnelService.get(Number(id)).subscribe(res => {
            this.personne = res;
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
      this.dialog.open(RestaurerPersonnelDialogBox, {
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
  selector: 'edit-restaurer-personnel-dialog',
  templateUrl: './rest-personnel-edit.html',
})
export class RestaurerPersonnelDialogBox implements OnInit{
  isLoading = false;

  formGroup!: FormGroup;
 

  currentUser: PersonnelModel | any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<RestaurerPersonnelDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService, 
      private toastr: ToastrService,
      private personnelService: PersonnelService,
  ) {}
  


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      is_delete: ''
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.personnelService.get(parseInt(this.data['id'])).subscribe(item => {
          this.formGroup.patchValue({
            is_delete: item.is_delete, 
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
      this.personnelService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Restauration effectuée', 'Success!');
          this.close(); 
          this.router.navigate(['/layouts/personnels/hors-usages']);
        },
        error: err => {
          console.log(err);
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          this.isLoading = false;
        }
      });

       // this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  close(){
    this.dialogRef.close(true);
  } 

}

