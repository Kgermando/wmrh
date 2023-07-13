import { Component } from '@angular/core';
import { Validators } from 'ngx-editor';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;

  isLoading = false;

  isLoggIn = false;

  form : FormGroup | any

  constructor(
    public themeService: CustomizerSettingsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService, 
  ) {}


  ngOnInit(): void {
      this.form = this.formBuilder.group({
        matricule: ['', Validators.required],
        password: ['', Validators.required]
      });
  }


  onSubmit(): void { 
    if (this.form.valid) {
      this.isLoading = true;  
      var mat = this.form.value.matricule;
      var code = mat.split("-");
      var code_entreprise = code[code.length - 1];
      var body = {
        matricule: this.form.value.matricule.toLowerCase(),
        password: this.form.value.password,
        code_entreprise: code_entreprise
      };
      this.authService.login(body).subscribe({
          next: (res) => { 
            this.isLoading = false;
            this.router.navigate(['/layouts/dashboard']);
          },
          error: (e) => {
            this.isLoading = false;
            // console.error(e);
            this.isLoggIn = true; 
            this.router.navigate(['/auth/login']);
          },
          complete: () => {
            this.isLoading = false;
          }
        }
      );
      this.isLoading = false; 
    }  
  } 

  dismissAlert() {
    this.isLoggIn = false;
  }

 

  toggleTheme() {
      this.themeService.toggleTheme();
  }

  toggleCardBorderTheme() {
      this.themeService.toggleCardBorderTheme();
  }

  toggleCardBorderRadiusTheme() {
      this.themeService.toggleCardBorderRadiusTheme();
  }
 
}
