import { Component, Input, OnInit, ViewChild } from '@angular/core'; 
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PerformenceService } from 'src/app/performences/performence.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model'; 
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexGrid,
    ApexPlotOptions,
    ApexResponsive,
    ApexXAxis,
    ApexYAxis,
    ApexLegend,
    ApexFill
} from "ng-apexcharts";
import { PerformencePieModel } from 'src/app/performences/models/performence-pie-model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    grid: ApexGrid;
    chart: ApexChart;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    legend: ApexLegend;
    fill: ApexFill;
    colors: any;
};


@Component({
  selector: 'app-performence-pie-all',
  templateUrl: './performence-pie-all.component.html',
  styleUrls: ['./performence-pie-all.component.scss']
})
export class PerformencePieAllComponent {
  @Input('personne') personne: PersonnelModel; 

  isSelect = 'Mois';  
    
  @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    prerformencePieList: PerformencePieModel[] = [];


    isLoading = false;

    currentUser: PersonnelModel | any; 

    travailTotal = 0;
    hospitaliteTotal = 0;
    ponctualiteTotal = 0;
  
  
    constructor(
        public themeService: CustomizerSettingsService,
        private router: Router,
        private authService: AuthService,
        private performenceService: PerformenceService
    ) {
        
    }

    ngOnInit(): void { 
        this.isLoading = true;
        this.authService.user().subscribe({
          next: (user) => {
            this.currentUser = user;
            this.performenceService.ponctualiteTotalALL(this.currentUser.code_entreprise, this.personne.id).subscribe(
              res => {
                var ponctualites = res; 
                ponctualites.map((item: any) => this.ponctualiteTotal = parseFloat(item.sum)); 
              }
            );
            this.performenceService.travailTotalALL(this.currentUser.code_entreprise, this.personne.id).subscribe(
              res => {
                var travails = res; 
                travails.map((item: any) => this.travailTotal = parseFloat(item.sum)); 
              }
            );
            this.performenceService.hospitaliteTotalALL(this.currentUser.code_entreprise, this.personne.id).subscribe(
              res => {
                var hospitalite = res; 
                hospitalite.map((item: any) => this.hospitaliteTotal = parseFloat(item.sum)); 
              }
            );
            this.getPie();
          },
          error: (error) => {
            this.router.navigate(['/auth/login']);
            console.log(error);
          }
        });  
        this.isLoading = false;
    }

    getPie() {
        this.performenceService.getPieAll(this.personne.code_entreprise, this.personne.id).subscribe(
            res => {
                this.prerformencePieList = res;
                this.chartOptions = {
                    series: [
                        {
                            name: "Ponctualité",
                            data: this.prerformencePieList.map((item: any) => parseFloat(item.ponctualite)),
                        },
                        {
                            name: "Hospitalité",
                            data: this.prerformencePieList.map((item: any) => parseFloat(item.hospitalite)),
                        },
                        {
                            name: "Travail",
                            data: this.prerformencePieList.map((item: any) => parseFloat(item.travail)),
                        }
                    ],
                    chart: {
                        type: "bar",
                        height: 350,
                        stacked: true,
                        toolbar: {
                            show: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false
                        }
                    },
                    xaxis: {
                        type: "category",
                        axisBorder: {
                            show: false,
                        },
                        categories: this.prerformencePieList.map((item: PerformencePieModel) => {
                            if (item.month == 1) {
                                return "Jan";
                            } else if(item.month == 2) {
                                return "Feb";
                            } else if(item.month == 3) {
                                return "Mar";
                            } else if(item.month == 4) {
                                return "Avr";
                            } else if(item.month == 5) {
                                return "Mai";
                            } else if(item.month == 6) {
                                return "Juin";
                            } else if(item.month == 7) {
                                return "Jul";
                            } else if(item.month == 8) {
                                return "Aou";
                            } else if(item.month == 9) {
                                return "Sep";
                            } else if(item.month == 10) {
                                return "Oct";
                            } else if(item.month == 11) {
                                return "Nov";
                            } else if(item.month == 12) {
                                return "Dec";
                            } else {
                                return "";
                            }
                        }),
                        // categories: [
                        //     "Jan",
                        //     "Feb",
                        //     "Mar",
                        //     "Apr",
                        //     "May",
                        //     "Jun",
                        //     "Jul",
                        //     "Aou",
                        //     "Sep",
                        //     "Oct",
                        //     "Nov",
                        //     "Dec"
                        // ],
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            }
                        }
                    },
                    colors: [
                        "#9A9BFE", "#DA0445", "#0D8F55"
                    ],
                    legend: {
                        offsetY: 0,
                        position: "top",
                        fontSize: "14px",
                        horizontalAlign: "left",
                        labels: {
                            colors: '#5B5B98'
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px",
                            },
                        },
                        axisBorder: {
                            show: false,
                        }
                    },
                    fill: {
                        opacity: 1
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    }
                }; 
            }
        )
       }
}
