import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientService } from '../client.service';
import { ActivatedRoute } from '@angular/router';
import { BookingAPI, BookingDTO, ClientAPI, ClientDTO, OpinionDTO, OpinionAPI } from 'app/api/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  bookingByClient: BookingDTO[];
  clientDetail: ClientDTO;
  opinionByClient: OpinionDTO[];  

  constructor(
    private clientAPI: ClientAPI,
    private route: ActivatedRoute,
    private bookingAPI: BookingAPI,
    private opinionAPI: OpinionAPI,
    private toastr: ToastrService
    )
    { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if(id){
        this.getDetailClient(id);
        this.getOpinionByClient(id);
        this.getBookingByClient(id);
      } else {
        this.getBookingByLoggedUser();
        this.getDetailClientByLoggedUser();
      }

    });
  }

  updateClient(){
    this.clientAPI.upDateClient(this.clientDetail).subscribe(
      result =>{
        console.log(this.clientDetail);
        this.toastr.success("Votre profil a été mis à jour.");
      }
    )
  }

  getOpinionByClient(id: string){
    this.opinionAPI.getOpinionByClient(id).subscribe(
      result => {
        this.opinionByClient = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getDetailClient(id: string){
    this.clientAPI.getClientDetail(id).subscribe(
      result => {
          this.clientDetail = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getDetailClientByLoggedUser(){
    this.clientAPI.getDetailClientByLoggedUser().subscribe(
      result => {
        this.clientDetail = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
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
