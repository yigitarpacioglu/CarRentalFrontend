import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../models/entities/carDto';
import { Car } from '../models/entities/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDto>>{
    let path = this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<CarDto>>(path);
  }
  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let path = this.apiUrl+"cars/getbyid?id="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(path);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDto>>{
    let path = this.apiUrl+"cars/GetCarDetailsByBrandId?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(path);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<CarDto>>{
    let path = this.apiUrl+"cars/GetCarDetailsByColorId?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(path);
  }  
  getCarDetailsById(carId:number):Observable<SingleResponseModel<CarDto>>{
    let path = this.apiUrl+"cars/getCarDetailsById?id="+carId;
    return this.httpClient.get<SingleResponseModel<CarDto>>(path);
  }
  getCarDetailsByBrandAndColor(brandId:number, colorId: number):Observable<ListResponseModel<CarDto>>{
    let path = this.apiUrl+`cars/GetCarDetailsByBrandAndColorId?brandId=${brandId}&colorid=${colorId}`
    return this.httpClient.get<ListResponseModel<CarDto>>(path);
  }
  add(car:Car):Observable<ResponseModel>{    
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car) 
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car);
  }
}

