import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DashAllService } from './all/dash-all.service';
import { PersonnelModel } from '../personnels/models/personnel-model';
import { FinanceService } from './finances/finance.service';
import { PresencePAAAModel } from '../presences/models/presence-pie-model';
import { PresenceService } from '../presences/presence.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  categoryList = [
    'All',
    'Employés',
    'Finances',
  ];
  // 'Presences',  
  // 'Autres',

  // dureeList = ['All', 'Année', 'Mois'];
  dateRange!: FormGroup;
  start_date: any;
  end_date: any;

  isSelectCategory = 'All';

  currentUser: PersonnelModel | any;

  totalEmployeAllList:any[] = [];
  totalEmployeFemmeAllList:any[] = [];
  totalEmployeHommeAllList:any[] = [];
  totalEmployeAll = 0;
  totalEmployeFemmeAll = 0;
  totalEmployeHommeAll = 0;

  netAPayerAllList:any[] = [];
  netAPayerAll = 0;

  iprAllList:any[] = [];
  iprAll = 0;

  cnssQPOAllList:any[] = [];
  cnssQPOAll = 0;

  itemsPAAAList: PresencePAAAModel[] = [];
  itemsPList: PresencePAAAModel[] = [];
  itemsAList: PresencePAAAModel[] = [];
  itemsAAList: PresencePAAAModel[] = [];

  itemsCongeList: PresencePAAAModel[] = [];
  itemsAMList: PresencePAAAModel[] = [];
  itemsCCList: PresencePAAAModel[] = [];
  itemsCAList: PresencePAAAModel[] = [];
  itemsSList: PresencePAAAModel[] = [];
  itemsOList: PresencePAAAModel[] = [];
  itemsMList: PresencePAAAModel[] = [];
 
  numberP: number = 0;
  numberA: number = 0;
  numberAA: number = 0;

  numberAM: number = 0;
  numberCC: number = 0;
  numberCA: number = 0;
  numberS: number = 0;
  numberO: number = 0;
  numberM: number = 0;

  constructor(
    public themeService: CustomizerSettingsService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dashAllService: DashAllService,
    private financeService: FinanceService,
    private presenceService: PresenceService
  ) { }

  ngOnInit(): void {
    var date = new Date();
    var tomorrow = new Date(date);
    tomorrow.setDate(date.getDate()+1);

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    this.dateRange = this._formBuilder.group({ 
      start: new FormControl(firstDay),
      end: new FormControl(tomorrow),
      categorie: new FormControl('All')
    });

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;

        this.start_date = formatDate(firstDay, 'yyyy-MM-dd', 'en-US');
          
        this.end_date = formatDate(tomorrow, 'yyyy-MM-dd', 'en-US');

        this.onSelectCategoryChange(this.start_date); 
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });   

    this.onChanges();
  }


  onChanges(): void {
    this.dateRange.valueChanges.subscribe(val => {
      this.start_date = formatDate(val.start, 'yyyy-MM-dd', 'en-US'); 
      this.end_date = formatDate(val.end, 'yyyy-MM-dd', 'en-US');
      if(val.categorie === 'All') {
        this.isSelectCategory = 'All'; 
        this.getTotalEmployE();

      } else if (val.categorie === 'Employés') {
        this.isSelectCategory = 'Employés';
        this.getTotalEmployE();

      } else if(val.categorie === 'Finances') {
        this.isSelectCategory = 'Finances';
        this.getTotalFinance(this.start_date, this.end_date);

      } else if(val.categorie === 'Presences') {
        this.isSelectCategory = 'Presences';
        this.getPresence();
        
      } else if(val.categorie === 'Autres') {
        this.isSelectCategory = 'Autres';
      }

    })
  }

  
    onSelectCategoryChange(event: any) {
      var body = {
        start: this.dateRange.value.start,
        end: this.dateRange.value.end,
        categorie: this.dateRange.value.categorie,
      }

      this.start_date = formatDate(body.start, 'yyyy-MM-dd', 'en-US');
      this.end_date = formatDate(body.end, 'yyyy-MM-dd', 'en-US'); 

      if(body.categorie === 'All') {
        this.isSelectCategory = 'All'; 
        this.getTotalEmployE();

      } else if (body.categorie === 'Employés') {
        this.isSelectCategory = 'Employés';
        this.getTotalEmployE();

      } else if(body.categorie === 'Finances') {
        this.isSelectCategory = 'Finances';
        this.getTotalFinance(this.start_date, this.end_date);

      } else if(body.categorie === 'Presences') {
        this.isSelectCategory = 'Presences';
        this.getPresence();
        
      } else if(body.categorie === 'Autres') {
        this.isSelectCategory = 'Autres';
      }
    }
 

    getTotalEmployE() {
      // this.dashAllService.totalEnmployesAll(this.currentUser.code_entreprise, start_date, end_date).subscribe(
      //   res =>  {
      //       this.totalEmployeAllList = res;
      //       this.totalEmployeAllList.map((item: any) => this.totalEmployeAll = parseFloat(item.total));
      //   }
      // ); 

      this.dashAllService.totalEnmployeFemmeAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
          this.totalEmployeFemmeAllList = res;
          this.totalEmployeFemmeAllList.map((item: any) => this.totalEmployeFemmeAll = parseFloat(item.total));
        }
      );

      this.dashAllService.totalEnmployeHommeAll(this.currentUser.code_entreprise).subscribe(
        res =>  {
          this.totalEmployeHommeAllList = res;
            this.totalEmployeHommeAllList.map((item: any) => this.totalEmployeHommeAll = parseFloat(item.total));
        }
      ); 
    }



    getTotalFinance(start_date: string, end_date: string) {
      this.dashAllService.masseSalarialAll(this.currentUser.code_entreprise, start_date, end_date).subscribe(
          res =>  {
              this.netAPayerAllList = res;
              this.netAPayerAllList.map((item: any) => this.netAPayerAll = parseFloat(item.net_a_payer));
          }
      );  

        // IPR
      this.financeService.iprAll(this.currentUser.code_entreprise, start_date, end_date).subscribe(
        res =>  {
            this.iprAllList = res;
            this.iprAllList.map((item: any) => this.iprAll = parseFloat(item.total));
        }
      ); 

        // CNSS QQPO
      this.financeService.cnssQPOAll(this.currentUser.code_entreprise, start_date, end_date).subscribe(
        res =>  {
            this.cnssQPOAllList = res;
            this.cnssQPOAllList.map((item: any) => this.cnssQPOAll = parseFloat(item.total));
        }
      );
    }


    getPresence() {
      this.presenceService.getItemsPAAAALL(this.currentUser.code_entreprise).subscribe(res => { 
        this.itemsPAAAList = res;
        this.itemsPList = this.itemsPAAAList.filter(v => v.apointement === 'P');
        this.itemsAList = this.itemsPAAAList.filter(v => v.apointement === 'A');
        this.itemsAAList = this.itemsPAAAList.filter(v => v.apointement === 'AA');
        
        this.itemsPList.map((item: any) => this.numberP = item.count);
        this.itemsAList.map((item: any) => this.numberA = item.count);
        this.itemsAAList.map((item: any) => this.numberAA = item.count); 
      });
      this.presenceService.getItemsCongEALL(this.currentUser.code_entreprise).subscribe(res => {
        this.itemsCongeList = res;
        this.itemsAMList = this.itemsCongeList.filter(v => v.apointement === 'AM');
        this.itemsCCList = this.itemsCongeList.filter(v => v.apointement === 'CC');
        this.itemsCAList = this.itemsCongeList.filter(v => v.apointement === 'CA');
        this.itemsSList = this.itemsCongeList.filter(v => v.apointement === 'S');
        this.itemsOList = this.itemsCongeList.filter(v => v.apointement === 'O');
        this.itemsMList = this.itemsCongeList.filter(v => v.apointement === 'M');

        this.itemsAMList.map((item: any) => this.numberAM = item.count);
        this.itemsCCList.map((item: any) => this.numberCC = item.count);
        this.itemsCAList.map((item: any) => this.numberCA = item.count);
        this.itemsSList.map((item: any) => this.numberS = item.count);
        this.itemsOList.map((item: any) => this.numberO = item.count);
        this.itemsMList.map((item: any) => this.numberM = item.count);
      });
    }
  
  
}
