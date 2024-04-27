import { Component, OnInit } from "@angular/core";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-createLoan',
  templateUrl: './searchLoan.component.html',
  styleUrls: [
    './searchLoan.component.css'
  ]
})

export class SearchLoanComponent implements OnInit {
  customers: any[] = [];
  keySearch : any;
  selectedCustomer: any;
  displayDialog: boolean = false;


  constructor(private authService: AuthService,
              private router : Router) {}

  ngOnInit(): void {
    // Gọi API khi component được khởi tạo
    this.fetchCustomers();
  }

  fetchCustomers() {
    var key = this.keySearch ? this.keySearch : ""
    this.authService.searchCustomer(key).subscribe(
      (res: any) => { // Sửa kiểu dữ liệu thành any hoặc kiểu dữ liệu chính xác của đối tượng trả về từ API
        this.customers = res.data; // Gán phản hồi từ API vào biến customers
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  openPopupCreateLoan(id: number) {
    this.router.navigate(['/createLoan/', id]);
  }

  showCustomerDetails(key : any) {
    this.authService.detailCustomer(key).subscribe(
      (res: any) => {
        this.selectedCustomer = res.data;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
    this.displayDialog = true; // Mở dialog
  }
}
