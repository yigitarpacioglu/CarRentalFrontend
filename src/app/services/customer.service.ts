import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Customer } from '../models/entities/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl='https://localhost:44327/api/'
  constructor(private httpClient:HttpClient) { }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let path =this.apiUrl+'customers/getbyuserid?userid='+userId;    
    return this.httpClient.get<SingleResponseModel<Customer>>(path);
  }
  add(customer:Customer):Observable<ResponseModel>{    
    return this.httpClient.post<ResponseModel>(this.apiUrl+"customers/add",customer) 
  }
}
