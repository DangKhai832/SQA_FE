import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./components/home/home.component";
import { TopbarComponent } from './topbar/topbar.component';
import {RegisterComponent} from "./components/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {CreateLoanComponent} from "./components/createLoan/createLoan.component";
import {SearchLoanComponent} from "./components/tìm kiếm trang tạo khoản vay/searchLoan.component";
import {DialogModule} from "primeng/dialog";
import {SearchLoanPaymentComponent} from "./components/tìm kiếm trang thanh toán/searchLoanPayment.component";
import {ListLoanComponent} from "./components/listLoan/listLoan.component";
import {HandleLoanComponent} from "./components/handleLoan/handleLoan.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {StyleClassModule} from "primeng/styleclass";
import { CurrencyFormatPipe } from './currency-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    RegisterComponent,
    CreateLoanComponent,
    SearchLoanComponent,
    SearchLoanPaymentComponent,
    ListLoanComponent,
    HandleLoanComponent,
    CurrencyFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    ProgressSpinnerModule,
    StyleClassModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
