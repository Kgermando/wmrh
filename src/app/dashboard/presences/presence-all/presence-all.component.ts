import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApexChart, 
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexTooltip,
  ApexStroke,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexGrid,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexFill
} from "ng-apexcharts";

import { AuthService } from 'src/app/auth/auth.service';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PresencePieModel } from 'src/app/presences/models/presence-pie-model';
import { DashAllService } from '../../all/dash-all.service'; 
import { PresenceDashService } from '../presence.service';
 

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

export type ChartOptionCourbePresence = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    grid: ApexGrid;
    colors: any;
    tooltip: ApexTooltip;
    legend: ApexLegend;
    dataLabels: ApexDataLabels;
};

export type ChartOptionMultiLine = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    markers: any; //ApexMarkers;
    stroke: any; //ApexStroke;
    yaxis: ApexYAxis | ApexYAxis[];
    colors: any;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    title: ApexTitleSubtitle;
    legend: ApexLegend;
    fill: ApexFill;
    tooltip: ApexTooltip;
};
 

@Component({
  selector: 'app-presence-all',
  templateUrl: './presence-all.component.html',
  styleUrls: ['./presence-all.component.scss']
})
export class PresenceAllComponent implements OnInit {


  public chartOptionPresence: Partial<ChartOptionPresence>;

  public chartOptionCourbePresence: Partial<ChartOptionCourbePresence>;

  public chartOptionMultiLine: Partial<ChartOptionMultiLine>;
 

  isLoading = false;

  currentUser: PersonnelModel | any;

  presencePieList: PresencePieModel[] = [];

  courbePresenceList = [];

  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService,
    private presenceDashService: PresenceDashService
  ) {
      
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getPiePresence();
        this.getCourbepresence();
        this.getMultiPresence();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });  
  
  } 


  getPiePresence() {
    this.dashAllService.presencePieAll(this.currentUser.code_entreprise).subscribe(
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


    getCourbepresence() {
        this.presenceDashService.getCourbePresenceAll(this.currentUser.code_entreprise).subscribe(
            res => {
                this.courbePresenceList = res;
                this.chartOptionCourbePresence = {
                    series: [
                        {
                            name: "Presence",
                            data: this.courbePresenceList.map((item: any) => parseFloat(item.p)), 
                        }, 
                        {
                            name: "Absence Autorisée",
                            data: this.courbePresenceList.map((item: any) => parseFloat(item.a)), 
                        },
                        {
                            name: "Absence Non Autorisée",
                            data: this.courbePresenceList.map((item: any) => parseFloat(item.aa)), 
                        }
                    ],
                    chart: {
                        height: 420,
                        type: "area",
                        toolbar: {
                            show: false,
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: "smooth"
                    },
                    colors: [
                        "#E7EBF5", "#8EB0DE", "#90C6E0"
                    ],
                    xaxis: {
                        axisBorder: {
                            show: false
                        },
                        categories: this.courbePresenceList.map((item: any) => item.year),
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            }
                        },
                        axisTicks: {
                            show: false
                        }
                    },
                    yaxis: {
                        tickAmount: 6,
                        labels: {
                            style: {
                                colors: "#a9a9c8",
                                fontSize: "14px"
                            }
                        }
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    },
                    tooltip: {
                        x: {
                            format: "dd/MM/yy HH:mm"
                        }
                    },
                    legend: {
                        offsetY: 0,
                        position: 'top',
                        fontSize: "14px",
                        horizontalAlign: "center",
                        labels: {
                            colors: '#5B5B98'
                        }
                    }
                };
            }
        )
        
    }

    
    getMultiPresence() {
        this.presenceDashService.getCourbePresenceAll(this.currentUser.code_entreprise).subscribe(
            res => {
                this.courbePresenceList = res;
                this.chartOptionMultiLine = {
                    series: [
                        {
                            name: "Presence",
                            type: "column",
                            data: this.courbePresenceList.map((item: any) => parseFloat(item.p)), 
                        }, 
                        {
                            name: "Absence Autorisée",
                            type: "column",
                            data: this.courbePresenceList.map((item: any) => parseFloat(item.a)), 
                        },
                        {
                            name: "Absence Non Autorisée",
                            type: "line",
                            data: this.courbePresenceList.map((item: any) => parseFloat(item.aa)), 
                        } 
                    ],
                    chart: {
                        height: 350,
                        type: "line",
                        stacked: false
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: [1, 1, 4]
                    },
                    colors: ['#27ae60', '#FC0000', '#FAAA0C'],
                    xaxis: {
                        categories: this.courbePresenceList.map((item: any) => item.year),
                        labels: {
                            style: {
                                colors: "#27ae60",
                                fontSize: "14px"
                            }
                        }
                    },
                    yaxis: [
                        {
                            axisTicks: {
                                show: true
                            },
                            axisBorder: {
                                show: true,
                                color: "#008FFB"
                            },
                            labels: {
                                style: {
                                    colors: "#a9a9c8",
                                    fontSize: "14px"
                                }
                            },
                            title: {
                                text: "Presence",
                                style: {
                                    color: "#27ae60"
                                }
                            },
                            tooltip: {
                                enabled: true
                            }
                        },
                        {
                            seriesName: "Absence Autorisée",
                            opposite: true,
                            axisTicks: {
                                show: true
                            },
                            axisBorder: {
                                show: true,
                                color: "#FAAA0C"
                            },
                            labels: {
                                style: {
                                    colors: "#FAAA0C",
                                    fontSize: "14px"
                                }
                            },
                            title: {
                                text: "Absence Autorisée",
                                style: {
                                    color: "#FAAA0C"
                                }
                            }
                        },
                        {
                            seriesName: "Absence Non Autorisée",
                            opposite: true,
                            axisTicks: {
                                show: true
                            },
                            axisBorder: {
                                show: true,
                                color: "#FC0000"
                            },
                            labels: {
                                style: {
                                    colors: "#FC0000"
                                }
                            },
                            title: {
                                text: "Absence Non Autorisée",
                                style: {
                                    color: "#FC0000"
                                }
                            }
                        }
                    ], 
                    tooltip: {
                        fixed: {
                            enabled: true,
                            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60
                        }
                    },
                    grid: {
                        show: true,
                        strokeDashArray: 5,
                        borderColor: "#EDEFF5"
                    },
                    legend: {
                        horizontalAlign: "left",
                        offsetX: 40,
                        fontSize: "14px",
                        labels: {
                            colors: '#5B5B98'
                        }
                    }
                };
            }
        )
        
    }
}
