import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseURL} from "../config/config";

@Injectable({
  providedIn: 'root'
})

export class UserProfileService {

  constructor(private http: HttpClient) { 

  }

  public getUserProfile(){
    return this.http.get(`${BaseURL}/UserProfile`);
  }
  
}