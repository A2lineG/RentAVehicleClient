import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup;
  returnUrl : string;

  constructor(private loginService : LoginService,
              private formBuilder : FormBuilder,
              private toastr : ToastrService,
              private router : Router,
              private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    // reset login status
    this.loginService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.formLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public login() {
    var userName = this.formLogin.value['userName'];
    var password = this.formLogin.value['password'];

    this.loginService.login(userName, password, this.returnUrl).subscribe(result => {

    }, error => {
      this.toastr.error(error.error.error_description);
    });
  }
}
