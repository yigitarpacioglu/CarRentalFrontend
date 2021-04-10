import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/entities/user';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44327/api/users/"
  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email: string | null): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
