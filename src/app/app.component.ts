import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GeneralizedProduct} from "./modules/shared/models/generalized-product";
import {BasketService} from "./components/features/basket/basket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'BuyIt.UI';
  items : GeneralizedProduct[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    const basketId = localStorage.getItem('basketId');

    if (basketId) {
      this.basketService.getBasket(basketId);
    }
  }
}
