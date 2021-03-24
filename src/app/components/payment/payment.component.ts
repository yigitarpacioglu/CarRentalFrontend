import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/entities/car';
import { Customer } from 'src/app/models/entities/customerOps/customer';
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

  rental:Rental;
  carDetails:Car;
  payment:Payment={customerId:0,amount:0 };
  dateRent:Date;
  dateReturn:Date;
  customerToUpdate:Customer;
  cashAmount:number=0;  

  constructor(private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private router:Router,
    private rentService:RentService,
    private customerService:CustomerService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
        this.getCarDetail();
        this.getCustomer();
      }
    })
  }

  getCarDetail(){
    this.carService.getCarDetailsById(this.rental.carId).subscribe((response)=>{
      this.carDetails=response.data;
      this.calculateTotalAmount();
    })
  }
  
  getCustomer(){
    this.customerService.getCustomerById(this.rental.customerId).subscribe((response)=>{
      this.customerToUpdate=response.data;
    })
  } 

  balanceUpdate(){
    console.log(this.cashAmount)
    this.customerService.updateBalance(this.customerToUpdate,this.cashAmount).subscribe(response=>{this.router.navigate([this.activatedRoute])})
  }

  calculateTotalAmount(){
    if(this.rental.returnDate != null ){
      this.dateRent = new Date(this.rental.rentDate.toString());
      this.dateReturn = new Date(this.rental.returnDate.toString());
      var difference = this.dateReturn.getTime() - this.dateRent.getTime();    
    var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24)); 
    
    this.payment.amount = numberOfDays * this.carDetails.dailyPrice;
    this.payment.customerId=this.rental.customerId;    
    if(this.payment.amount <= 0){
      this.router.navigate(['/cars']);
      // error
    }
    }
  }  
  pay(){  
    //console.log(this.rental)  
    //console.log(this.payment)  
    this.rentService.pay(this.rental,this.payment).subscribe(response => {
    this.router.navigate(['/cars']);    
    })   
  }
  

  
   
}

