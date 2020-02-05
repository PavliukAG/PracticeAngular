import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
userDetails;
  constructor(private router: Router, private service: UserService) { }

  
  items = new Array(new Product("Samsung", 8000), new Product("Apple", 12000));

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res =>{
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    )
  }
onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
}
}
class Product {
  name : string;
  price : number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
