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
import { PerformencePieModel, PerformencePieYearModel } from "src/app/performences/models/performence-pie-model";
import { DashAllService } from "../../all/dash-all.service";
import { PersonnelModel } from "src/app/personnels/models/personnel-model";

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
  selector: 'app-employes-year',
  templateUrl: './employes-year.component.html',
  styleUrls: ['./employes-year.component.scss']
})
export class EmployesYearComponent  implements OnInit{
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  public chartOptionAgeMoyenneEmployes: Partial<ChartOptionAgeMoyenneEmploye>;

  public chartOptionPerformence: Partial<ChartOptionPerformence>;

  public chartOptionPieSexe: Partial<ChartOptionPieSexe>;

  public chartOptionDepartement: Partial<ChartOptionDepartement>;

  prerformencePieList: PerformencePieModel[] = [];

  currentUser: PersonnelModel | any;

  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService
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
        this.getDepartementNbre();
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });   
  }  

  getAgeParContrat() {
    this.chartOptions = {
      series: [
          {
              name: "Revenue Summary",
              data: [2.3, 3, 4.0, 10.5, 5.6, 5, 4, 2.8, 2, 1.3, 0.8, 0.3]
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
              return val + "%";
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
          categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
          ],
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
                  return val + "%";
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


  getAgeParEmploye() {
    this.chartOptionAgeMoyenneEmployes = {
      series: [
          {
              name: "Total Sessions:",
              data: [1026, 1554, 497, 1126, 908, 1512, 604, 1047, 1354, 826],
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
          enabled: false
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
          categories: [
              "United State",
              "China",
              "Canada",
              "Indonesia",
              "Russia",
              "Japan",
              "Brazil",
              "United Kingdom",
              "Vietnam",
              "France"
          ],
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
                  return val + " hours";
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


  getPieSexe() {
    this.chartOptionPieSexe = {
      series: [59, 25],
      chart: {
          height: 315,
          type: "pie"
      },
      stroke: {
          width: 0,
          show: true
      },
      colors: ["#757fef", "#ee368c"],
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
      labels: ["Courses Done", "On Progress", "To Do"]
  };
  }


  getPerformence() {
    this.dashAllService.getPerformencesYear(this.currentUser.code_entreprise).subscribe(
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
                    categories: this.prerformencePieList.map((item: PerformencePieModel) => item.month), 
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
  

  getDepartementNbre() {
    this.chartOptionDepartement = {
      series: [100, 90, 80, 70],
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
          "#757FEF", "#9EA5F4", "#C8CCF9", "#F1F2FD"
      ],
      labels: [
          "Completed", "Active", "Assigned", "Pending"
      ],
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

} 
