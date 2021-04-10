import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/entities/authModels/loginModel';
import { RegisterModel } from '../models/entities/authModels/registerModel';
import { TokenModel } from '../models/entities/authModels/tokenModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44327/api/auth/"
  constructor(private httpClient:HttpClient) { }
  
  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
     return this.httpClient.post<SingleResponseModel<TokenModel>>(
       this.apiUrl + "login",loginModel);
  }
  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + "register",registerModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } 
    else {
      return false;
    }
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
  
  }




