import { Component } from '@angular/core';
import {NavigationBarService} from "./common/services/navigation-bar.service";
import {BasketService} from "../features/basket/basket.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html'
})

export class NavigationBarComponent{
  constructor(private navigationBarService: NavigationBarService, public basketService: BasketService) {}

  toggleSideBar() {
    this.navigationBarService.toggleFeature(this.navigationBarService.isMenuOpenSubject);
  }

  toggleBasket() {
    this.navigationBarService.toggleFeature(this.navigationBarService.isBasketOpenSubject);
  }
}
