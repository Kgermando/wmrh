import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PerformenceService } from '../performence.service';

@Component({
  selector: 'app-cumul',
  templateUrl: './cumul.component.html',
  styleUrls: ['./cumul.component.scss']
})
export class CumulComponent implements OnInit {
  @Input('element') element: PersonnelModel;

  isLoading = false;

  currentUser: PersonnelModel | any;

  cumuls = 0;

  hospitaliteTotal = 0;
  ponctualiteTotal = 0;
  travailTotal = 0;


  constructor(
    public themeService: CustomizerSettingsService, 
    private router: Router,
    private authService: AuthService,
    private performenceService: PerformenceService,) {}



  ngOnInit(): void {
    this.isLoading = true;
      this.authService.user().subscribe({
        next: (user) => {
          this.currentUser = user;
          this.performenceService.hospitaliteTotal(this.currentUser.code_entreprise, this.element.id).subscribe(
            res => {
              var performences = res; 
              performences.map((item: any) => this.hospitaliteTotal = parseFloat(item.sum));
              performences.map((item: any) => this.ponctualiteTotal = parseFloat(item.sum)); 
              performences.map((item: any) => this.travailTotal = parseFloat(item.sum));

              this.cumuls = this.hospitaliteTotal + this.ponctualiteTotal + this.travailTotal;
            }
          );
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });   
  }
}
