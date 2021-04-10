import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key:string){
    return localStorage.getItem(key);
  }
  set(key:string, data:any){
    localStorage.setItem(key,data)
  }
  remove(key:string){
    localStorage.removeItem(key)
  }
  clear(){
    localStorage.clear    
  }

}
