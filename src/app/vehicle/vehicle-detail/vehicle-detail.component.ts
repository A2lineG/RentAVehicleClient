import { Component, OnInit } from '@angular/core';
import { VehicleDTO, VehicleAPI, OptionVehicleDTO } from 'app/api/api';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  vehicle: VehicleDTO;

  constructor(
    private vehicleAPI: VehicleAPI,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if(id){
        this.getDetailVehicle(id);
      }
    })
  }

  getDetailVehicle(id: string) {
    this.vehicleAPI.getVehicleDetail(id).subscribe(
      result => {
        this.vehicle = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

}
