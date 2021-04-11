import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/entities/carDto';
import { Rental } from 'src/app/models/entities/rentOrder/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rentalSummary',
  templateUrl: './rentalSummary.component.html',
  styleUrls: ['./rentalSummary.component.css'],
})
export class RentalSummaryComponent implements OnInit {

  chosenCar: CarDto;
  rentDate: Date;
  returnDate: Date;
  amount:number = 0;  
  customerId:any;
  customerForm:FormGroup;
  userId=Number(this.localStorageService.get('userId'))
  userFindex:number;
  

  constructor(     
    private router: Router,
    private customerService: CustomerService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetails(params['carId']);
      this.getCustomerId();
    });
    
  }
  getCarDetails(id: number) {
    this.carService.getCarDetailsById(id).subscribe((response) => {
      this.chosenCar = response.data;
    });
  }
  initialDate(day: number) {
    var today = new Date();
    today.setDate(today.getDate() + day);
    return today.toISOString().slice(0, 10);
  } 

  goToPayment() {
    if(this.rentDate==undefined){
      this.toastrService.warning("Please select a pick-up date","Warning")
      this.router.navigate(['cars/details/{{carId}}'])
    }
    else{
      
        let rental:Rental = {
        customerId:this.customerId,
        carId:this.chosenCar.carId,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };
      
      this.router.navigate(['/payment/', JSON.stringify(rental)]);
    }
  }  
  calculateTotalAmount(){
    if(this.returnDate != null ){
      let date1 = new Date(this.rentDate.toString());
      let date2 = new Date(this.returnDate.toString());
      var difference = date2.getTime() - date1.getTime();    
    var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24))
    this.amount = numberOfDays * this.chosenCar.dailyPrice;

    }
  }  
  getCustomerId(){    
    this.customerService.getCustomerByUserId(this.userId).subscribe(response=>{this.customerId=response.data.id})
  }

  

}
