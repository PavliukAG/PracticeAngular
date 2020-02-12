import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from './config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService { // productHTTPService

  constructor(private http: HttpClient) { }
  readonly ProductApiURL = '/Product';

  getProducts() {
    return this.http.get(`${BaseURL}${this.ProductApiURL}`);
  }

  addProduct(model) {
    return this.http.post(`${BaseURL}${this.ProductApiURL}`, model);
  }

  updateProduct(model) {
    return this.http.put(`${BaseURL}${this.ProductApiURL}`, model);
  }

  removeProduct(id) {
    return this.http.delete(`${BaseURL}${this.ProductApiURL}/${id}`);
  }

}
