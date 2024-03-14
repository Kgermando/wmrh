import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PerformenceService } from '../performence.service';
import { PerformenceModel } from '../models/performence-model';

@Component({
  selector: 'app-cumul',
  templateUrl: './cumul.component.html',
  styleUrls: ['./cumul.component.scss']
})
export class CumulComponent implements OnInit {
  @Input('element') element!: PersonnelModel;

  isLoading = false;

  currentUser: PersonnelModel | any;

  performenceList: PerformenceModel[] = [];
  plafondCumul = 0;
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
          this.performenceService.cumulTotal(this.currentUser.code_entreprise, this.element.id).subscribe(res => {
            var cumulCount = res;
            this.plafondCumul = cumulCount[0].count * 30;
            this.performenceService.hospitaliteTotal(this.currentUser.code_entreprise, this.element.id).subscribe(
              h => {
                this.performenceService.ponctualiteTotal(this.currentUser.code_entreprise, this.element.id).subscribe(
                  p => {
                    this.performenceService.travailTotal(this.currentUser.code_entreprise, this.element.id).subscribe(
                      t => {
                        var travail = t;
                        var ponctualite = p;  
                        var hospitalite = h; 
                        ponctualite.map((item: any) => this.ponctualiteTotal = parseFloat(item.sum));
                        hospitalite.map((item: any) => this.hospitaliteTotal = parseFloat(item.sum)); 
                        travail.map((item: any) => this.travailTotal = parseFloat(item.sum));
  
                        this.cumuls = this.hospitaliteTotal + this.ponctualiteTotal + this.travailTotal;

                        console.log('ponctualite',ponctualite);
                        console.log('hospitalite',hospitalite);
                        console.log('travail',travail);
   
                        this.isLoading = false;
                      }
                    );
                  }
                ); 
              }
            );
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
          console.log(error);
        }
      });   
  }
}
