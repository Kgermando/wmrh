import { Component, OnInit } from '@angular/core'; 
import { SupportModel } from '../models/support.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { ToastrService } from 'ngx-toastr';
import { SupportModuleService } from '../support-module.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  isLoading = false;
  moduleDocList: SupportModel[] = [];

  constructor(private supportModuleService: SupportModuleService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.supportModuleService.refreshDataList$.subscribe(() => {
      this.getData();
    })
    this.getData();
  }


  getData() {
    this.isLoading = true;
     this.supportModuleService.getAllSupport().subscribe((res) => {
      this.moduleDocList = res;
      this.isLoading = false;
    });
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AddModuleSupportDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration, 
    }); 
  } 

}


@Component({
  selector: 'add-module-support-dialog',
  templateUrl: './add-module-support.html',
})
export class AddModuleSupportDialogBox implements OnInit {
  isLoading = false;

  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddModuleSupportDialogBox>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private supportModuleService: SupportModuleService, 
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      module: [''], 
    });  
  }

  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          module: this.formGroup.value.module,
          created: new Date(),
          update_created: new Date(),
        };
        this.supportModuleService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!');
            this.close();
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

}
