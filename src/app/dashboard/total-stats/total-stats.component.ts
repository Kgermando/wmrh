import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';

@Component({
  selector: 'app-total-stats',
  templateUrl: './total-stats.component.html',
  styleUrls: ['./total-stats.component.scss']
})
export class TotalStatsComponent {
  constructor(
    public themeService: CustomizerSettingsService
  ) {}

}
