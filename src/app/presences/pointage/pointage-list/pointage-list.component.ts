import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RegisterMonthModel } from '../../models/register_month.model';

@Component({
  selector: 'app-pointage-list',
  templateUrl: './pointage-list.component.html',
  styleUrls: ['./pointage-list.component.scss']
})
export class PointageListComponent implements OnChanges {
  @Input() RegisterMonthList!: RegisterMonthModel[];
  @Input() date_presence!: Date;
  
  dayList: Date[] | any;

  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.date_presence) {
      this.dayList = this.getDaysOfMonth(new Date(this.date_presence));
    }
    this.dayList = this.getDaysOfMonth(new Date());

    console.log('RegisterMonthList', this.RegisterMonthList);
  }


  getDaysOfMonth(dateFormat: Date) : Date[] {
    var date = new Date(dateFormat.getFullYear(), dateFormat.getMonth(), 1);
    var days = [];
    while (date.getMonth() === dateFormat.getMonth()) { 
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }


}
