import { Component, Inject, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { SupportModel } from '../models/support.model';
import { SupportService } from '../support.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportModuleModel } from '../models/support-module.model';
import { SupportModuleService } from '../support-module.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-support-section',
  templateUrl: './support-section.component.html',
  styleUrls: ['./support-section.component.scss']
})
export class SupportSectionComponent implements OnInit {
  isLoading = false;
 
  supportModule: SupportModuleModel | any;
  supportSectionList: SupportModel[] = [];

  id_module:any;
  
  constructor(
      public themeService: CustomizerSettingsService,
      private route: ActivatedRoute,
      private router: Router,
      private supportModuleService: SupportModuleService,
      private supportService: SupportService,
      private dialog: MatDialog,
      private toastr: ToastrService,
  ) {}


  ngOnInit(): void {
    this.id_module = this.route.snapshot.params['id_module'];
    this.supportModuleService.get(this.id_module).subscribe((item) => {
      this.supportModule = item;
    });
    this.supportService.refreshDataList$.subscribe(() => {
      this.getData();
    })
    this.getData();
  }


  getData() {
    this.isLoading = true;
     this.supportService.findGetAll(this.id_module).subscribe((res) => {
      this.supportSectionList = res;
      this.isLoading = false;
    });
  }

  add(id_module:number) {
    this.router.navigate(['/layouts/helps/support/', id_module, 'add']);
  }


  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.supportModuleService
        .delete(id)
        .subscribe({
          next: () => {
            this.toastr.info('Success!', 'Supprimé avec succès!'); 
            this.router.navigate(['/layouts/helps/support']);
          },
          error: err => {
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          }
        }
      );
    }
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: any): void {
    this.dialog.open(EditSupportModuleDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        id: id, 
      }
    }); 
  } 

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}



@Component({
  selector: 'edit-support-module-dialog',
  templateUrl: './support-Module-edit.html',
})
export class EditSupportModuleDialogBox implements OnInit {
  isLoading = false;

  formGroup!: FormGroup; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditSupportModuleDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private toastr: ToastrService,
      private supportModuleService: SupportModuleService, 
  ) {}
  


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      module: [''], 
    });

    this.supportModuleService.get(parseInt(this.data['id'])).subscribe(item => {
      this.formGroup.patchValue({
        module: item.module, 
        update_created: new Date(),
      });
    });
  } 


  onSubmit() {
    try {
      this.isLoading = true;
      this.supportModuleService.update(parseInt(this.data['id']), this.formGroup.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.toastr.success('Modification enregistré!', 'Success!');
          this.router.navigate(['/layouts/helps/support']);
          this.close();
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
