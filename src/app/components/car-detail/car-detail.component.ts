import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  basePath="https://localhost:44327";
  images:CarImage[];
  cars:Car[];
  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute,private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
      this.getCarImagesById(params["carId"]);
      this.getCarDetailsById(params["carId"]);
      }
    });
  }

  getCarImagesById(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.images=response.data;
    })
  }
  getCarDetailsById(carId:number){
    this.carService.getCarDetailsById(carId).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
  getBack() {
    this.carService.getCars();
  }

}
