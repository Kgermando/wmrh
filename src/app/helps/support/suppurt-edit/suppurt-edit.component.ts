import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { SupportService } from '../../support.service';
import { ToastrService } from 'ngx-toastr';
import { SupportModel } from '../../models/support.model';

@Component({
  selector: 'app-suppurt-edit',
  templateUrl: './suppurt-edit.component.html',
  styleUrls: ['./suppurt-edit.component.scss']
})
export class SuppurtEditComponent implements OnInit{
  isLoading: boolean = false;

  formGroup!: FormGroup;

  support: SupportModel | any;

  moduleList: string[] = [
    'Dashboard', 'Personnel', 'Presence', 
    'Rémuneration', 'Performances', 'Recrutements', 
    'Reglage'
  ];

  editor: Editor | any;
    html: '' | any;
    toolbar: Toolbar = [
        // default value
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear'],
    ];

    id:any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder, 
    private supportService: SupportService, 
    private toastr: ToastrService) {}

    ngOnInit(): void { 
      this.id = this.route.snapshot.params['id']; 
      this.editor = new Editor();
      this.formGroup = this._formBuilder.group({
        section: [''],
        documentation: [''], 
      });

      this.supportService.get(this.id).subscribe((item) => {
        this.support = item; 
        this.formGroup.patchValue({ 
          section: this.capitalizeTest(item.section),
          documentation: item.documentation, 
          update_created: new Date(),
        });
      });
    }
  
     // make sure to destory the editor
     ngOnDestroy(): void {
      this.editor.destroy();
    }


    onSubmit() {
      try {
        this.isLoading = true;
        this.supportService.update(this.id, this.formGroup.getRawValue())
        .subscribe({
          next: () => {
            this.toastr.success('Modification enregistré!', 'Success!');
            this.router.navigate(['/layouts/helps/support']);
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


    capitalizeTest(text: string): string {
      return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
    }
}
