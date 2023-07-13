import { Component, Input, OnInit } from '@angular/core';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ApointementModel } from 'src/app/presences/models/presence-model';
import { PresenceService } from 'src/app/presences/presence.service';

@Component({
  selector: 'app-presence-pointage',
  templateUrl: './presence-pointage.component.html',
  styleUrls: ['./presence-pointage.component.scss']
})
export class PresencePointageComponent implements OnInit{
  @Input('item') item: PersonnelModel;

  presenceList: ApointementModel[] = [];
  presenceFilterDate: ApointementModel[] = [];
  presence: ApointementModel;

    constructor(
      public themeService: CustomizerSettingsService,
      private presenceService: PresenceService
  ) {}

  ngOnInit(): void {
    this.presenceService.getLastItem(this.item.code_entreprise, this.item.matricule).subscribe(
      res => {
        this.presenceList = res;
        // this.presenceFilterDate = this.presenceList.filter((v: ApointementModel) => {
        //   const dy = new Date();
        //   const day = dy.getDate();
        //   const dayMonth = dy.getMonth();
        //   const dayYear = dy.getFullYear();

        //   const datey = new Date(v.date_entree.getDate());
        //   const date = datey.getDate();
        //   const dateMonth = v.date_entree.getMonth();
        //   const dateYear = v.date_entree.getFullYear();

        //   return v.apointement === 'P' && date === day && dateMonth === dayMonth && dateYear === dayYear;
        // });
        this.presence = this.presenceList[0];
      }
    );
  }


}
