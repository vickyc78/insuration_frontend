import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { LoginUser } from 'src/model/login-user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  singinForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });
  hidePassword: boolean = true;
  signInLoader: boolean = false;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void { }

  login() {
    if (this.singinForm.valid) {
      this.signInLoader = true;
      this.singinForm.disable();
      var loginObj: LoginUser = {
        password: this.singinForm.value.password,
        email: this.singinForm.value.email
      }
      this.apiService.loginUser(loginObj).subscribe({
        next: res => {
          if (res.status == 200) {

            this.singinForm.enable();
            this.signInLoader = false;
            localStorage.setItem("userToken", res.body!.accessToken)
            this.router.navigate(['/home']);
            this.apiService.successToaster("Register successfully")
          }
        }, error: (err: HttpErrorResponse) => {
          this.singinForm.enable();
          this.signInLoader = false;
          this.apiService.errorToaster(err.error)
        }
      })
      
    }
  }
}
