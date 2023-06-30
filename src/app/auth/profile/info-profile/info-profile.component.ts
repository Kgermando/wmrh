import { Component, Input } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss']
})
export class InfoProfileComponent {
  @Input() currentUser: PersonnelModel;

  constructor(
    public themeService: CustomizerSettingsService
) {}

  toggleTheme() {
      this.themeService.toggleTheme();
  }
}
