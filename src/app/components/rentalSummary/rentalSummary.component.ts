import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/entities/carDto';
import { RentalSummary } from 'src/app/models/entities/rentalSummary';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-rentalSummary',
  templateUrl: './rentalSummary.component.html',
  styleUrls: ['./rentalSummary.component.css'],
})
export class RentalSummaryComponent implements OnInit {

  chosenCar: CarDto;
  rentDate: Date;
  returnDate: Date;
  date1:Date;
  date2:Date;
  amount:number = 0;
  summary:RentalSummary;
  

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetails(params['carId']);
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
      this.summary = {
        brand:this.chosenCar.brandName,
        model:this.chosenCar.description,
        color:this.chosenCar.colorName,
        dailyPrice:this.chosenCar.dailyPrice,
        totalPrice:this.amount,
        modelYear:this.chosenCar.modelYear,
        rentDate: this.rentDate,
        returnDate: this.returnDate,
      };
      this.router.navigate(['/payment/', JSON.stringify(this.summary)]);
    }
  }  
  calculateTotalAmount(){
    if(this.returnDate != null ){
      this.date1 = new Date(this.rentDate.toString());
      this.date2 = new Date(this.returnDate.toString());
      var difference = this.date2.getTime() - this.date1.getTime();    
    var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24)); 
    
    this.amount = numberOfDays * this.chosenCar.dailyPrice;

    }
  }  
}
