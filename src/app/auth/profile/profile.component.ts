import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent
} from "ng-apexcharts";
import { AuthService } from '../auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild("chart")
  chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;


  isLoading = false; 

  infoForm: FormGroup;
 
 
  currentUser: PersonnelModel | any;

  constructor( 
    public themeService: CustomizerSettingsService,
    private authService: AuthService,
    public dialog: MatDialog
   ) {
    this.chartOptions = {
      series: [70],
      chart: {
          height: 110,
          width: 110,
          offsetX: 2.5,
          type: "radialBar",
          sparkline: {
              enabled: true,
          },
      },
      colors: ["#00B69B"],
      plotOptions: {
          radialBar: {
              startAngle: -120,
              endAngle: 120,
              dataLabels: {
                  name: {
                      show: false
                  },
                  value: {
                      offsetY: 3,
                      fontSize: "14px",
                      fontWeight: "700",
                  }
              }
          }
      }
  };
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.user().subscribe(
      res => {
        this.currentUser = res;
        console.log(this.currentUser);
        this.isLoading = false;
      }
    );
    this.isLoading = false;
    // this.infoForm = this.formBuilder.group({
    //   first_name: '',
    //   last_name: '',
    //   email: ''
    // })
    // const user = Auth.user;
    // this.infoForm = this.formBuilder.group({
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   email: user.email
    // });

    

    // Auth.userEmitter.subscribe(
    //   user => {
    //     this.infoForm.patchValue(user); // set default value (fetched)
    //   }
    // );
  }

  // infoSubmit(): void {
  //   // console.log(this.infoForm.getRawValue());
  //   this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(
  //     user => {
  //       // console.log(user);
  //       Auth.userEmitter.emit(user); // update the state of User Emitter
  //     }
  //   );
  // }


  openAddTaskDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChangePasswordDialogBox, {
        width: '600px',
        enterAnimationDuration,
        exitAnimationDuration
    });
}


  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleCardBorderTheme() {
      this.themeService.toggleCardBorderTheme();
  }

  toggleCardBorderRadiusTheme() {
      this.themeService.toggleCardBorderRadiusTheme();
  }
}


@Component({
  selector: 'add-task-dialog',
  templateUrl: './change-password.html',
})
export class ChangePasswordDialogBox implements OnInit{
  passwordForm: FormGroup;

  currentUser: PersonnelModel | any;

  constructor(
      public dialogRef: MatDialogRef<ChangePasswordDialogBox>,
      private formBuilder: FormBuilder,
      private authService: AuthService,
  ) {}


  ngOnInit(): void {
    this.authService.user().subscribe(
      res => {
        this.currentUser = res; 
      }
    );
    this.passwordForm = this.formBuilder.group({ 
      password: ["", Validators.compose([Validators.required])],
      password_confirm: ''
    });
  } 


  passwordSubmit(): void {  
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => console.log(res)
    );
  }

  close(){
      this.dialogRef.close(true);
  } 

}