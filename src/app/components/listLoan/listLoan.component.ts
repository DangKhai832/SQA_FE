import { Component, OnInit } from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-listLoan',
  templateUrl: './listLoan.component.html',
  styleUrls: [
    './listLoan.component.css'
  ]
})

export class ListLoanComponent implements OnInit {
  customerId: any;
  customerInfo : any
  listLoan : any

  constructor(
    private authService: AuthService,
    private router : ActivatedRoute,
    private toastr : ToastrService,
    private routerLink : Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.router.snapshot.url[1].path;
    this.authService.getInformationCustomer(this.customerId).subscribe(
      (res: any) => {
        this.customerInfo = res.data;
      },
      (error) => {
        this.toastr.error("Lấy không thành công dữ liệu cá nhân")
      }
    );
    this.authService.getListLoan(this.customerId).subscribe(
      (res: any) => {
        if(res.data.length != 0) {
          this.listLoan = res.data;
        } else {
          this.toastr.error("Không có khoản vay nào của tài khoản này! Vui lòng tìm lại!")
          this.routerLink.navigate(['/loanPayment']);
        }
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );

  }

  openHandleLoan(id : any) {
    this.routerLink.navigate(['/handleLoan/', id]);
  }
}
