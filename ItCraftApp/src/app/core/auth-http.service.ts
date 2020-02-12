
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseURL} from "./config/config";

@Injectable({
  providedIn: 'root'
})

export class AuthHttpService {
  
  constructor(private http: HttpClient) { }
  
  readonly AuthApiURL = '/Auth';

  register(registrModelInfo) {
    return this.http.post(`${BaseURL}${this.AuthApiURL}/Register`, registrModelInfo);
  }

  login(model){
    return this.http.post(`${BaseURL}${this.AuthApiURL}/Login`, model);
  }
}