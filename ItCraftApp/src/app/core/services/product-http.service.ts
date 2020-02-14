import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseURL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService { // productHTTPService

  constructor(private http: HttpClient) { }
  readonly ProductApiURL = '/Product';

  getProducts(config : {pageSize:number, sortOrder:number, pageNumber:number}) {
    let params;
    if (config.pageNumber != null) {
      params = new HttpParams().set("pageSize", String(config.pageSize)).set("sortOrder", String(config.sortOrder)).set('pageNumber', String(config.pageNumber));
    } else {
      params = new HttpParams().set("pageSize", String(config.pageSize)).set("sortOrder", String(config.sortOrder));
    }
    
    return this.http.get<any>(`${BaseURL}${this.ProductApiURL}`, {params, observe:'response'});
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
