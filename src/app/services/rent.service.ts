import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/entities/rentOrder/payment';
import { Rental } from '../models/entities/rentOrder/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  apiUrl='https://localhost:44327/api/'
  constructor(private httpClient:HttpClient) { }

  pay(rental:Rental,payment:Payment):Observable<ResponseModel>{
    let path = this.apiUrl+"rentals/payment"
    rental.returnDate=undefined;    
    return this.httpClient.post<ResponseModel>(path,{rental:rental,payment:payment});
  }
  
}
