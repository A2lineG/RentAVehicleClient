import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleDTO, VehicleAPI, OptionVehicleDTO, OptionBookingAPI, DepotDTO, DepotAPI, BookingDTO, OptionBookingDTO, OptionBookingBookingDTO, BookingAPI } from 'app/api/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})
export class BookingCreateComponent implements OnInit {

  calendarPlugins = [dayGridPlugin, interactionPlugin]; // important!

  vehicle: VehicleDTO;
  optionBooking: OptionVehicleDTO[];
  depotList: DepotDTO[];

  formBooking: FormGroup;
  bookingToDB: BookingDTO = new BookingDTO;

  events;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleAPI: VehicleAPI,
    private depotAPI: DepotAPI,
    private optionBookingAPI: OptionBookingAPI,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private bookingAPI: BookingAPI,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if (id) {
        this.getDetailVehicle(id);
      }
    })

    this.getOptionBookingList();
    this.getDepotList();
    this.getBookingForm();
  }

  getBookingList() {
    this.bookingAPI.getBookingListByVehicle(this.vehicle.id).subscribe(
      result => {
        this.events = [];
        result.forEach(booking => {
          this.events.push({
            start: booking.startDate.toISOString().split('T')[0],
            end: booking.endDate.toISOString().split('T')[0],
            overlap: false,
            rendering: 'background',
            color: "#6B0000"
          });
        });
      }
    )
  }

  getDepotList(){
    this.depotAPI.getDepotList().subscribe(
      result => {
        this.depotList = result;
      }
    )
  }

  getOptionBookingList(){
    this.optionBookingAPI.getOptionBookingList().subscribe(
      result => {
        this.optionBooking = result;
      }
    )
  }

  getDetailVehicle(id: string) {
    this.vehicleAPI.getVehicleDetail(id).subscribe(
      result => {
        this.vehicle = result;
        this.getBookingList();
      }
    )
  }

  getBookingForm(){
    this.formBooking = this.formBuilder.group({
      depotId: ['', Validators.required],
      optionList: [new Array<OptionBookingDTO>()]
    })
  }

  createBooking(){
    if(!this.bookingToDB.startDate || !this.bookingToDB.endDate || this.bookingToDB.startDate <= new Date) {
      this.toastr.error("Veuillez sélectionner des dates valides.");
      return;
    }

    this.bookingToDB.depotId = this.formBooking.value['depotId'];
    this.bookingToDB.vehicleID = this.vehicle.id;

    this.bookingToDB.optionBookingBookings = new Array<OptionBookingBookingDTO>();

    this.formBooking.value['optionList'].forEach(element => {
      var optionBookingBooking = new OptionBookingBookingDTO();
      optionBookingBooking.optionBooking = element;
      this.bookingToDB.optionBookingBookings.push(optionBookingBooking);
    });

    this.bookingAPI.addBooking(this.bookingToDB).subscribe(
      bookingId => {
        this.toastr.info("Vous y êtes presque !");
        this.router.navigate(["/bookings/detail", bookingId]);
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  selectDates(info) {
    this.bookingToDB.startDate = info.start;
    this.bookingToDB.endDate = info.end;
  }
}
