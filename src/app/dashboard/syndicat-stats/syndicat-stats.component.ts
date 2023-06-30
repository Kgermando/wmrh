import { Component, ViewChild } from "@angular/core"; 
import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart
} from "ng-apexcharts";
import { CustomizerSettingsService } from "src/app/customizer-settings/customizer-settings.service";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    colors: any;
    plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-syndicat-stats',
  templateUrl: './syndicat-stats.component.html',
  styleUrls: ['./syndicat-stats.component.scss']
})
export class SyndicatStatsComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
      public themeService: CustomizerSettingsService
  ) {
      this.chartOptions = {
          series: [32],
          chart: {
              height: 230,
              type: "radialBar"
          },
          plotOptions: {
              radialBar: {
                  hollow: {
                      size: "50%"
                  },
                  dataLabels: {
                      name: {
                          show: false
                      },
                      value: {
                          offsetY: 5,
                          fontSize: "15px",
                          fontWeight: "700",
                      }
                  }
              }
          },
          colors: ["#F765A3"],
          labels: ["Under 30 & Over 30"]
      };
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }

}
