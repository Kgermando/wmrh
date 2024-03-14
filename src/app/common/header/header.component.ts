import { Component, HostListener } from '@angular/core';
import { ToggleService } from './toggle.service';
import { DatePipe } from '@angular/common';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { AuthService } from 'src/app/auth/auth.service'; 
import { Auth } from 'src/app/classes/auth';
import { NotifyService } from 'src/app/notify/notify.service'; 
import { FormGroup } from '@angular/forms';
import { SalaireService } from 'src/app/salaires/salaire.service';
import { SalaireModel } from 'src/app/salaires/models/salaire-model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    isSticky: boolean = false;
    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= 50) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    isToggled = false;

    loading = false;
    currentUser: PersonnelModel | any;

    isNotify = false;
    // notifyList: NotifyModel[] = [];
    notifyList: SalaireModel[] = [];

    formGroup!: FormGroup;
    isLoading = false;

    mois = '';
    
    constructor(
        private toggleService: ToggleService,
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService,
        private authService: AuthService,
        private notifyService: NotifyService,
        private salaireService: SalaireService,
    ) {
        this.toggleService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.loading = true; 
        Auth.userEmitter.subscribe(
            user => {
              this.currentUser = user; 
              console.log(this.currentUser);
 
            this.salaireService.isNotify(this.currentUser.id).subscribe((res) => {
                this.notifyList = res; 
                if (this.notifyList.length > 0) {
                    this.isNotify = true;
                } 
                this.loading = false;
            });

            //   this.notifyService.getAllNotify(this.currentUser.code_entreprise, this.currentUser.matricule).subscribe(
            //     res => {
            //         var dataList: NotifyModel[] = res;
            //         this.notifyList = dataList.filter(n => n.is_read === false);
            //         if (this.notifyList.length > 0) {
            //             this.isNotify = true;
            //         } else {
            //             this.isNotify = false;
            //         }
            //     }
            //   )
            }
          );
        this.loading = false;
    }

    getMonth(created: Date) {
        var date = new Date(created).getMonth();
        var year = new Date(created).getFullYear();
        if (date === 1) {
          return this.mois = `Janvier/${year}`;
        } else if(date === 2) {
            return this.mois = `Fevrier/${year}`;
        } else if(date === 3) {
            return this.mois = `Mars/${year}`;
        } else if(date === 4) {
            return this.mois = `Avril/${year}`;
        } else if(date === 5) {
            return this.mois = `Mai/${year}`;
        } else if(date === 6) {
            return this.mois = `Juin/${year}`;
        } else if(date === 7) {
            return this.mois = `Juillet/${year}`;
        } else if(date === 8) {
            return this.mois = `Aôut/${year}`;
        } else if(date === 9) {
            return this.mois = `Septembre/${year}`;
        } else if(date === 10) {
            return this.mois = `Octobre/${year}`;
        } else if(date === 11) {
            return this.mois = `Novembre/${year}`;
        } else if(date === 12) {
            return this.mois = `Décembre/${year}`;
        } else {
            return '';
        }
    }


    // isRead(id: number) {
    //     try {
    //         this.isLoading = true;
    //         var body = {
    //             is_read: true,
    //             signature: this.currentUser.matricule, 
    //             update_created: new Date(),
    //         }
    //         console.log('isread', id);
    //         this.notifyService.update(id, body).subscribe({
    //             next: (res) => {
    //                 this.isLoading = false;
    //             },
    //             error: err => {
    //                 console.log('Notify', err); 
    //                 this.isLoading = false;
    //             }
    //         });
    //     } catch (error) {
    //         this.isLoading = false;
    //         console.log(error);
    //     }
    // }
  
    logOut() {
        this.authService.logout().subscribe(res => {
           console.log(res);
           localStorage.removeItem('jwt');
           localStorage.removeItem('roles');
        //    localStorage.clear();
        });
    }




    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggle() {
        this.toggleService.toggle();
    }

    toggleSidebarTheme() {
        this.themeService.toggleSidebarTheme();
    }

    toggleHideSidebarTheme() {
        this.themeService.toggleHideSidebarTheme();
    }

    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    toggleHeaderTheme() {
        this.themeService.toggleHeaderTheme();
    }

    toggleCardBorderRadiusTheme() {
        this.themeService.toggleCardBorderRadiusTheme();
    }

    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    currentDate: Date = new Date();
    formattedDate: any = this.datePipe.transform(this.currentDate, 'dd MMMM yyyy', 'fr-FR');

}