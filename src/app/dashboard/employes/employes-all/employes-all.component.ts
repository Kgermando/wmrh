import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexGrid,
    ApexYAxis,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexFill,
    ApexTooltip,
    ApexStroke,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexResponsive
} from "ng-apexcharts";
import { AuthService } from "src/app/auth/auth.service";
import { CustomizerSettingsService } from "src/app/customizer-settings/customizer-settings.service";
import { PerformencePieYearModel } from "src/app/performences/models/performence-pie-model";
import { DashAllService } from "../../all/dash-all.service";
import { PersonnelModel } from "src/app/personnels/models/personnel-model";
import { EmployeService } from "../employe.service";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    colors: any;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
};

export type ChartOptionAgeMoyenneEmploye = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    colors: any;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
};


export type ChartOptionPieSexe = {
  series: ApexNonAxisChartSeries;
  stroke: ApexStroke;
  chart: ApexChart;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  labels: any;
  legend: ApexLegend;
  colors: any;
};

export type ChartOptionDepartement = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
};

export type ChartOptionService = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: string[];
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
  };

  export type ChartOptionSiteTravail = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: string[];
    legend: ApexLegend;
    plotOptions: ApexPlotOptions;
  };


@Component({
  selector: 'app-employes-all',
  templateUrl: './employes-all.component.html',
  styleUrls: ['./employes-all.component.scss']
})
export class EmployesAllComponent implements OnChanges {
    @Input('start_date') start_date: any;
    @Input('end_date') end_date: any;

  @ViewChild("chart") chart: ChartComponent | any;

  public chartOptions: Partial<ChartOptions> | any;

  public chartOptionAgeMoyenneEmployes: Partial<ChartOptionAgeMoyenneEmploye> | any;

  public chartOptionPieSexe: Partial<ChartOptionPieSexe> | any;

  public chartOptionDepartement: Partial<ChartOptionDepartement> | any;
  public chartOptionService: Partial<ChartOptionService> | any;
  public chartOptionSiteTravail: Partial<ChartOptionSiteTravail> | any;

  isLoading = false;

  currentUser: PersonnelModel | any;


  ageParContratList: any[] = [];
  ageParEmployeList: any[] = [];
  sexeList: any = [];
  employeParDepartement: any[] = [];
  employeParService: any[] = []; 
  employeParSiteTravail: any[] = []; 

  depList: any[] = [];
  depTotal = 0;
  syndicatList: any[] = [];
  syndicatTotal = 0;
  siteLocationList: any[] = [];
  siteLocationTotal = 0;
  compteActifList: any[] = [];
  compteActifTotal = 0;


  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService,
    private employeService: EmployeService
  ) {
      
  } 

    ngOnChanges(changes: SimpleChanges): void {
        this.isLoading = true;
        this.authService.user().subscribe({
        next: (user) => {
            this.currentUser = user;
            this.getAgeParContrat();
            this.getAgeParEmploye();
            this.getPieSexe();
            this.getEmployeparDepartement();
            this.getEmployeparService();
            this.getEmployeparSiteTravail();
            this.getTotal();
            this.isLoading = false;
        },
        error: (error) => {
            this.isLoading = false;
            this.router.navigate(['/auth/login']);
            console.log(error);
        }
        });   
    }  

  getAgeParContrat() {
    this.employeService.ageContratEmployeAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.ageParContratList = res;
            this.chartOptions = {
                series: [
                    {
                      data: [
                        {
                          x: "Moins de 5 ans",
                          y: this.ageParContratList.map((item: any) => parseFloat(item['Moins de 5 ans'])),
                        },
                        {
                          x: "Moins de 10 ans",
                          y: this.ageParContratList.map((item: any) => parseFloat(item['Moins de 10 ans'])),
                        },
                        {
                          x: "Moins de 15 ans",
                          y: this.ageParContratList.map((item: any) => parseFloat(item['Moins de 15 ans'])),
                        },
                        {
                          x: "Moins de 20 ans",
                          y: this.ageParContratList.map((item: any) => parseFloat(item['Moins de 20 ans'])),
                        },
                        {
                          x: "Moins de 25 ans",
                          y: this.ageParContratList.map((item: any) => parseFloat(item['Moins de 25 ans'])),
                        },
                        {
                          x: "Plus de 25 ans",
                          y: this.ageParContratList.map((item: any) => parseFloat(item['Plus de 25 ans'])),
                        }
                      ]
                    }
                  ],
                chart: {
                    height: 360,
                    type: "bar",
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                bar: {
                    horizontal: true
                }
                },
                xaxis: {
                    type: "category"
                },  
            };
        }
    )
    
  }


  getAgeParEmploye() {
    this.employeService.ageEmployeAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.ageParEmployeList = res;
            this.chartOptionAgeMoyenneEmployes = {
                series: [
                    {
                      data: [
                        {
                          x: "De 18-25 ans",
                          y: this.ageParEmployeList.map((item: any) => parseFloat(item['De 18-25 ans'])),
                        },
                        {
                          x: "De 25-35 ans",
                          y: this.ageParEmployeList.map((item: any) => parseFloat(item['De 25-35 ans'])),
                        },
                        {
                          x: "De 35-45 ans",
                          y: this.ageParEmployeList.map((item: any) => parseFloat(item['De 35-45 ans'])),
                        },
                        {
                          x: "De 45-55 ans",
                          y: this.ageParEmployeList.map((item: any) => parseFloat(item['De 45-55 ans'])),
                        },
                        {
                          x: "De 55-65 ans",
                          y: this.ageParEmployeList.map((item: any) => parseFloat(item['De 55-65 ans'])),
                        }
                      ]
                    }
                  ],
                chart: {
                    height: 360,
                    type: "bar",
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                bar: {
                    horizontal: true
                }
                },
                xaxis: {
                    type: "category"
                },  
            };
        }
    )

  }


  getPieSexe() {
    this.employeService.getPieSexeAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.sexeList = res;
            this.chartOptionPieSexe = {
                series: this.sexeList.map((item: any) => parseFloat(item.count)),
                chart: {
                    height: 315,
                    type: "pie"
                },
                stroke: {
                    width: 0,
                    show: true
                },
                colors: this.sexeList.map((item: any) => {
                    if(item.sexe == "Homme") {
                        return "#757fef";
                    } else if(item.sexe == "Femme") {
                        return "#ee368c";
                    } else {
                        return "";
                    }
                }), // ["#757fef", "#ee368c"],
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '14px',
                    },
                    dropShadow: {
                        enabled: false
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '14px',
                    },
                    y: {
                        formatter: function(val: any) {
                            var personne = "employé";
                            if (val > 1) {
                                personne = "employés";
                            }
                            return val + " " + personne;
                        }
                    }
                },
                legend: {
                    offsetY: 5,
                    position: "bottom",
                    fontSize: "14px",
                    labels: {
                        colors: '#5B5B98',
                    },
                },
                labels: this.sexeList.map((item: any) => item.sexe)
            };
        }
        
    )
    
  }

  

  getEmployeparDepartement() {
    this.employeService.employeDepartementAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.employeParDepartement = res; 
            this.chartOptionDepartement = {
                series: this.employeParDepartement.map((item: any) => parseFloat(item.count)),
                chart: {
                    height: 300,
                    type: "radialBar"
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 10,
                            size: "30%",
                            image: undefined,
                            background: "transparent"
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                show: false
                            }
                        }
                    }
                },
                // colors: [
                //     "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD", "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD",
                // ],
                labels: this.employeParDepartement.map((item: any) => item.departement),
                legend: {
                    show: true,
                    offsetY: 0,
                    offsetX: -20,
                    floating: true,
                    position: "left",
                    fontSize: "14px",
                    labels: {
                        colors: '#5B5B98'
                    },
                    formatter: function(seriesName: any, opts: any) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                    }
                }
            }; 
        }
    )

  }

  getEmployeparService() {
    this.employeService.employeServiceAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.employeParService = res; 
            this.chartOptionService = {
                series: this.employeParService.map((item: any) => parseFloat(item.count)),
                chart: {
                    height: 300,
                    type: "radialBar"
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 10,
                            size: "30%",
                            image: undefined,
                            background: "transparent"
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                show: false
                            }
                        }
                    }
                },
                // colors: [
                //     "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD", "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD",
                // ],
                labels: this.employeParService.map((item: any) => item.service),
                legend: {
                    show: true,
                    offsetY: 0,
                    offsetX: -20,
                    floating: true,
                    position: "left",
                    fontSize: "14px",
                    labels: {
                        colors: '#5B5B98'
                    },
                    formatter: function(seriesName: any, opts: any) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                    }
                }
            }; 
        }
    )

  }

  getEmployeparSiteTravail() {
    this.employeService.employeSiteLocationAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.employeParSiteTravail = res; 
            this.chartOptionSiteTravail = {
                series: this.employeParSiteTravail.map((item: any) => parseFloat(item.count)),
                chart: {
                    height: 300,
                    type: "radialBar"
                },
                plotOptions: {
                    radialBar: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 270,
                        hollow: {
                            margin: 10,
                            size: "30%",
                            image: undefined,
                            background: "transparent"
                        },
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                show: false
                            }
                        }
                    }
                },
                // colors: [
                //     "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD", "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD",
                // ],
                labels: this.employeParSiteTravail.map((item: any) => item.site_location),
                legend: {
                    show: true,
                    offsetY: 0,
                    offsetX: -20,
                    floating: true,
                    position: "left",
                    fontSize: "14px",
                    labels: {
                        colors: '#5B5B98'
                    },
                    formatter: function(seriesName: any, opts: any) {
                        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
                    }
                }
            }; 
        }
    )

  }



  getTotal() {
    this.employeService.departementAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.depList = res;
            this.depList.map((item: any) => this.depTotal = parseFloat(item.count));
        }
    );
    this.employeService.syndicatAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.syndicatList = res;
            this.syndicatList.map((item: any) => this.syndicatTotal = parseFloat(item.count));
        }
    );
    this.employeService.siteLocationAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.siteLocationList = res;
            this.siteLocationList.map((item: any) => this.siteLocationTotal = parseFloat(item.count));
        }
    );
    this.employeService.compteActifAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.compteActifList = res;
            this.compteActifList.map((item: any) => this.compteActifTotal = parseFloat(item.count));
        }
    ); 
   }

} 
