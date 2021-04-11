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
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/payment",{
      rental:rental,
      payment:payment
    });
  }
  
}
