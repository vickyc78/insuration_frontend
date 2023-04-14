import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {HttpClientModule} from "@angular/common/http"
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    HomeComponent,
    ListingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
