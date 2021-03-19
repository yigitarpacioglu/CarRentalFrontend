import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }

  getCarsByBrand(brandName:string):Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+"cars/GetCarDetailsByBrandName?brandName="+brandName;
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
  getCarsByColor(colorName:string):Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+"cars/GetCarDetailsByColorName?colorName="+colorName;
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }  
  getCarDetailsById(carId:number):Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+"cars/getCarDetailsById?id="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
}

