import { Component, OnInit } from '@angular/core';
import { VehicleDTO, VehicleAPI } from 'app/api/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-list-admin',
  templateUrl: './vehicle-list-admin.component.html',
  styleUrls: ['./vehicle-list-admin.component.css']
})
export class VehicleListAdminComponent implements OnInit {

  vehicleList: VehicleDTO[];
  selectedVehicleId: string;

  constructor(
    private vehicleAPI: VehicleAPI,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(this.route);
      
      var id = params['id'];

      if (id) {
        this.selectedVehicleId = id;
      }
    });

    this.getVehicleList();
  }

  getVehicleList() {
    this.vehicleAPI.getVehicleList().subscribe(
      result => {
        this.vehicleList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getVehicle(idVehicle: string) {
    this.selectedVehicleId = idVehicle;
    this.router.navigate([idVehicle], { relativeTo: this.route });
  }

  deleteVehicle(idVehicle: string){
  }


}
