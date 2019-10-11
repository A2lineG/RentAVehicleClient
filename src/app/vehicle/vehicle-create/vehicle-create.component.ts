import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandDTO, BrandAPI, ModelAPI, ModelDTO, OptionVehicleDTO, OptionVehicleAPI, OptionVehicleVehicleDTO, VehicleAPI, VehicleDTO } from 'app/api/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-create',
  templateUrl: './vehicle-create.component.html',
  styleUrls: ['./vehicle-create.component.css']
})
export class VehicleCreateComponent implements OnInit {

  vehicleNewForm: FormGroup;
  marque: string
  brandList: BrandDTO[];
  modelList: ModelDTO[];
  optionsVehicleList: OptionVehicleDTO[];

  newVehicleToDto: VehicleDTO = new VehicleDTO;

  constructor(
    private brandAPI: BrandAPI,
    private modelAPI: ModelAPI,
    private vehicleAPI: VehicleAPI,
    private formBuilder: FormBuilder,
    private optionVehicleAPI: OptionVehicleAPI,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.getVehicleForm();

    this.getBrandList();

    this.getOptionByVehicle();
  }

  getVehicleForm(){
    this.vehicleNewForm = this.formBuilder.group({
      modeleId: [''],
      chassisNumber: [''],
      plateNumber: [''],
      year: [''],
      mileage: [''],
      optionIdList: [new Array<string>()],
    })
  }

  createBooking(){
    this.newVehicleToDto.modelId = this.vehicleNewForm.value['modeleId'];
    this.newVehicleToDto.chassisNumber = this.vehicleNewForm.value['chassisNumber'];
    this.newVehicleToDto.plateNumber = this.vehicleNewForm.value['plateNumber'];
    this.newVehicleToDto.year = this.vehicleNewForm.value['year'];
    this.newVehicleToDto.mileage = this.vehicleNewForm.value['mileage'];

    this.newVehicleToDto.optionVehicleVehicles = new Array<OptionVehicleVehicleDTO>();

    this.vehicleNewForm.value['optionIdList'].forEach(optionId => {

      var optionVehicleVehicles = new OptionVehicleVehicleDTO();
      optionVehicleVehicles.optionVehicleId = optionId;

      this.newVehicleToDto.optionVehicleVehicles.push(optionVehicleVehicles);
    });

    this.vehicleAPI.addVehicle(this.newVehicleToDto).subscribe(
      vehicleId => {
        this.toastr.success("Nouveau véhicule crée !");
        this.router.navigate(["/vehicles/grid", vehicleId]);
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }





  getBrandList() {
    this.brandAPI.getBrandList().subscribe(
      result => {
        this.brandList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getModelByBrand() {
    this.modelAPI.getModelByBrand(this.marque).subscribe(
      result => {
        this.modelList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getOptionByVehicle() {
    this.optionVehicleAPI.getOptionVehicleList().subscribe(
      result => {
        this.optionsVehicleList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

}
