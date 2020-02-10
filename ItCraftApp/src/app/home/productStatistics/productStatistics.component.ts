import { Component, OnInit, Injectable, Input } from '@angular/core';

@Component({
  selector: 'app-productStatistics',
  templateUrl: './productStatistics.component.html',
  styleUrls: ['./productStatistics.component.css']
})

@Injectable()
export class ProductStatisticsComponent implements OnInit {

  @Input() item : string;

  constructor() { 
  }

  ngOnInit() {
  }

}
