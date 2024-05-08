import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-createLoan',
  templateUrl: './createLoan.component.html',
  styleUrl: './createLoan.component.css'
})

export class CreateLoanComponent implements OnInit {
  customerId: any;
  customerInfo : any
  loanAmount: any;
  loanTerm: any;
  interestRate: any;
  displayDialog: boolean = false;
  constructor(
    private route : ActivatedRoute,
    private authService : AuthService,
    private toastr : ToastrService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.url[1].path;
    this.authService.getInformationCustomer(this.customerId).subscribe(
      (res: any) => {
        this.customerInfo = res.data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  submitLoan() {
    if (!this.loanAmount || !this.loanTerm) {
      if(!this.loanAmount) {
        this.toastr.error("Mời nhập số tiền vay !");
      }
      if(!this.loanTerm) {
        this.toastr.error("Mời chọn kỳ hạn vay!");
      }
      return
    }
    if(this.loanAmount && this.loanAmount < 10000000) {
      this.toastr.warning("Số tiền vay không thể ít hơn 10 triệu!")
      return;
    }
    if(this.loanAmount && this.loanAmount > 2000000000) {
      this.toastr.warning("Số tiền vay không thể nhiều hơn 2 tỉ!")
      return;
    }
    const incomeProofChecked: boolean = (document.getElementById('incomeProof') as HTMLInputElement).checked;
    const collateralChecked: boolean = (document.getElementById('collateral') as HTMLInputElement).checked;
    if (incomeProofChecked && collateralChecked) {
      var body = {
        customer_id : this.customerId,
        amount : this.loanAmount,
        loan_term : this.loanTerm,
        interest_rate : this.interestRate,
        has_salary_table : 1,
        has_salary_statement : 1,
        has_collateral : 1,
        start_date : new Date()
      }
      this.authService.createLoan(body).subscribe(
        (res: any) => {
          this.toastr.success("Tạo khoản vay thành công!");
          this.displayDialog = true; // Hiển thị dialog khi tạo khoản vay thành công
          this.loanTerm = null;
          this.loanAmount = null;
          this.interestRate = null;
        },
        (error) => {
          this.toastr.error(error.message);
        }
      );
    } else {
      this.toastr.warning("Kiểm tra đã nhận đủ tài liệu vay chưa !");
    }
  }
  // validateLoanAmount(event: any) {
  //   let inputValue: string = event.target.value;
  //   const pattern = /^[0-9]*$/;
  //   if (!pattern.test(inputValue)) {
  //     inputValue = inputValue.slice(0, -1);
  //     event.target.value = inputValue;
  //   }
  // }



  calculateInterestRate() {
    if(this.loanTerm == 3) {
      this.interestRate = 6.5
    } else if(this.loanTerm == 6) {
      this.interestRate = 6.5
    } else if(this.loanTerm == 9) {
      this.interestRate = 6.5
    } else if(this.loanTerm == 12) {
      this.interestRate = 6.5
    }
  }
  continueCreating() {
    this.displayDialog = false; // Ẩn dialog
  }

  goBack() {
    this.displayDialog = false; // Ẩn dialog
    this.router.navigate(['/searchLoan/']);
  }
}
