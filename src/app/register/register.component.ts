import { HttpDownloadProgressEvent, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { RegisterUser } from 'src/model/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,16}$'
      ),
    ]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });
  hidePassword: boolean = true;
  hideCfPassword: boolean = true;
  registerLoader: boolean = false;

  matchPasswordValidator() {
    return (control: FormControl) => {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { notSame: true };
    };
  }

  constructor(private router: Router, private apiService: ApiService) {
    this.registerForm
      .get('confirmPassword')!
      .setValidators(this.matchPasswordValidator() as ValidatorFn);

  }

  ngOnInit(): void { }

  register() {
    if (this.registerForm.valid) {
      this.registerLoader = true;
      this.registerForm.disable();
      // DO Register API remove timeout
      var requestData: RegisterUser = {
        name: this.registerForm.value.name,
        mobile: this.registerForm.value.mobile,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email
      } as RegisterUser;
      this.apiService.registerUser(requestData).subscribe({
        next: res => {
          if (res.status == 200) {

            this.registerForm.enable();
            this.registerLoader = false;
            localStorage.setItem("userToken",res.body!.accessToken)
            this.router.navigate(['/home']);
            this.apiService.successToaster("Register successfully")
          }
        }, error: (err: HttpErrorResponse) => {
          this.registerForm.enable();
          this.registerLoader = false;
          this.apiService.errorToaster(err.error)
        }
      })
    }
  }
}
