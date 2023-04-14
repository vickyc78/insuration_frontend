import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { RegisterUser } from './model/register-user';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetails } from './model/user-detail';
import { LoginUser } from './model/login-user';
import { CalculatePolicy } from './model/calculate-input';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  dataUpdated:EventEmitter<any> = new EventEmitter();

  setLatestData(data:any) {
    this.dataUpdated.emit(data);
  }

  get headerObj() {
    return { 'Content-Type': 'application/json' }
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  errorToaster(message: string, duration: number = 4000) {
    // this.zone.run(() => {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration,
      panelClass: 'error-toaster',
    });
    // });
  }

  successToaster(message: string, duration: number = 4000) {
    // this.zone.run(() => {
    this._snackBar.open(message, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: duration,
      panelClass: 'success-toaster',
    });
    // });
  }
  constructor(private httpService: HttpClient, private _snackBar: MatSnackBar) {

  }

  registerUser(requestData: RegisterUser): Observable<HttpResponse<UserDetails>> {
    return this.httpService.post<UserDetails>("http://localhost:3000/User/registerUser", requestData, { headers: this.headerObj, observe: 'response' }).pipe(catchError(this.handleError))
  }

  loginUser(requestData:LoginUser):Observable<HttpResponse<UserDetails>>{
    return this.httpService.post<UserDetails>("http://localhost:3000/User/loginUser",requestData,{ headers: this.headerObj, observe: 'response' }).pipe(catchError(this.handleError))
  }

  calculatePolicy(requestData:CalculatePolicy):Observable<HttpResponse<any>>{
    return this.httpService.post<any>("http://localhost:3000/illustartion/calculatePolicy",requestData,{ headers: {accesstoken:localStorage.getItem("userToken")!,'Content-Type': 'application/json'}, observe: 'response' }).pipe(catchError(this.handleError))
  }

  getCalculatePolicy(requestData:{}):Observable<HttpResponse<any>>{
    return this.httpService.post<any>("http://localhost:3000/illustartion/getOneCalculation",requestData,{ headers: {accesstoken:localStorage.getItem("userToken")!,'Content-Type': 'application/json'}, observe: 'response' }).pipe(catchError(this.handleError))
  }
}
