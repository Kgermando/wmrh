import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { PreferenceModel } from 'src/app/preferences/reglages/models/reglage-model';
import { ReglageService } from 'src/app/preferences/reglages/reglage.service';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss']
})
export class InfoProfileComponent {
  @Input() currentUser: PersonnelModel;

  preference: PreferenceModel;

  constructor(
    public themeService: CustomizerSettingsService,
    private reglageService: ReglageService,
) {}

  imageSlides2: OwlOptions = {
    items: 1,
    nav: true,
    loop: true,
    margin: 25,
    dots: true,
    autoplay: false,
    smartSpeed: 1000,
    autoplayHoverPause: true,
      navText: [
    "<i class='flaticon-chevron-1'></i>",
    "<i class='flaticon-chevron'></i>",
    "<i class='flaticon-chevron'></i>",
    "<i class='flaticon-chevron'></i>"
    ]
  }

  toggleTheme() {
      this.themeService.toggleTheme();
  }
}
