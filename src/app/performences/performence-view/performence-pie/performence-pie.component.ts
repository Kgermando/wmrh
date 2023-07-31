import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend,
} from "ng-apexcharts"; 
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PerformenceService } from '../../performence.service';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    stroke: ApexStroke;
    chart: ApexChart;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    labels: any;
    legend: ApexLegend;
    colors: any;
};


@Component({
  selector: 'app-performence-pie',
  templateUrl: './performence-pie.component.html',
  styleUrls: ['./performence-pie.component.scss']
})
export class PerformencePieComponent {
  @Input('personne') personne: PersonnelModel; 

  isSelect = 'Mois';  
    
  @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    isLoading = false;
    currentUser: PersonnelModel | any;

    travailTotal = 0;
    hospitaliteTotal = 0;
    ponctualiteTotal = 0;
  
    constructor(
        public themeService: CustomizerSettingsService,
        private router: Router,
        private authService: AuthService,
        private performenceService: PerformenceService,
    ) {  } 


    onSelectChange(event: any) {
      console.log(event.value);
      if (event.value === 'Mois') {
        this.isSelect = 'Mois';
      } else if(event.value === 'Année') {
        this.isSelect = 'Année';
      } else if(event.value === 'All') {
        this.isSelect = 'All';
      }
       
    }

    ngOnInit(): void {
      this.isLoading = true;
        this.authService.user().subscribe({
          next: (user) => {
            this.currentUser = user;
            this.performenceService.ponctualiteTotal(this.currentUser.code_entreprise, this.personne.id).subscribe(
              res => {
                var ponctualites = res; 
                ponctualites.map((item: any) => this.ponctualiteTotal = parseFloat(item.sum)); 
              }
            );
            this.performenceService.travailTotal(this.currentUser.code_entreprise, this.personne.id).subscribe(
              res => {
                var travails = res; 
                travails.map((item: any) => this.travailTotal = parseFloat(item.sum)); 
              }
            );
            this.performenceService.hospitaliteTotal(this.currentUser.code_entreprise, this.personne.id).subscribe(
              res => {
                var hospitalite = res; 
                hospitalite.map((item: any) => this.hospitaliteTotal = parseFloat(item.sum)); 
              }
            );
          },
          error: (error) => {
            this.router.navigate(['/auth/login']);
            console.log(error);
          }
        });  
        this.isLoading = false;
    }

 
}