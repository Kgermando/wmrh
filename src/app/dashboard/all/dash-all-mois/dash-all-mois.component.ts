import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart, 
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ChartComponent,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries
} from "ng-apexcharts"; 
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { DashAllService } from '../dash-all.service';
import { PerformencePieDayModel } from 'src/app/performences/models/performence-pie-model';
import { PresencePieModel } from 'src/app/presences/models/presence-pie-model';

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

export type ChartOptionsTatutPaie = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    labels: any;
    colors: any;
};

export type ChartOptionAllocations = {
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

export type ChartOptionPresence = {
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
  selector: 'app-dash-all-mois',
  templateUrl: './dash-all-mois.component.html',
  styleUrls: ['./dash-all-mois.component.scss']
})
export class DashAllMoisComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  public chartOptionsSTatutPaie: Partial<ChartOptionsTatutPaie>;

  public chartOptionAllocations: Partial<ChartOptionAllocations>;

  public chartOptionPresence: Partial<ChartOptionPresence>;

  isLoading = false;

  currentUser: PersonnelModel | any;

  prerformencePieList: PerformencePieDayModel[] = [];

  presencePieList: PresencePieModel[] = [];

  netAPayerList: []; 
  netAPayerPrecedementList: [];

  netAPayer = 0;
  netAPayerPrecedement = 0;

  statutPaieList = []; 

  allocationList = [];

  primesList: [];
  primes = 0;
  primeAncienneteList: [];
  primeAnciennete = 0;
  penaliteList: [];
  penalite = 0;
  avanceSalaireList: [];
  avanceSalaire = 0;
  presEntrepriseList: [];
  presEntreprise = 0;
  heureSuppList: [];
  heureSupp = 0;
  syndicatList: [];
  syndicat = 0;


  recrutementsList: [];
  recrutements = 0;
  postulantsList: [];
  postulants = 0;
  recrusList: [];
  recrus = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService
  ) {
      
  }

  ngOnInit(): void { 
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getPie();
        this.getNetAPayer();
        this.getStatutPaie();
        this.getAllocations();
        this.getTotal();
        this.getPiePresence();
        this.getRecrutement();
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });  
    this.isLoading = false;
  } 

  getPie() {
    this.dashAllService.getPerformencesMonth(this.currentUser.code_entreprise).subscribe(
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
                    categories: this.prerformencePieList.map((item: PerformencePieDayModel) => item.day), 
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

   getNetAPayer() {
        this.dashAllService.masseSalarialMonth(this.currentUser.code_entreprise).subscribe(
            res =>  {
                this.netAPayerList = res;
                this.netAPayerList.map((item: any) => this.netAPayer = parseFloat(item.net_a_payer));
            }
        );
        this.dashAllService.masseSalarialMonthPrecedement(this.currentUser.code_entreprise).subscribe(
            res =>  {
                this.netAPayerPrecedementList = res;
                this.netAPayerPrecedementList.map((item: any) => this.netAPayerPrecedement = parseFloat(item.net_a_payer));
            }
        )
    
   }

   getStatutPaie() {
    this.dashAllService.statutPaieMonth(this.currentUser.code_entreprise).subscribe(
        res => {
            this.statutPaieList = res;
            this.chartOptionsSTatutPaie = {
                series: this.statutPaieList.map((item: any) => parseFloat(item.count)),
                colors: this.statutPaieList.map((item: any) => {
                    if (item.statut == "Disponible") {
                        return "#0D8F55";
                    } else if(item.statut == "Traitement") {
                        return "#FAAA0C";
                    } else {
                        return '#FFFFFF'
                    }
                }), 
                chart: {
                    height: 365,
                    type: "donut"
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + "%";
                        },
                    },
                },
                stroke: {
                    width: 1,
                    show: true
                },
                legend: {
                    offsetY: 0,
                    fontSize: "14px",
                    position: "bottom",
                    horizontalAlign: "center"
                },
                labels: ["Disponible", "Traitement"]
            };
        }
    )
    
   }


   getAllocations() {
    this.dashAllService.allocationMonth(this.currentUser.code_entreprise).subscribe(
        res => {
            this.allocationList = res;
            this.chartOptionAllocations = {
                series: [
                    {
                        name: "Logements",
                        data: this.allocationList.map((item: any) => parseFloat(item.logement)),
                    },
                    {
                        name: "Transports",
                        data: this.allocationList.map((item: any) => parseFloat(item.transport)),
                    },
                    {
                        name: "Familliales",
                        data: this.allocationList.map((item: any) => parseFloat(item.familliale)),
                    },
                    {
                        name: "Soins médicaux",
                        data: this.allocationList.map((item: any) => parseFloat(item.soins_medicaux)),
                    }
                ],
                chart: {
                    type: "bar",
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        borderRadius: 3,
                        horizontal: false,
                        columnWidth: "33%",
                        borderRadiusApplication: 'end',
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: ["#757fef", "#2db6f5", "#ee368c", "#FAAA0C"], 
                stroke: {
                    width: 5,
                    show: true,
                    colors: ["transparent"]
                },
                xaxis: { 
                    categories: this.allocationList.map((item: any) => {
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
                            return "Jui";
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
                    labels: {
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "14px"
                        },
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
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
                    },
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: function(val) {
                            return val + "FC";
                        }
                    }
                },
                legend: {
                    offsetY: 0,
                    position: "top",
                    fontSize: "14px",
                    horizontalAlign: "left",
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

   getTotal() {
    this.dashAllService.primesMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.primesList = res;
            this.primesList.map((item: any) => this.primes = parseFloat(item.total));
        }
    );
    this.dashAllService.primeAncienneteMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.primeAncienneteList = res;
            this.primeAncienneteList.map((item: any) => this.primeAnciennete = parseFloat(item.total));
        }
    );
    this.dashAllService.penaliteMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.penaliteList = res;
            this.penaliteList.map((item: any) => this.penalite = parseFloat(item.total));
        }
    );
    this.dashAllService.avanceSalaireMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.avanceSalaireList = res;
            this.avanceSalaireList.map((item: any) => this.avanceSalaire = parseFloat(item.total));
        }
    );
    this.dashAllService.presEntrepriseMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.presEntrepriseList = res;
            this.presEntrepriseList.map((item: any) => this.presEntreprise = parseFloat(item.total));
        }
    );
    this.dashAllService.heureSuppMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.heureSuppList = res;
            this.heureSuppList.map((item: any) => this.heureSupp = parseFloat(item.total));
        }
    );
    this.dashAllService.syndicatMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.syndicatList = res;
            this.syndicatList.map((item: any) => this.syndicat = parseFloat(item.total));
        }
    );
   }


    getPiePresence() {
        this.dashAllService.presencePieMonth(this.currentUser.code_entreprise).subscribe(
            res => {
                this.presencePieList = res;
                this.chartOptionPresence = {
                    series: this.presencePieList.map((item: any) => parseFloat(item.count)),
                    chart: {
                        height: 315,
                        type: "pie"
                    },
                    stroke: {
                        width: 0,
                        show: true
                    },
                    colors: this.presencePieList.map((item: PresencePieModel) => {
                        if (item.apointement == 'P') {
                            return "#27ae60";
                        } else if(item.apointement == 'A') {
                            return "#FC0000";
                        } else if(item.apointement == 'AA') {
                            return "#FAAA0C";
                        } else if(item.apointement == 'AM') {
                            return "#ee368c";
                        } else if(item.apointement == 'CC') {
                            return "#8e44ad";
                        } else if(item.apointement == 'CA') {
                            return "#2db6f5";
                        } else if(item.apointement == 'CO') {
                            return "#1abc9c";
                        } else if(item.apointement == 'S') {
                            return "#2980b9";
                        } else if(item.apointement == 'O') {
                            return "#2c3e50";
                        } else if(item.apointement == 'M') {
                            return "#038fa8";
                        } else {
                            return "";
                        }
                    }),
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
                    labels: this.presencePieList.map((item: PresencePieModel) => item.apointement), 
                };
            }
        )
    }

    getRecrutement() {
        this.dashAllService.recrutementsTotalMonth(this.currentUser.code_entreprise).subscribe(
            res =>  {
                this.recrutementsList = res;
                this.recrutementsList.map((item: any) => this.recrutements = parseFloat(item.count));
            }
        );
        this.dashAllService.postulantsTotalMonth(this.currentUser.code_entreprise).subscribe(
            res =>  {
                this.postulantsList = res;
                this.postulantsList.map((item: any) => this.postulants = parseFloat(item.count));
            }
        );
        this.dashAllService.postulantsRetenuTotalMonth(this.currentUser.code_entreprise).subscribe(
            res =>  {
                this.recrusList = res;
                this.recrusList.map((item: any) => this.recrus = parseFloat(item.count));
            }
        );
    }

}
