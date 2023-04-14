import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';

export interface ListDataType {
  name: string;
  policyNumber: string;
  amount: number;
  formula: string;
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  loadingData: boolean = false;
policies:any=[]
  // Column header and number of columns  ( add columns here whatever needed )
  displayedColumns: string[] = ['poilcy_year', 'premium', 'sumAssured', 'bonus_rate','bonus_amount','total_benefit','net_cashflows'];

  // you can add a type instead of any as per the data needed.
  dataSource: MatTableDataSource<ListDataType> =
    new MatTableDataSource<ListDataType>([]);
  constructor(private router: Router,private apiService:ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loadingData = true
    this.apiService.getCalculatePolicy({}).subscribe({
      next: res => {
        if (res.status == 200) {
          this.loadingData = false;
          this.policies=res.body[0]?.policyCalc
        }
      }, error: (err: HttpErrorResponse) => {
        this.loadingData = false
        this.apiService.errorToaster(err.error)
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/signin'], { replaceUrl: true });
  }
}
