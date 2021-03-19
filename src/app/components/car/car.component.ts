import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[];
  basePath="https://localhost:44327/"
  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandName"]){
        this.getCarsByBrand(params["brandName"])
      }
      else if(params["colorName"]){
        this.getCarsByColor(params["colorName"])
      }
      else{
        this.getCars();
      }
    })

  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
    })
  }
  getCarsByBrand(brandName:string){
    this.carService.getCarsByBrand(brandName).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getCarsByColor(colorName:string){
    this.carService.getCarsByColor(colorName).subscribe(response=>{
      this.cars=response.data;
    })
  }  
}
