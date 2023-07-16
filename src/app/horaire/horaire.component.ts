import { Component } from '@angular/core'; 
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.component.html',
  styleUrls: ['./horaire.component.scss']
})
export class HoraireComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
        { title: 'Meeting with UI/UX Designers', date: '2023-03-12' }, 
    ],
    plugins: [dayGridPlugin]
};
}
