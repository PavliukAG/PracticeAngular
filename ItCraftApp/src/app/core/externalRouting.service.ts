import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './config/config';

@Injectable({
  providedIn: 'root'
})
export class ExternalRoutingService { // productHTTPService

  constructor(private http: HttpClient) { }
  readonly addURL = '/Product';

  getProducts() {
    return this.http.get(`${BaseURL}${this.addURL}`);
  }

  addProduct(formData) {
    return this.http.post(`${BaseURL}${this.addURL}`, formData);
  }

  updateProduct(formData) {
    return this.http.put(`${BaseURL}${this.addURL}`, formData);
  }

  removeProduct(id) {
    return this.http.delete(`${BaseURL}${this.addURL}/${id}`);
  }

}
