import { Component, OnInit } from '@angular/core';
import { BookingDTO, BookingAPI } from 'app/api/api';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-list-client',
  templateUrl: './booking-list-client.component.html',
  styleUrls: ['./booking-list-client.component.css']
})
export class BookingListClientComponent implements OnInit {

  bookingByClient: BookingDTO[];

  constructor(
    private bookingAPI:  BookingAPI,
    private route : ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if(id){
        this.getBookingByClient(id);
      } else {
        this.getBookingByLoggedUser();
      }
    })
  }

  getBookingByLoggedUser(){
    this.bookingAPI.getBookingByLoggedUser().subscribe(
      result => {
        this.bookingByClient = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getBookingByClient(clientId : string){
    this.bookingAPI.getBookingByClient(clientId).subscribe(
      result => {
        this.bookingByClient = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }
}
