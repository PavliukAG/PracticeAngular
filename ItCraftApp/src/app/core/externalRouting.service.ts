import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExternalRoutingService {

  constructor(private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:54374/api';

  getProducts(){
    return this.http.get(`${this.BaseURL}/Product`);
  }

  addProduct(formData) {
    // alert(`Was added product: \nName: ${formData.name}\nPrice: ${formData.price}`)
    return this.http.post(`${this.BaseURL}/Product`, formData);
  }

  removeProduct(id) {
    return this.http.delete(`${this.BaseURL}/Product/${Number(id)}`);
  }

}
