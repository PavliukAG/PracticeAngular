import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  public removeToken() {
    localStorage.removeItem('token');
  }
  
}