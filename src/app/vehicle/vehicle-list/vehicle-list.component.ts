import { Component, OnInit, AfterViewInit } from '@angular/core';
import { VehicleDTO, VehicleAPI, BrandDTO, BrandAPI, ModelDTO, ModelAPI } from 'app/api/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicleList: VehicleDTO[];
  vehicleListFilter: VehicleDTO[];
  brandList: BrandDTO[];
  modelList: ModelDTO[];

  public searchModel: string;
  public brandId: string;
  public modelId: string;
  public startDate: Date;
  public endDate: Date;

  constructor(
    private vehicleAPI: VehicleAPI,
    private brandAPI: BrandAPI,
    private modelAPI: ModelAPI,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.getBrandList();

    this.getVehicleList();
  }

  getModelByBrand(){
    this.modelAPI.getModelByBrand(this.brandId).subscribe(
      result => {
        this.modelList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getVehicleList() {
    this.vehicleAPI.getVehicleList().subscribe(
      result => {
        this.vehicleList = result;
        this.resetFilter()
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  getVehicleFiltered() {
    this.vehicleAPI.getVehicleListFiltered(this.brandId, this.modelId).subscribe(
      result => {
        this.vehicleList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    );
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

  filterVehicles() {
    this.vehicleListFilter = this.vehicleList.filter(x => x.modelId == this.modelId);
  }

  resetFilter() {
    this.vehicleListFilter = this.vehicleList;
  }

}
