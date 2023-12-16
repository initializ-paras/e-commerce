import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeneralizedProduct} from "./modules/shared/models/generalized-product";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BuyIt.UI';
  items : GeneralizedProduct[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
}
