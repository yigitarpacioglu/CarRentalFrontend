import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/entities/carDto';
import { Payment } from 'src/app/models/entities/rentOrder/payment';
import { Rental } from 'src/app/models/entities/rentOrder/rental';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentService } from 'src/app/services/rent.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  chosenCar:CarDto
  amount:number
  userId=Number(this.localStorageService.get('userId'))
  
  rental:Rental;
  paymentForm:FormGroup;
  payment:Payment={creditCard:{   
    userId:0,
    cardNumber:"",
    firstName:"",
    lastName:"",
    expirationDate:"",
    cvc:"",
    balance:0},amount:0 };
  

  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private carService:CarService,
    private router:Router,
    private rentService:RentService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
        this.createPaymentForm();
        this.getCarDetails();
        this.calculateAmount();
      }
    })   

  }  
  createPaymentForm(){
    this.paymentForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cvc:["",Validators.required],
    });
  }
  payRental(){
    if(this.paymentForm.valid){      
      this.payment = Object.assign({creditCard:{
        userId:this.userId,
        cardNumber:this.paymentForm.value.cardNumber,
        firstName:this.paymentForm.value.firstName,
        lastName:this.paymentForm.value.lastName,
        expirationDate:this.paymentForm.value.expirationDate,
        cvc:this.paymentForm.value.cvc
      },amount:this.amount})      
      this.rentService.pay(this.rental,this.payment).subscribe( response=>{
        this.toastrService.success(response.message,"Success")
        this.addFindexPoint();
        this.router.navigate(['/cars']);
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Payment Error")
      })    
    }
  }
  getCarDetails() {
    this.carService.getCarDetailsById(this.rental.carId).subscribe((response) => {
      this.chosenCar = response.data;
      this.calculateAmount();
    });
  }
  calculateAmount(){
    if(this.rental.returnDate != null ){
      var date2 = new Date(this.rental.returnDate.toString());
      var date1 = new Date(this.rental.rentDate.toString());
      var difference = date2.getTime() - date1.getTime();    
    var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24)); 
    
    this.amount = numberOfDays * this.chosenCar.dailyPrice;

    }
  } 
  addFindexPoint() {
    this.userService.findexOps(this.userId,this.rental.carId)
      .subscribe(response => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.info(responseError.error.message);
        }
      );
  }

}