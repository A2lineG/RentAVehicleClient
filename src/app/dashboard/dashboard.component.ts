import { Component, OnInit } from '@angular/core';
import { VehicleDTO, VehicleAPI, ClientAPI, ClientDTO, BookingDTO, BookingAPI } from 'app/api/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public date = new Date;
  public hour = new Date;

  public vehicleList:  VehicleDTO[];
  public clientList: ClientDTO[]; 
  public bookingList: BookingDTO[];

  public lengthVehicle;
  public lengthClient;
  public chiffreAffaire;

  constructor(
    private vehicleAPI: VehicleAPI,
    private clientAPI: ClientAPI,
    private bookingAPI: BookingAPI,
  ) { }

  ngOnInit() {
    this.getVehicleList();
    this.getClientList();
    this.getBookingList();
  }

  getVehicleList() {
    this.vehicleAPI.getVehicleList().subscribe(
      result => {
        this.vehicleList = result; 
        this.lengthVehicle = this.vehicleList.length;             
      },     
    )
  }
  
  getClientList(){
    this.clientAPI.getClientList().subscribe(
      result => {
        this.clientList = result;
        this.lengthClient = this.clientList.length; 
      }      
    )
  }

  getBookingList(){
    this.bookingAPI.getBookingList().subscribe(
      result => {
        this.bookingList = result;
        this.chiffreAffaire = this.bookingList
        .reduce((sum, current) => sum + current.totalPrice, 0);
      }
    )
  }

}
