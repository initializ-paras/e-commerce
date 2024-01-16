import {Component, OnInit} from '@angular/core';
import {basketModalBackgroundAnimation, basketModalWindowAnimation} from "./basket.animations";
import {NavigationBarService} from "../../navigation-bar/common/services/navigation-bar.service";
import {BasketService} from "./basket.service";
import {ProductCategoryMultiplierService} from "../../../modules/shared/services/product-category-multiplier-service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  animations: [basketModalWindowAnimation, basketModalBackgroundAnimation]
})

export class BasketComponent implements OnInit {
  isBasketOpen: boolean = false;

  constructor(private navigationBarService: NavigationBarService, public basketService: BasketService,
              public productCategoryMultiplierService: ProductCategoryMultiplierService ) {
  }

  ngOnInit(): void {
    this.navigationBarService.isBasketOpen$.subscribe((isOpen) => {
      this.isBasketOpen = isOpen;
    });
  }

  toggleBasket() {
    this.navigationBarService.toggleFeature(this.navigationBarService.isBasketOpenSubject);
  }
}
