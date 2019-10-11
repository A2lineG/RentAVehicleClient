import { Injectable, OnInit } from '@angular/core';
import { ClientAPI, ClientDTO, BookingDTO, BookingAPI } from 'app/api/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ClientFormDialogComponent } from './client-form-dialog/client-form-dialog.component';

@Injectable()
export class ClientService implements OnInit {

  clientList: Array<ClientDTO>;
  clientDetail: ClientDTO;
  clientForm: FormGroup;
  dialogRef: any;
  bookingByUser: BookingDTO[];

  constructor(
    private clientClient: ClientAPI,
    private bookingAPI: BookingAPI,
    private formBuilder: FormBuilder,
    public _matDialog: MatDialog) {
  }

  ngOnInit() {
  }


  getBookingByLoggedUser(){
    this.bookingAPI.getBookingByLoggedUser().subscribe(
      result => {
        this.bookingByUser = result;
      }
    )
  }  

  getEmptyForm() {
    return this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      birthDate: [''],
      driverLicenseNumber: [''],
      email: ['', Validators.email],
      password: ['']
    });
  }

  getFormFromClient(client: ClientDTO): FormGroup {
    return this.formBuilder.group({
      id: [client.id],
      firstName: [client.firstName, Validators.required],
      surname: [client.surname, Validators.required],
      birthDate: [client.birthDate],
      driverLicenseNumber: [client.driverLicenseNumber],
      email: [client.email, Validators.email],
      password: [client.password]
    });
  } 

  getClientFromForm(form: FormGroup): ClientDTO {
    return new ClientDTO({
      id: form.value['id'],
      firstName: form.value['firstName'],
      surname: form.value['surname'],
      birthDate: form.value['birthDate'],
      driverLicenseNumber: form.value['driverLicenseNumber'],
      email: form.value['email'],
      password: form.value['password']
    });
  }

  refreshList() {
    this.clientClient.getClientList().subscribe(
      result => {
        this.clientList = result;
      }
    )
  }

  addClient() {
    return this.actionClient(null, 'add');
  }

  editClient(client: ClientDTO) {
    return this.actionClient(client, 'edit');
  }

  actionClient(client: ClientDTO, action: string) {

    var form: FormGroup;

    switch (action) {
      case 'add':
        form = this.getEmptyForm();
        break;

      case 'edit':
        form = this.getFormFromClient(client);
        break;
    
      default:
        break;
    }

    this.dialogRef = this._matDialog.open(ClientFormDialogComponent, {
      panelClass: 'client-form-dialog',
      data: {
        clientForm: form,
        action: action
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {

        if (!response) {
          return;
        }

        const actionType: string = response[0];
        const formData: FormGroup = response[1];

        var client = this.getClientFromForm(formData);

        switch (actionType)
        {
            case 'add':
                this.clientClient.addClient(client).subscribe(
                  result => {
                    this.refreshList();
                }, error => {
                  console.log(error);
                });
                break;
            case 'save':
                this.clientClient.upDateClient(client).subscribe(
                  result => {
                    this.refreshList();
                }, error => {
                  console.log(error);
                });
                break;
            case 'delete':
                this.delete(client.id);
                break;
        }
      });
  }

  delete(id: string) {
    this.clientClient.deleteClient(id).subscribe(
      result => {
        this.refreshList();
      }
    )
  }
}