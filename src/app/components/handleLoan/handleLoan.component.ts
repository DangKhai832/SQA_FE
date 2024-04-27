import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'handleLoan',
  templateUrl: './handleLoan.component.html',
  styleUrls: [
    './handleLoan.component.css'
  ]
})
export class HandleLoanComponent implements OnInit {
  loanId: any;
  customerInfo : any
  listPayment : any

  constructor(
    private authService: AuthService,
    private router : ActivatedRoute,
    private toastr : ToastrService,
    private routerLink : Router
  ) {}
  ngOnInit(): void {
    this.loanId = this.router.snapshot.url[1].path;
    this.authService.getHistoryPayment(this.loanId).subscribe(
      (res: any) => {
        this.listPayment = res.data;
      },
      (error) => {
        this.toastr.error("Lấy không thành công lịch sử")
      }
    );
  }

  handlePayment(paymentId : any) {
    this.authService.deletePayment(paymentId).subscribe(
      (res: any) => {
        this.listPayment = res.data;
      },
      (error) => {
        this.toastr.error("Xóa không thành công")
      }
    );
  }
}
