import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ExternalRoutingService } from '../core/externalRouting.service';
import { UserProfileService } from '../core/userProfile.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //* Variables ----------------------------------------------------
  userDetails;
  public products;
  currentItem;
  //* Methods -------------------------------------------------------
  constructor(private router: Router, private userService: UserProfileService, private dataService: ExternalRoutingService) { }


  ngOnInit() {
    this.initProducts();
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      });
      // this.generateHardcodeProduct();
  }

  // // ! This method for testing without backend
  // generateHardcodeProduct() {
  //   this.products = []
  //   for (let i = 0; i < 16; i++) {
  //     let model = {
  //       name: `Product${i}`,
  //       price: Math.round((Math.random() * 1000) * 100) / 100,
  //       productId: i,
  //       count: 0
  //     }
  //     this.products.push(model)
  //   }
  //   this.currentItem = this.products[this.products.length - 1];
  // }


  private delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

  public async initProducts() {
    await this.delay(150);

    this.dataService.getProducts().subscribe(
      res => {
        this.products = res;
        this.currentItem = this.products[this.products.length - 1];
      },
      err => {
        console.log(err);
      });
    }

  changeCurrentItem(item) {
    this.currentItem = item;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
