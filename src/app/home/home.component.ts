import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { CalculatePolicy } from 'src/model/calculate-input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  policySumInsForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required,Validators.max(5000000),Validators.min(0)]),
    premium: new FormControl(null, [Validators.required]),
    pt: new FormControl(null, [Validators.required]),
    ppt: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    frequency:new FormControl(null, [Validators.required]),
  });
  submitLoader: boolean = false;
  selectedFrequency: string='';
  latestData=[]
  frequencies= [
    {value: 'yearly', viewValue: 'Yearly'},
    {value: 'half-yearly', viewValue: 'Half-Yearly'},
    {value: 'monthly', viewValue: 'Monthly'},
  ];
  constructor(private router: Router,private apiService:ApiService) {}

  ngOnInit() {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin'], { replaceUrl: true });
  }

  calculatePolicySI() {
    if (this.policySumInsForm.valid) {
      this.submitLoader = true;
      this.policySumInsForm.disable();
      var requestData: CalculatePolicy = {
        sumAssured: this.policySumInsForm.value.amount,
        premium: this.policySumInsForm.value.premium,
        pt: this.policySumInsForm.value.pt,
        ppt: this.policySumInsForm.value.ppt,
        age:new Date().getFullYear()-this.policySumInsForm.value.age.getFullYear(),
        premiumFrequency:this.policySumInsForm.value.frequency
      } as CalculatePolicy;
      this.apiService.calculatePolicy(requestData).subscribe({
        next: res => {
          if (res.status == 200) {
            
            this.submitLoader = false;
        this.policySumInsForm.enable();
        this.policySumInsForm.reset();
        
        this.router.navigate(['/listings']);
          }
        }, error: (err: HttpErrorResponse) => {
          this.policySumInsForm.enable();
          this.submitLoader = false;
          this.apiService.errorToaster(err.error?.message)
        }
      })
      // setTimeout(() => {
      //   this.submitLoader = false;
      //   this.policySumInsForm.enable();
      //   this.policySumInsForm.reset();
      //   this.router.navigate(['/listings']);
      // }, 3000);
    } else {
    }
  }
}
