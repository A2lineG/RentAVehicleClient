import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'app/login/login.service';
import { AccountAPI, AuthDTO } from 'app/api/api';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  public formRegister: FormGroup;

  constructor(private loginService: LoginService,
    private accountApi: AccountAPI,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      driverLicenseNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.formRegister.setValidators(this.comparisonValidator());
  }

  public register() {
    var auth = new AuthDTO();

    auth.firstName = this.formRegister.value['firstName'];
    auth.surname = this.formRegister.value['surname'];
    auth.email = this.formRegister.value['email'];
    auth.birthDate = this.formRegister.value['birthDate'];
    auth.driverLicenseNumber = this.formRegister.value['driverLicenseNumber'];
    auth.password = this.formRegister.value['password'];
    auth.confirmPassword = this.formRegister.value['confirmPassword'];

    this.accountApi.register(auth).subscribe(result => {
      this.loginService.login(auth.email, auth.password, "/Vehicles").subscribe(result => {
        this.toastr.success("Profil créé. Bienvenue sur Rent a Vehicle.");
      },
        error => {
          this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
        })
    },
      error => {
        this.toastr.warning(JSON.parse(error.response).ExceptionMessage);
      })
  }

  // Validators
  public comparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const password = group.controls['password'];
      const confirmPassword = group.controls['confirmPassword'];

      if(confirmPassword.errors) return;

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notEquivalent: true });
      } else {
        confirmPassword.setErrors(null);
      }
      return;
    };
  }
}
