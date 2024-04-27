import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "http://103.163.215.125/sqa/api/"

  createCustomer(body : object) {
    return this.http.post(this.baseServerUrl + "customer/create", body, {responseType : "json"})
  }

  searchCustomer(key : String) {
    return this.http.get(this.baseServerUrl + "customer/search?key=" + key, {responseType : "json"})
  }
  detailCustomer(key : String){
    return this.http.get(this.baseServerUrl +"customer/"+ key, {responseType : "json"})
  }

  getInformationCustomer(customerId: number) {
    return this.http.get(this.baseServerUrl + "customer/"+ customerId, {responseType : "json"})
  }
  getHistoryPayment(loanId : number) {
    return this.http.get(this.baseServerUrl + "payment/history/"+ loanId, {responseType : "json"})
  }
  deletePayment(paymentId : number) {
    return this.http.delete(this.baseServerUrl + "payment/delete/" + paymentId, {responseType : "json"})
  }

  createLoan(body: any) {
    return this.http.post(this.baseServerUrl + "loan/create", body, {responseType : "json"})
  }

  getListLoan(customerId: any) {
    return this.http.get(this.baseServerUrl + "loan/all/"+ customerId, {responseType : "json"})
  }
}
