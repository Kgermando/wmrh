import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexLegend,
} from "ng-apexcharts"; 
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PerformencePieModel } from 'src/app/performences/models/performence-pie-model';
import { PerformenceService } from 'src/app/performences/performence.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';

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
  selector: 'app-performence-pie-month',
  templateUrl: './performence-pie-month.component.html',
  styleUrls: ['./performence-pie-month.component.scss']
})
export class PerformencePieMonthComponent implements OnInit {
  @Input('personne') personne: PersonnelModel; 

  isSelect = 'Mois';  
    
  @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    prerformencePieList: PerformencePieModel[] = [];
  
    constructor(
        public themeService: CustomizerSettingsService,
        private performenceService: PerformenceService
    ) {  } 

    
    ngOnInit(): void {
        this.getPie();
    }


   getPie() {
    this.performenceService.getPie(this.personne.code_entreprise, this.personne.id).subscribe(
        res => {
            this.prerformencePieList = res;
            this.chartOptions = {
                // series: this.performenceService.map((item: any) => parseFloat(item.count)),
                series: [45, 20, 20],
                chart: {
                    height: 250,
                    type: "pie"
                },
                stroke: {
                    width: 0,
                    show: true
                },
                colors: [
                    "#757FEF", "#90C6E0", "#E040FB" 
                ],
                // colors: this.performenceService.map((item: PerformencePieModel) => {
                //     if (item.ponctualite == 'P') {
                //         return "#27ae60";
                //     } else if(item.apointement == 'A') {
                //         return "#FC0000";
                //     } else if(item.apointement == 'AA') {
                //         return "#FAAA0C";
                //     } else if(item.apointement == 'AM') {
                //         return "#ee368c";
                //     } else if(item.apointement == 'CC') {
                //         return "#8e44ad";
                //     } else if(item.apointement == 'CA') {
                //         return "#2db6f5";
                //     } else if(item.apointement == 'CO') {
                //         return "#1abc9c";
                //     } else if(item.apointement == 'S') {
                //         return "#2980b9";
                //     } else if(item.apointement == 'O') {
                //         return "#2c3e50";
                //     } else if(item.apointement == 'M') {
                //         return "#038fa8";
                //     } else {
                //         return "";
                //     }
                // }),
                dataLabels: {
                    enabled: false,
                    style: {
                        fontSize: '14px'
                    },
                    dropShadow: {
                        enabled: false
                    }
                },
                tooltip: {
                    style: {
                        fontSize: '14px'
                    },
                    y: {
                        formatter: function(val:any) {
                            return val + "%";
                        }
                    }
                },
                legend: {
                    offsetY: 0,
                    show: false,
                    position: "bottom",
                    fontSize: "14px",
                    labels: {
                        colors: '#5B5B98',
                    },
                },
                labels: ["Ponctualité", "Hospitalité", "Travail"]
            };
        }
    )
   }

}
