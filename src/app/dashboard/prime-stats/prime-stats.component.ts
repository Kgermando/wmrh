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
  selector: 'app-prime-stats',
  templateUrl: './prime-stats.component.html',
  styleUrls: ['./prime-stats.component.scss']
})
export class PrimeStatsComponent {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
      public themeService: CustomizerSettingsService
  ) {
      this.chartOptions = {
          series: [75],
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
          colors: ["#757FEF"],
          labels: ["Prîme vs Taxe"]
      };
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }
}
