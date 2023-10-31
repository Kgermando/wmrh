import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HoraireModel } from '../models/horaire.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HoraireService } from '../horaire.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';


@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HoraireComponent implements OnInit {

  isLoadingView = false;
  horaire: HoraireModel;
  currentUser: PersonnelModel | any;


  horaireEvent: any;

  
  constructor( 
    private router: Router,
      private authService: AuthService,
      private route: ActivatedRoute,
      private horaireService: HoraireService,
      public dialog: MatDialog,
      private toastr: ToastrService
  ) {}

  ngOnInit(): void { 
    this.route.params.subscribe(routeParams => {
      this.loadData(routeParams['id']);
    });
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;  
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  public loadData(id: any): void {
    this.isLoadingView = true;
    this.horaireService.get(Number(id)).subscribe(res => {
      this.horaire = res;
      this.isLoadingView = false;
    });
  }
 

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      var date = cellDate.getDate();
      var dateMonth = cellDate.getMonth();
      var dateYear = cellDate.getFullYear();  
      var day: any;
      var dayMonth: any;
      var dayYear: any; 

      let dataCSS = '';

      for (let index of this.horaire.date_shift_1) { 
        date = cellDate.getDate();
        dateMonth = cellDate.getMonth();
        dateYear = cellDate.getFullYear(); 
        const dy = new Date(index);
        day = dy.getDate();
        dayMonth = dy.getMonth();
        dayYear = dy.getFullYear(); 
        if (date === day && dateMonth === dayMonth && dateYear === dayYear) {
          dataCSS = "shift_1";
        }
      }
      return dataCSS;
    }

    return '';
  }

  dateClass2: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      var date = cellDate.getDate();
      var dateMonth = cellDate.getMonth();
      var dateYear = cellDate.getFullYear();  
      var day: any;
      var dayMonth: any;
      var dayYear: any; 

      let dataCSS = '';

      for (let index of this.horaire.date_shift_2) { 
        date = cellDate.getDate();
        dateMonth = cellDate.getMonth();
        dateYear = cellDate.getFullYear(); 
        const dy = new Date(index);
        day = dy.getDate();
        dayMonth = dy.getMonth();
        dayYear = dy.getFullYear(); 
        if (date === day && dateMonth === dayMonth && dateYear === dayYear) {
          dataCSS = "shift_2";
        }
      }
      return dataCSS;
    }

    return '';
  }

  dateClass3: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      var date = cellDate.getDate();
      var dateMonth = cellDate.getMonth();
      var dateYear = cellDate.getFullYear();  
      var day: any;
      var dayMonth: any;
      var dayYear: any; 

      let dataCSS = '';

      for (let index of this.horaire.date_shift_3) { 
        date = cellDate.getDate();
        dateMonth = cellDate.getMonth();
        dateYear = cellDate.getFullYear(); 
        const dy = new Date(index);
        day = dy.getDate();
        dayMonth = dy.getMonth();
        dayYear = dy.getFullYear(); 
        if (date === day && dateMonth === dayMonth && dateYear === dayYear) {
          dataCSS = "shift_3";
        }
      }
      return dataCSS;
    }

    return '';
  } 
  

  edit(id: number): void { 
    this.router.navigate(['/layouts/presences/horaires', this.horaire.id, 'horaire-edit']);
  }
 
  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.horaireService
        .delete(id)
        .subscribe({
          next: () => {
            this.toastr.info('Success!', 'Supprimé avec succès!');
            // this.router.navigate(['/layouts/presences', this.horaire.corporate.id, 'horaires']); 
            window.location.reload();
          },
          error: err => {
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          }
        }
      );
    }
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, 
      personnel_shift: any, shift: number, time: any): void {
    this.dialog.open(HoraireInfoDialogBox, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        personnel_shift: personnel_shift,
        shift: shift,
        time: time
      }
    }); 
  }
}


@Component({
  selector: 'horaire-dialog',
  templateUrl: './horaire-info.html',
})
export class HoraireInfoDialogBox implements OnInit { 
   
  horaire: HoraireModel;

  personnel_shift: string[] = []; 
  shift: number;
  time: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<HoraireInfoDialogBox>, 
      private horairervice: HoraireService,
  ) {}

  ngOnInit(): void { 
    // this.personnel_shift = this.data.personnel_shift;
    // this.shift = this.data.shift;
    // this.time = this.data.time;
    

    // if (this.horaire.date_shift_1.includes(this.date)) {
    //   this.personnel_shift_1.push(...this.horaire.personnel_shift_1)
    // } else if (this.horaire.date_shift_2.includes(this.date)) {
    //   this.personnel_shift_2.push(...this.horaire.personnel_shift_2)
    // } else if (this.horaire.date_shift_3.includes(this.date)) {
    //   this.personnel_shift_3.push(...this.horaire.personnel_shift_3)
    // }
  }

  
  close(){
    this.dialogRef.close(true);
  } 
 

}