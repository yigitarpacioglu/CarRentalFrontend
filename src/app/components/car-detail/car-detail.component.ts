import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/entities/carDto';
import { CarImage } from 'src/app/models/entities/carImage';
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
  car:CarDto;
  constructor(private carImageService:CarImageService, private activatedRoute:ActivatedRoute,private carService:CarService, private toastrService:ToastrService) { }

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
      this.car=response.data;
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
  rentOnClick(){
    this.toastrService.info("Please select proper customer, pickup and drop off dates.")
  }

}
