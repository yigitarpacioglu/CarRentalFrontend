import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/entities/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44327/api/';
  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let path=this.apiUrl+"colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(path);
  }
  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let path = this.apiUrl+"colors/getbyid?id="+colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(path);
  }
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color) 
  }
  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/update",color);
  }
}
