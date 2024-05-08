import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Sửa từ FormControl thành FormBuilder
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  repeatPass: string = 'none';
  public registerForm: FormGroup

  isAccountCreated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr : ToastrService,
    private authService : AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      identify: ['', Validators.required],
      tax_code: [''],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      currentAddress: ['', Validators.required],
      job: ['']
    });
  }


  ngOnInit(): void {
  }

  onSubmit() {
    const taxCodeControl = this.registerForm.get("tax_code");
    if((this.registerForm.get("email")?.dirty && this.registerForm.get("email")?.invalid) || taxCodeControl && taxCodeControl.value || this.registerForm.get("phone_number")?.dirty && this.registerForm.get("phone_number")?.invalid || this.registerForm.get("identify")?.dirty && this.registerForm.get("identify")?.invalid || this.registerForm.get("tax_code")?.dirty && this.registerForm.get("tax_code")?.invalid ) {
      let thongbao : boolean = false
      if(this.registerForm.get("email")?.dirty && this.registerForm.get("email")?.invalid) {
        this.toastr.error("Mời bạn nhập đúng định dạng email!");
        thongbao = true
      }
      if(this.registerForm.get("phone_number")?.dirty && this.registerForm.get("phone_number")?.invalid) {
        this.toastr.error("Mời bạn nhập đủ 10 số của điện thoại!");
        thongbao = true
      }
      if(this.registerForm.get("identify")?.dirty && this.registerForm.get("identify")?.invalid) {
        this.toastr.error("Mời bạn nhập đủ 12 số CCCD!");
        thongbao = true
      }
      debugger
      if (taxCodeControl && taxCodeControl.value) {
        const taxCodeValue = taxCodeControl.value.toString();
        if (taxCodeValue.length !== 10) {
          this.toastr.error("Mời bạn nhập đủ 10 số thuế!");
          thongbao = true
        }
      }
      debugger
     if(thongbao == true) {
       return
     }
    }
    if (this.registerForm.invalid) {
      this.toastr.error("Mời nhập hết cách trường bỏ trống!");
      return;
    }
    const body = this.registerForm.value;
    debugger

    this.authService.createCustomer(body).subscribe(
      (res: any) => {
        if (res.data) {
          this.toastr.success(res.message);
          this.resetFields();
        }
      },
      (error) => {
        if (typeof error.error.message === 'object') {
          for (let key in error.error.message) {
            this.toastr.error(error.error.message[key]);
          }
        } else {
          this.toastr.error(error.error.message);
        }
      }
    );
  }

  resetFields() {
    this.registerForm.reset({
      name: '',
      phone_number: '',
      gender: '',
      dob: '',
      address: '',
      identify: '',
      tax_code: '',
      email: '',
      city: '',
      province: '',
      district: '',
      currentAddress: '',
      job: ''
    });
  }

}
