import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseURL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class ExternalRoutingService {

  constructor(private http: HttpClient) { }
  readonly addURL = '/Product';


  getProducts() {
    return this.http.get(`${BaseURL}${this.addURL}`);
  }

  addProduct(formData) {
    return this.http.post(`${BaseURL}${this.addURL}`, formData);
  }

  removeProduct(id) {
    return this.http.delete(`${BaseURL}${this.addURL}/${Number(id)}`);
  }

}
