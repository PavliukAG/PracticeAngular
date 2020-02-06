import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/core/userProfile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  constructor(private service: UserProfileService, private toastr: ToastrService) {
    for (let i = 0; i < 100; i++) {
      // this.items.push(generateProducts(i));
    }
  }

  items;

  ngOnInit() {
    this.service.getProducts().subscribe(
      res => {
        this.items = res;
      },
      err => {
        console.log(err);
      });
  }

  public range(n: number, startFrom: number): number[] {
    var foo = [];
    for (var i = startFrom; i <= n; i++) {
      foo.push(i);
    }
    return foo;
  }

  pageNumber: number = 1;
  pageSize: number = 5;

  public getSegmentOfList() {
    let start : number = (this.pageNumber-1) * this.pageSize;
    let end : number = Number(start) + Number(this.pageSize); 
    return this.items.slice(start,end);
  }

  public nextPage() {
    let limit = this.getPageLimit()
    this.pageNumber += this.pageNumber < limit ? 1 : 0;
    if (this.pageNumber > limit) this.pageNumber = limit;
  }

  public prevPage() {
    this.pageNumber -= this.pageNumber > 1 ? 1 : 0;
  }

  public getPagesCount() {
    return Math.ceil(this.items.length / this.pageSize);
  }

  // checks out of page limits
  public checkPages() {
    this.pageNumber = 1;
    
  }

  private getPageLimit() {
    return Math.ceil(this.items.length / this.pageSize);
  }

}
