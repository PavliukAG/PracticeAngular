import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseURL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService { // productHTTPService

  constructor(private http: HttpClient) { }
  readonly ProductApiURL = '/Product';

  getProducts(config) {
    let params = new HttpParams().set("pageSize", config.pageSize)
    .set("sortOrder", config.sortOrder)
    // .set("pageNumber", config.pageNumber);

    // if (params.get('pageNumber') === undefined)
    // params.delete('pageNumber');
    
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
