import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Editor, Toolbar } from 'ngx-editor';
import { SupportService } from '../../support.service';

@Component({
  selector: 'app-suppurt-add',
  templateUrl: './suppurt-add.component.html',
  styleUrls: ['./suppurt-add.component.scss']
})
export class SuppurtAddComponent implements OnInit {
  isLoading: boolean = false; 
  formGroup!: FormGroup;
 
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

    id_module:any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder, 
    private supportService: SupportService, 
    private toastr: ToastrService) {}



  ngOnInit(): void { 
    this.id_module = this.route.snapshot.params['id_module']; 
    this.editor = new Editor();
    this.formGroup = this._formBuilder.group({ 
      section: ['', Validators.required],
      documentation: ['', Validators.required], 
    });
  }

   // make sure to destory the editor
   ngOnDestroy(): void {
    this.editor.destroy();
  }


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        console.log('id_module', this.id_module);
        this.isLoading = true;
        var body = {
          module: this.id_module,
          section: this.capitalizeTest(this.formGroup.value.section), 
          documentation: this.formGroup.value.documentation,
          created: new Date(),
          update_created: new Date(),
        };
        this.supportService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!');
            this.router.navigate(['/layouts/helps/support']);
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


  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }

}
