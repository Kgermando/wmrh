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
import { Router } from '@angular/router';
import { Auth } from 'src/app/classes/auth';

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
    private router: Router,
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
    this.authService.user().subscribe({
      next: (user) => this.currentUser = user,
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
    Auth.userEmitter.subscribe(
      user => {
        this.currentUser = user; 
        console.log(this.currentUser);
      }
    );
    this.isLoading = false;  
  } 


  openPasswordDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChangePasswordDialogBox, {
        width: '600px',
        enterAnimationDuration,
        exitAnimationDuration
    }); 
  }

  openChangePhotoDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChangePhotoDialogBox, {
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
  selector: 'add-change-password',
  templateUrl: './change-password.html',
})
export class ChangePasswordDialogBox implements OnInit{
  passwordForm: FormGroup;

  currentUser: PersonnelModel | any;

  constructor(
      public dialogRef: MatDialogRef<ChangePasswordDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
  ) {}


  ngOnInit(): void { 
    this.passwordForm = this.formBuilder.group({ 
      password: ["", Validators.compose([Validators.required])],
      password_confirm: ''
    });
    Auth.userEmitter.subscribe(
      user => { 
        this.passwordForm.patchValue(user);
      }
    );
  } 


  passwordSubmit(): void {  
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => {
        console.log(res);
        this.authService.logout().subscribe(
          user => this.router.navigate(['/layouts/profile'])
        )
      }
    );
  }

  close(){
      this.dialogRef.close(true);
  } 

}


@Component({
  selector: 'add-change-photo',
  templateUrl: './change-photo.html', 
})
export class ChangePhotoDialogBox implements OnInit{
  photoForm: FormGroup;

  currentUser: PersonnelModel | any;

  constructor(
      public dialogRef: MatDialogRef<ChangePasswordDialogBox>,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
  ) {}


  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({  
      photo: ''
    }); 

    Auth.userEmitter.subscribe(
      user => { 
        this.currentUser = user;
        this.photoForm.patchValue(user);
      }
    );  
  }


  photoSubmit(): void {  
    this.authService.updateInfo(this.photoForm.getRawValue()).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/layouts/profile']);
      }
    );
  }

  close(){
      this.dialogRef.close(true);
  } 

}