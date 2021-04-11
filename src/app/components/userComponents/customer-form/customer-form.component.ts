import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/entities/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer;
  carId:number;

  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private customerService : CustomerService,
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId']
    })
    this.createCustomerForm();

  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }
  saveCustomerDetails() {
    let uId = Number(this.localStorageService.get('userId'));
    this.customer = {
      userId: uId,
      companyName: this.customerForm.value.companyName,
    };
    this.customerService.add(this.customer)
    this.router.navigate(['/cars/details/'+this.carId])
    
  }
}
