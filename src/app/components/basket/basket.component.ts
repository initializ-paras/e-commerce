import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {basketModalBackgroundAnimation, basketModalWindowAnimation} from "./basket.animations";
import {NavigationBarService} from "../navigation-bar/common/services/navigation-bar.service";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  animations: [basketModalWindowAnimation, basketModalBackgroundAnimation]
})

export class BasketComponent implements OnInit {
  isBasketOpen: boolean = false;

  constructor(private navigationBarService: NavigationBarService) {
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
