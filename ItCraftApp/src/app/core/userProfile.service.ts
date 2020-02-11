import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseURL} from "./config/config";

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile(){
    return this.http.get(`${BaseURL}/UserProfile`);
  }

  register(registrModelInfo) {
    return this.http.post(`${BaseURL}/Auth/Register`, registrModelInfo);
  }

  login(model){
    return this.http.post(`${BaseURL}/Auth/Login`, model);
  }
}
// / 2 sevices