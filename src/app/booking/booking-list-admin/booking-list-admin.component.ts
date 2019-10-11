import { Component, OnInit } from '@angular/core';
import { BookingDTO, BookingAPI } from 'app/api/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-list-admin',
  templateUrl: './booking-list-admin.component.html',
  styleUrls: ['./booking-list-admin.component.css']
})
export class BookingListAdminComponent implements OnInit {

  bookingList: BookingDTO[];    

  constructor(
    private bookingAPI:  BookingAPI,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getBookingList();

    
  }

  get sortData() {
    return this.bookingList ? this.bookingList.sort((a, b) => {
      return <any>new Number(b.number) - <any>new Date(a.number);
    }) : undefined;
  }
 

  getBookingList(){
    this.bookingAPI.getBookingList().subscribe(
      result => {
        this.bookingList = result;        
      }           
    ) 
    // this.bookingList = this.bookingList.sort((a, b) => {
    //   return <any>new Date(b.startDate) - <any>new Date(a.startDate);
      
     
  }

  getDetailBooking(id: string) {
    this.router.navigate([id], { relativeTo: this.route });
  }  

}
