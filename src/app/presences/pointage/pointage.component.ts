import { Component } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';


@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.scss']
})
export class PointageComponent {


  constructor(
    public themeService: CustomizerSettingsService
) {}

  toggleTheme() {
      this.themeService.toggleTheme();
  }

}
