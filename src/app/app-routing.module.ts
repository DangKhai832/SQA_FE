import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {CreateLoanComponent} from "./components/createLoan/createLoan.component";
import {SearchLoanComponent} from "./components/tìm kiếm trang tạo khoản vay/searchLoan.component";
import {SearchLoanPaymentComponent} from "./components/tìm kiếm trang thanh toán/searchLoanPayment.component";
import {ListLoanComponent} from "./components/listLoan/listLoan.component";
import {HandleLoanComponent} from "./components/handleLoan/handleLoan.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path : 'createLoan',
    component : CreateLoanComponent
  },
  {
    path : 'searchLoan',
    component : SearchLoanComponent
  },
  {
    path : 'createLoan/:id',
    component : CreateLoanComponent
  },
  {
    path : 'loanPayment',
    component : SearchLoanPaymentComponent
  },
  {
    path : 'listLoan/:id',
    component : ListLoanComponent
  },
  {
    path : 'handleLoan/:id',
    component : HandleLoanComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
