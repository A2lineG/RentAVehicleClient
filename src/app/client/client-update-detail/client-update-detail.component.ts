import { Component, OnInit } from '@angular/core';
import { ClientDTO, ClientAPI } from 'app/api/api';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-update-detail',
  templateUrl: './client-update-detail.component.html',
  styleUrls: ['./client-update-detail.component.css']
})
export class ClientUpdateDetailComponent implements OnInit {

  client: ClientDTO;

  constructor(
    private clientAPI: ClientAPI,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var id = params['id'];

      if(id){
        this.getClientDetail(id);
      }
    })
  }

  getClientDetail(id: string){
    this.clientAPI.getClientDetail(id).subscribe(
      result => {
        this.client = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

}
