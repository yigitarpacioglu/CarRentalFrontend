import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Customer } from '../models/entities/customerOps/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl='https://localhost:44327/api/'
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let path = this.apiUrl+'customers/GetCustomerDetails'
    return this.httpClient.get<ListResponseModel<Customer>>(path);
  }
  updateBalance(customer:Customer,cash:number ):Observable<ResponseModel>{   
    let path=this.apiUrl+'customers/updatebalance'
    console.log(typeof(cash))    
    return  this.httpClient.post<ResponseModel>(path,{cash:cash,customer:customer})
  }
  getCustomerById(id:number):Observable<SingleResponseModel<Customer>>{
    let path =this.apiUrl+'customers/GetCustomerDetailsById?id='+id;
    
    return this.httpClient.get<SingleResponseModel<Customer>>(path);
  }
}
