import {Component, Input, OnInit} from '@angular/core';
import {GeneralizedProduct} from "../../../../../modules/shared/models/generalized-product";
import {BasketService} from "../../../../features/basket/basket.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})

export class ProductCardComponent implements OnInit {
  @Input() product!: GeneralizedProduct;
  isAddedToBasket$ = new BehaviorSubject<boolean>(false);

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
    if (this.basketService.getBasketValue()?.items.find
    (i => i.productCode == this.product.productCode)) {
      this.isAddedToBasket$.next(true);
    }
  }

  getProductUrlCategory() : string {
    return this.pluralizeWord(
      this.product.category.toLowerCase().replaceAll(' ', '_'));
  }

  pluralizeWord(word: string): string {
    const pluralRules: [RegExp, string][] = [
      [/s$/, 's'],
      [/(ch|sh|ss|x)$/, '$1es'],
      [/(ay|ey|oy|uy)$/, '$1s'],
      [/(y)$/, 'ies'],
    ];

    for (const [rule, replacement] of pluralRules) {
      if (rule.test(word)) {
        return word.replace(rule, replacement);
      }
    }

    return word + 's';
  }

  addToBasket() {
    this.basketService.addItemToBasket(this.product);
    this.isAddedToBasket$.next(true);
  }
}
