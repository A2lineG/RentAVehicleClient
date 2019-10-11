import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { ClientDTO, ClientAPI } from 'app/api/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clientList: ClientDTO[];  

  constructor(
    private clientAPI: ClientAPI,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {
  }


  ngOnInit() {

    this.getClientList();

  } 
  

  getClientList(){
    this.clientAPI.getClientList().subscribe(
      result => {
        this.clientList = result;
      },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      }
    )
  }

  detailClient(idClient: string) {
    this.router.navigate([idClient], { relativeTo: this.route });
  }  

}
