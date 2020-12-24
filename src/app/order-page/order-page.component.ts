import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})

export class OrderPageComponent implements OnInit {
  public pageTitle: string;


  ngOnInit() {
    this.pageTitle = "Order"
  }
}
