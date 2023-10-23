import { Component, Inject, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { HoraireModel } from '../models/horaire.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HoraireService } from '../horaire.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.scss']
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
      this.loadData(routeParams['horaire_id']);
    });
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user; 
        // this.calendarOptions.events = [];
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

  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridPlugin,
      interactionPlugin,
    ],
    initialView: 'dayGridMonth',
    weekends: true,
    selectable: true, 
    events: [
      { title: '08:00', date: '2023-10-16', backgroundColor: 'green', textColor: 'white'},
      { title: `16:00`, date: '2023-10-16', backgroundColor: 'blue', textColor: 'white'},
      { title: `24:00`, date: '2023-10-16', backgroundColor: 'orange', textColor: 'white'},
    ],
    dateClick: this.handleDateClick.bind(this),
    select: function(info) { 
      console.log("select mạnh đã ở đây"); 
    },
  };

  handleDateClick(arg: { dateStr: any; }) {
    const dialogRef = this.dialog.open(HoraireInfoDialogBox, {
      width: '80%',
      data: {
        date: arg.dateStr,
        horaire: this.horaire
      }
    }); 
  }

  edit(id: number): void { 
    this.router.navigate(['/layouts/presences', this.horaire.corporate.id, 'horaires', this.horaire.id, 'horaire-edit']);
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

}



@Component({
  selector: 'horaire-dialog',
  templateUrl: './horaire-info.html',
})
export class HoraireInfoDialogBox implements OnInit { 
  
  date: string;
  horaire: HoraireModel;

  personnel_shift_1: string[] = [];
  personnel_shift_2: string[] = [];
  personnel_shift_3: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<HoraireInfoDialogBox>, 
      private horairervice: HoraireService,
  ) {}

  ngOnInit(): void { 
    this.horaire = this.data;
    console.log('date', this.data.date)
    console.log('horaire', this.data.horaire)

    if (this.horaire.date_shift_1.includes(this.date)) {
      this.personnel_shift_1.push(...this.horaire.personnel_shift_1)
    } else if (this.horaire.date_shift_2.includes(this.date)) {
      this.personnel_shift_2.push(...this.horaire.personnel_shift_2)
    } else if (this.horaire.date_shift_3.includes(this.date)) {
      this.personnel_shift_3.push(...this.horaire.personnel_shift_3)
    }
  }

  
  close(){
      this.dialogRef.close(true);
  } 
 

}
