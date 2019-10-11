import { Component, OnInit } from '@angular/core';
import { VehicleDTO, VehicleAPI, OptionVehicleDTO, OptionVehicleAPI, OptionVehicleVehicleDTO } from 'app/api/api';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle-update-detail',
  templateUrl: './vehicle-update-detail.component.html',
  styleUrls: ['./vehicle-update-detail.component.css']
})
export class VehicleUpdateDetailComponent implements OnInit {

  vehicle: VehicleDTO;
  vehicleForm: FormGroup;
  optionVehicleList: OptionVehicleDTO[];


  constructor(
    private vehicleAPI: VehicleAPI,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private optionVehicleAPI: OptionVehicleAPI,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if (id) {
        this.getDetailVehicle(id);
      }
    });

    this.getOptionVehicleList();
  }

  getVehicleUpdateForm() {
    var optionIdByVehicle = new Array<string>();

    for (let options of this.vehicle.optionVehicleVehicles) {
      optionIdByVehicle.push(options.optionVehicle.id);
    }

    this.vehicleForm = this.formBuilder.group({
      plateNumber: [this.vehicle.plateNumber, Validators.required],
      year: [this.vehicle.year, [Validators.required, Validators.pattern("^\\d{4}$")]],
      mileage: [this.vehicle.mileage, Validators.required],
      optionIds: [optionIdByVehicle],
    })
  }

  updateVehicle() {
    this.vehicle.optionVehicleVehicles = new Array<OptionVehicleVehicleDTO>();

    this.vehicle.plateNumber = this.vehicleForm.value['plateNumber'];
    this.vehicle.year = this.vehicleForm.value['year'];
    this.vehicle.mileage = this.vehicleForm.value['mileage'];

    this.vehicleForm.value['optionIds'].forEach(optionVehicleId => {
      var optionVehicleVehicle = new OptionVehicleVehicleDTO();
      optionVehicleVehicle.optionVehicleId = optionVehicleId;
      optionVehicleVehicle.vehicleId = this.vehicle.id;
      this.vehicle.optionVehicleVehicles.push(optionVehicleVehicle);
    })

    this.vehicleAPI.updateVehicle(this.vehicle).subscribe(
      result => {
        this.toastr.success("Le véhicule a été mis à jour.");
      });
  }

  getOptionVehicleList() {
      this.optionVehicleAPI.getOptionVehicleList().subscribe(
        result => {
          this.optionVehicleList = result;
        }
      )
    }

  getDetailVehicle(id: string) {
      this.vehicleAPI.getVehicleDetail(id).subscribe(
        result => {
          this.vehicle = result;
          this.getVehicleUpdateForm();
        },
        error => {
          this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
        }
      )
    }
}
