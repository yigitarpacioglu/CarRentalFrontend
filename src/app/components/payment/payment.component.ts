import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/entities/carDto';
import { Customer } from 'src/app/models/entities/customerOps/customer';
import { RentalSummary } from 'src/app/models/entities/rentalSummary';
import { Payment } from 'src/app/models/entities/rentOrder/payment';
import { Rental } from 'src/app/models/entities/rentOrder/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentService } from 'src/app/services/rent.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  summary:RentalSummary;
  carDetails:CarDto;
  payment:Payment={creditCard:{   
    userId:2,
    cardNumber:"",
    firstName:"",
    lastName:"",
    expirationDate:"",
    cvc:"",
    balance:0},amount:0 };

  dateRent:Date;
  dateReturn:Date;
  customerToUpdate:Customer;
  cashAmount:number=0;  
  

  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private rentService:RentService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rentalSummary"]){
        this.summary = JSON.parse(params['rentalSummary']);
      }
    })
  }  
}