import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/entities/user';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44327/api/users/"
  constructor(private httpClient:HttpClient) { }

  getById(id: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserByEmail(email: string | null): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  update(user:User):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
  findexOps(userId:number, carId:number):Observable<ResponseModel>{
    let newPath = this.apiUrl + `findexadd?userId=${userId}&colorid=${carId}`
    return this.httpClient.post<ResponseModel>(newPath,{userId,carId})
  }
}
