import { Component, ViewChild } from "@angular/core";
import { ChartComponent } from "ng-apexcharts"; 
import {
    ApexNonAxisChartSeries,
    ApexTooltip,
    ApexLegend,
    ApexStroke,
    ApexDataLabels,
    ApexPlotOptions,
    ApexChart
} from "ng-apexcharts";
import { CustomizerSettingsService } from "src/app/customizer-settings/customizer-settings.service";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    labels: any;
    plotOptions: ApexPlotOptions;
    colors: any;
    dataLabels: ApexDataLabels;
};


@Component({
  selector: 'app-progression-paie',
  templateUrl: './progression-paie.component.html',
  styleUrls: ['./progression-paie.component.scss']
})
export class ProgressionPaieComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
      public themeService: CustomizerSettingsService
  ) {
      this.chartOptions = {
          series: [45, 65, 40],
          colors: [
              "#2DB6F5", "#757FEF", "#F7F7F7"
          ],
          chart: {
              height: 284,
              type: "donut"
          },
          tooltip: {
              y: {
                  formatter: function (val) {
                      return val + "%";
                  },
              },
          },
          plotOptions: {
              pie: {
                  donut: {
                      size: '85%'
                  }
              }
          },
          stroke: {
              width: 0,
              show: true
          },
          dataLabels: {
              enabled: false
          },
          legend: {
              offsetY: 5,
              show: true,
              fontSize: "14px",
              position: "bottom",
              horizontalAlign: "center",
              labels: {
                  colors: '#5B5B98'
              }
          },
          labels: [
              "Déjà paiyé", "En cours", "En attente"
          ]
      };
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }
}
