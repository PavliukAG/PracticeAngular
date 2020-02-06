import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExternalRoutingService {

  constructor(private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:54374/api';
  register(registrModelInfo) {
    return this.http.post( this.BaseURL + '/Auth/Register', registrModelInfo);
  }

  login(formData){
    return this.http.post( this.BaseURL + '/Auth/Login', formData);
  }

  addProduct(formData) {
    return this.http.post( this.BaseURL + '/Home/CreateProduct', formData);
  }
}
