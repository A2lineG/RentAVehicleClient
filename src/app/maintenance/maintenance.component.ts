import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MaintenanceAPI, MaintenanceDTO } from 'app/api/api';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  calendarPlugins = [dayGridPlugin]; // important!

  maintenances = [
    { title: 'BMW Série 2', start: '2019-10-11', end: '2019-10-14', id: "A Guid anyhow ..." },
    { title: 'Mercedes Classe C', start: '2019-10-15', end: '2019-10-22' }
  ];

  constructor(private maintenanceApi: MaintenanceAPI) { }

  ngOnInit() {

  }

  eventClick(arg) {
    console.log(arg.event);
  }

  getEvents(maintenanceList: Array<MaintenanceDTO>) {
    // return {
    //   title:
    // }
  }



}
