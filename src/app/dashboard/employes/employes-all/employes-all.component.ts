import { Component, OnInit, ViewChild } from "@angular/core";
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
  xaxis: ApexXAxis;
  grid: ApexGrid;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: any;
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



export type ChartOptionPerformence = {
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

export type ChartOptionDepartement = {
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
export class EmployesAllComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  public chartOptionAgeMoyenneEmployes: Partial<ChartOptionAgeMoyenneEmploye>;

  public chartOptionPerformence: Partial<ChartOptionPerformence>;

  public chartOptionPieSexe: Partial<ChartOptionPieSexe>;

  public chartOptionDepartement: Partial<ChartOptionDepartement>;

  prerformencePieList: PerformencePieYearModel[] = [];

  currentUser: PersonnelModel | any;


  ageParContratList = [];
  ageParEmployeList = [];
  sexeList = [];
  employeParDepartement = []; 

  depList: [];
  depTotal = 0;
  syndicatList: [];
  syndicatTotal = 0;
  siteLocationList: [];
  siteLocationTotal = 0;
  compteActifList: [];
  compteActifTotal = 0;


  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService,
    private employeService: EmployeService
  ) {
      
  }


  ngOnInit(): void { 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getAgeParContrat();
        this.getAgeParEmploye();
        this.getPieSexe();
        this.getPerformence();
        this.getEmployeparDepartement();
        this.getTotal();
      },
      error: (error) => {
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
                        name: "Durée de contrats",
                        data: this.ageParContratList.map((item: any) => parseFloat(item.age)),
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
                        borderRadius: 9,
                        columnWidth: "60%",
                        borderRadiusWhenStacked: 'last',
                        borderRadiusApplication: 'around',
                        dataLabels: {
                            position: "top"
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                        return val + " ans";
                    },
                    offsetY: -28,
                    style: {
                        colors: ["#5B5B98"]
                    }
                },
                colors: [
                    "#757fef"
                ],
                fill: {
                    opacity: 1
                },
                xaxis: {
                    categories: this.ageParContratList.map((item: any) => parseFloat(item.age)),
                    position: "top",
                    labels: {
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "14px"
                        }
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        show: false,
                        formatter: function(val) {
                            return val + " ans";
                        }
                    }
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


  getAgeParEmploye() {
    this.employeService.ageEmployeAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.ageParEmployeList = res;
            this.chartOptionAgeMoyenneEmployes = {
                series: [
                    {
                        name: "Age moyenne par employés:",
                        data: this.ageParEmployeList.map((item: any) => parseFloat(item.age)),
                    }
                ],
                chart: {
                    type: "bar",
                    height: 480,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true
                    }
                }, 
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                        return val + " ans";
                    },
                    offsetY: -30,
                    style: {
                        colors: ["#5B5B98"]
                    }
                },
                colors: [
                    "#757FEF"
                ],
                stroke: {
                    width: 0,
                    show: true,
                    colors: ["transparent"]
                },
                xaxis: {
                    categories: this.ageParEmployeList.map((item: any) => parseFloat(item.age)),
                    labels: {
                        show: true,
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "14px"
                        },
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "14px"
                        }
                    },
                    axisBorder: {
                        show: false
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function(val) {
                            return val + " ans";
                        }
                    }
                },
                legend: {
                    offsetY: 5,
                    fontSize: "14px",
                    position: "bottom",
                    horizontalAlign: "center",
                    labels: {
                        colors: '#5B5B98'
                    }
                },
                grid: {
                    show: true,
                    borderColor: "#EDEFF5",
                    strokeDashArray: 5
                }
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
                        formatter: function(val:any) {
                            return val + "%";
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


  getPerformence() {
    this.dashAllService.getPerformencesAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.prerformencePieList = res;
            this.chartOptionPerformence = {
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
                    categories: this.prerformencePieList.map((item: PerformencePieYearModel) => item.year), 
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
                colors: [
                    "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD", "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD",
                ],
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
                    formatter: function(seriesName, opts) {
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
