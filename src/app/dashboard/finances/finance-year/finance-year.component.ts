import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart, 
  ApexDataLabels,
  ApexGrid,
  ApexPlotOptions, 
  ApexXAxis,
  ApexYAxis,
  ApexLegend,
  ApexFill, 
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle
} from "ng-apexcharts"; 
import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { DashAllService } from '../../all/dash-all.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { FinanceService } from '../finance.service';

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

export type ChartOptionsTatutPaie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  labels: any;
  colors: any;
};

export type ChartOptionNetApayerIPRCNSS = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: any;
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
    colors: any;
};


@Component({
  selector: 'app-finance-year',
  templateUrl: './finance-year.component.html',
  styleUrls: ['./finance-year.component.scss']
})
export class FinanceYearComponent  implements OnInit{


  currentUser: PersonnelModel | any;

  public chartOptionAllocations: Partial<ChartOptionAllocations>;

  public chartOptionsSTatutPaie: Partial<ChartOptionsTatutPaie>;

  public chartOptionNetApayerIPRCNSS: Partial<ChartOptionNetApayerIPRCNSS>;



  allocationList = [];

  statutPaieList = [];

  depensePayEList = [];


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


  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService,
    private financeService: FinanceService
  ) {
      
  }

  ngOnInit(): void { 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getAllocations(); 
        this.getStatutPaie();
        this.getNetAPayerCCNSSQPO();
        this.getTotal();
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });   
  }


  getAllocations() {
    this.dashAllService.allocationYear(this.currentUser.code_entreprise).subscribe(
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

   getStatutPaie() {
    this.dashAllService.statutPaieAll(this.currentUser.code_entreprise).subscribe(
        res => {
            this.statutPaieList = res;
            this.chartOptionsSTatutPaie = {
                series: this.statutPaieList.map((item: any) => parseFloat(item.count)),
                colors: this.statutPaieList.map((item: any) => {
                    if (item.statut == "Disponible") {
                        return "#FAAA0C";
                    } else if(item.statut == "Traitement") {
                        return "#0D8F55";
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

   getNetAPayerCCNSSQPO() {
    this.financeService.depensePayEALl(this.currentUser.code_entreprise).subscribe(
        res => {
            this.depensePayEList = res;
            this.chartOptionNetApayerIPRCNSS = {
                series: [
                    {
                        name: "Net à payer",
                        data: this.depensePayEList.map((item: any) => parseFloat(item.net_a_payer)),
                    },
                    {
                        name: "IPR",
                        data: this.depensePayEList.map((item: any) => parseFloat(item.ipr)),
                    },
                    {
                        name: "CNSS QPO",
                        data: this.depensePayEList.map((item: any) => parseFloat(item.cnss_qpo)),
                    }
                ],
                chart: {
                    height: 287,
                    type: "line",
                    toolbar: {
                        show: false,
                    }
                },
                colors: [
                    "#2DB6F5", "#F765A3", "#757FEF"
                ],
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 3,
                    curve: "straight",
                },
                legend: {
                    offsetY: 3,
                    position: "top",
                    fontSize: "14px",
                    horizontalAlign: "center",
                    labels: {
                        colors: '#5B5B98',
                    }
                },
                yaxis: {
                    tickAmount: 4,
                    labels: {
                      show: false,
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "14px",
                        }
                    },
                    axisBorder: {
                        show: false,
                    }
                },
                xaxis: {
                    axisBorder: {
                        show: false,
                    },
                    labels: {
                        trim: false,
                        style: {
                            colors: "#a9a9c8",
                            fontSize: "14px",
                        }
                    },
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
    this.dashAllService.primesYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.primesList = res;
            this.primesList.map((item: any) => this.primes = parseFloat(item.total));
        }
    );
    this.dashAllService.primeAncienneteYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.primeAncienneteList = res;
            this.primeAncienneteList.map((item: any) => this.primeAnciennete = parseFloat(item.total));
        }
    );
    this.dashAllService.penaliteYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.penaliteList = res;
            this.penaliteList.map((item: any) => this.penalite = parseFloat(item.total));
        }
    );
    this.dashAllService.avanceSalaireYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.avanceSalaireList = res;
            this.avanceSalaireList.map((item: any) => this.avanceSalaire = parseFloat(item.total));
        }
    );
    this.dashAllService.presEntrepriseYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.presEntrepriseList = res;
            this.presEntrepriseList.map((item: any) => this.presEntreprise = parseFloat(item.total));
        }
    );
    this.dashAllService.heureSuppYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.heureSuppList = res;
            this.heureSuppList.map((item: any) => this.heureSupp = parseFloat(item.total));
        }
    );
    this.dashAllService.syndicatYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.syndicatList = res;
            this.syndicatList.map((item: any) => this.syndicat = parseFloat(item.total));
        }
    );
   }


}
