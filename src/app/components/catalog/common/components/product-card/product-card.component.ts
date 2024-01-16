import {Component, Input, OnInit} from '@angular/core';
import {GeneralizedProduct} from "../../../../../modules/shared/models/generalized-product";
import {BasketService} from "../../../../features/basket/basket.service";
import {BehaviorSubject} from "rxjs";
import {
  ProductCategoryMultiplierService
} from "../../../../../modules/shared/services/product-category-multiplier-service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})

export class ProductCardComponent implements OnInit {
  @Input() product!: GeneralizedProduct;
  isAddedToBasket$!: BehaviorSubject<boolean>;

  constructor(private basketService: BasketService,
              public productCategoryMultiplierService: ProductCategoryMultiplierService) {
  }

  ngOnInit(): void {
    this.isAddedToBasket$ = this.basketService.isAddedToBasket$(this.product.productCode);

    if (this.basketService.getBasketValue()?.items.find
    (i => i.productCode == this.product.productCode)) {
      this.basketService.setAddedToBasketStatus(this.product.productCode, true);
    }
  }

  addToBasket() {
    this.basketService.addItemToBasket(this.product);
    this.basketService.setAddedToBasketStatus(this.product.productCode, true);
  }
}
