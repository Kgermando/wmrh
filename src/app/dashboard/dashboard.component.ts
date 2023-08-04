import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DashAllService } from './all/dash-all.service';
import { PersonnelModel } from '../personnels/models/personnel-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  categoryList = [
    'Employés', 
    'Finances', 
    'Presences', 
    'Autres', 
    'All'
  ];

  dureeList = ['Mois', 'Année', 'All'];


  isSelectCategory = 'All';
  isSelect = 'All';


  currentUser: PersonnelModel | any;


  totalEmployeAllList = [];
  totalEmployeYearList = [];
  totalEmployeMonthList = [];
  totalEmployeAll = 0;
  totalEmployeYear = 0;
  totalEmployeMonth = 0;

  totalEmployeFemmeAllList = [];
  totalEmployeFemmeYearList = [];
  totalEmployeFemmeMonthList = [];
  totalEmployeFemmeAll = 0;
  totalEmployeFemmeYear = 0;
  totalEmployeFemmeMonth = 0;

  totalEmployeHommeAllList = [];
  totalEmployeHommeYearList = [];
  totalEmployeHommeMonthList = [];
  totalEmployeHommeAll = 0;
  totalEmployeHommeYear = 0;
  totalEmployeHommeMonth = 0;

  netAPayerAllList: [];
  netAPayerYearList: [];
  netAPayerMonthList: [];
  netAPayerAll = 0;
  netAPayerYear = 0;
  netAPayerMonth = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService,
  ) {
      
  }

  ngOnInit(): void { 
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.getTotal(); 
        this.getTotalFinance();
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });   
  } 

  
    onSelectCategoryChange(event: any) { 
      if (event.value === 'Employés') {
        this.isSelectCategory = 'Employés';
      } else if(event.value === 'Finances') {
        this.isSelectCategory = 'Finances';
      } else if(event.value === 'Presences') {
        this.isSelectCategory = 'Presences';
      } else if(event.value === 'Autres') {
        this.isSelectCategory = 'Autres';
      } else if(event.value === 'All') {
        this.isSelectCategory = 'All';
      }
    }


    onSelectChange(event: any) { 
      if (event.value === 'Mois') {
        this.isSelect = 'Mois';
      } else if(event.value === 'Année') {
        this.isSelect = 'Année';
      } else if(event.value === 'All') {
        this.isSelect = 'All';
      }
    }

    getTotal() {
      this.dashAllService.totalEnmployesAll(this.currentUser.code_entreprise).subscribe(
          res =>  {
              this.totalEmployeAllList = res;
              this.totalEmployeAllList.map((item: any) => this.totalEmployeAll = parseFloat(item.total));
          }
      );
      this.dashAllService.totalEnmployesYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.totalEmployeYearList = res;
            this.totalEmployeYearList.map((item: any) => this.totalEmployeYear = parseFloat(item.total));
        }
    );
    this.dashAllService.totalEnmployesMonth(this.currentUser.code_entreprise).subscribe(
      res =>  {
          this.totalEmployeMonthList = res;
          this.totalEmployeMonthList.map((item: any) => this.totalEmployeMonth = parseFloat(item.total));
      }
    );

    this.dashAllService.totalEnmployeFemmeAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.totalEmployeFemmeAllList = res;
            this.totalEmployeFemmeAllList.map((item: any) => this.totalEmployeFemmeAll = parseFloat(item.total));
        }
    );
    this.dashAllService.totalEnmployeFemmeYear(this.currentUser.code_entreprise).subscribe(
      res =>  {
          this.totalEmployeFemmeYearList = res;
          this.totalEmployeFemmeYearList.map((item: any) => this.totalEmployeFemmeYear = parseFloat(item.total));
      }
  );
    this.dashAllService.totalEnmployeFemmeMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.totalEmployeFemmeMonthList = res;
            this.totalEmployeFemmeMonthList.map((item: any) => this.totalEmployeFemmeMonth = parseFloat(item.total));
        }
    );

    this.dashAllService.totalEnmployeHommeAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.totalEmployeHommeAllList = res;
              this.totalEmployeHommeAllList.map((item: any) => this.totalEmployeHommeAll = parseFloat(item.total));
          }
      );
      this.dashAllService.totalEnmployeHommeYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.totalEmployeHommeYearList = res;
            this.totalEmployeHommeYearList.map((item: any) => this.totalEmployeHommeYear = parseFloat(item.total));
        }
    );
    this.dashAllService.totalEnmployeHommeMonth(this.currentUser.code_entreprise).subscribe(
      res =>  {
          this.totalEmployeHommeMonthList = res;
          this.totalEmployeHommeMonthList.map((item: any) => this.totalEmployeHommeMonth = parseFloat(item.total));
      }
  );
     }



     getTotalFinance() {
      this.dashAllService.masseSalarialAll(this.currentUser.code_entreprise).subscribe(
          res =>  {
              this.netAPayerAllList = res;
              this.netAPayerAllList.map((item: any) => this.netAPayerAll = parseFloat(item.net_a_payer));
          }
      );
      this.dashAllService.masseSalarialYear(this.currentUser.code_entreprise).subscribe(
        res =>  {
              this.netAPayerYearList = res;
              this.netAPayerYearList.map((item: any) => this.netAPayerYear = parseFloat(item.net_a_payer));
          }
      ); 
      this.dashAllService.masseSalarialMonth(this.currentUser.code_entreprise).subscribe(
        res =>  {
            this.netAPayerMonthList = res;
            this.netAPayerMonthList.map((item: any) => this.netAPayerMonth = parseFloat(item.net_a_payer));
        }
    );
      
     }
  
  
}
