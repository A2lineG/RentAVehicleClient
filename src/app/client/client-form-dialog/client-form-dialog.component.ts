import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss']
})
export class ClientFormDialogComponent {

  action: string;
  clientForm: FormGroup;
  dialogTitle: string;

  constructor(
    public matDialogRef: MatDialogRef<ClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any
  ) {
    this.action = _data.action;

    this.dialogTitle = this.action === 'edit' ? 'Edit Client' : 'New Client';

    this.clientForm = _data.clientForm;
  }
}
