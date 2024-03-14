import { Component, OnInit } from '@angular/core'; 
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute } from '@angular/router';
import { PostesService } from '../../postes.service'; 
import { PersonnelModel } from 'src/app/personnels/models/personnel-model'; 
import { PosteModel } from '../../postes/models/poste-model';
import * as CryptoJS from 'crypto-js';
import { secretKey } from 'src/app/shared/tools/secret_key';

@Component({
  selector: 'app-offre-view',
  templateUrl: './offre-view.component.html',
  styleUrls: ['./offre-view.component.scss']
})
export class OffreViewComponent implements OnInit {
  isLoading = false;
  currentUser: PersonnelModel | any;


  offre: PosteModel | any;

  encryptedId: string | any;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute, 
    private postesService: PostesService, ) {}


    ngOnInit(): void {
      this.isLoading = true;
      let id = this.route.snapshot.paramMap.get('id'); 
      const decryptedId = CryptoJS.AES.decrypt(Number(id).toString(), secretKey).toString(CryptoJS.enc.Utf8);
      this.postesService.get(Number(decryptedId)).subscribe(res => {
        this.offre = res; 
        const encrypted = CryptoJS.AES.encrypt(Number(this.offre.id).toString(), secretKey).toString();
        this.encryptedId = encrypted; 
        this.isLoading = false;
      });
    }

  
    toggleTheme() {
      this.themeService.toggleTheme();
    }
  
}