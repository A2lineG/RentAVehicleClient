import { Component, OnInit } from '@angular/core';
import { BookingDTO, BookingAPI } from 'app/api/api';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {

  bookingDetail: BookingDTO;

  constructor(
    private bookingAPI:  BookingAPI,
    private route : ActivatedRoute,
    private toastr: ToastrService,
    private loginService : LoginService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if(id){
        this.getBookingDetailByClient(id);
      } else {
        this.getBookingDetailByLoggedUser();
      }
    })
  }

  getBookingDetailByLoggedUser(){
    this.bookingAPI.getBookingDetailByLoggedUser().subscribe(
      result => {
        this.bookingDetail = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getBookingDetailByClient(clientId : string){
    this.bookingAPI.getBookingDetailByClient(clientId).subscribe(
      result => {
        this.bookingDetail = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  updateStatus() {
    this.bookingAPI.updateStatus(this.bookingDetail.id).subscribe(
      result => {
        this.bookingDetail.status = result.status;
        this.toastr.success("Statut mis à jour à " + result.status);
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  validateBooking() {
    if(confirm("Etes-vous sur ?")) {
      this.bookingAPI.validateBooking(this.bookingDetail.id).subscribe(
        result => {
          this.bookingDetail.status = result.status;
          this.toastr.success("Réservation validée !");
        },
        error => {
          this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
        }
      )
    }
  }

  cancelBooking() {
    if(confirm("Etes-vous sur ?")) {
      this.bookingAPI.cancelBooking(this.bookingDetail.id).subscribe(
        result => {
          this.bookingDetail.status = result.status;
          this.toastr.success("Réservation annulée.");
        },
        error => {
          this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
        }
      )
    }
  }

}
