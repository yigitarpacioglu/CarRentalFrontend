import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Car } from '../models/entities/car';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


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

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+"cars/GetCarDetailsByBrandId?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+"cars/GetCarDetailsByColorId?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }  
  getCarDetailsById(carId:number):Observable<SingleResponseModel<Car>>{
    let path = this.apiUrl+"cars/getCarDetailsById?id="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(path);
  }
  getCarDetailsByBrandAndColor(brandId:number, colorId: number):Observable<ListResponseModel<Car>>{
    let path = this.apiUrl+`cars/GetCarDetailsByBrandAndColorId?brandId=${brandId}&colorid=${colorId}`
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
}

