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

  isSelect = 'Mois';
  
    onSelectChange(event: any) {
      console.log(event.value);
      if (event.value === 'Mois') {
        this.isSelect = 'Mois';
      } else if(event.value === 'Année') {
        this.isSelect = 'Année';
      } else if(event.value === 'All') {
        this.isSelect = 'All';
      }
    }

}
