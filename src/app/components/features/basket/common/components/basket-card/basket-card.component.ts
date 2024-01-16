import {Component, Input} from '@angular/core';
import {BasketService} from "../../../basket.service";
import {
  ProductCategoryMultiplierService
} from "../../../../../../modules/shared/services/product-category-multiplier-service";
import {BasketItem} from "../../../../common/models/basket-item";
import {NavigationBarService} from "../../../../../navigation-bar/common/services/navigation-bar.service";

@Component({
  selector: 'app-basket-card',
  templateUrl: './basket-card.component.html'
})
export class BasketCardComponent {
  @Input() item!: BasketItem;

  constructor(public basketService: BasketService, public navBarService: NavigationBarService,
              public productCategoryMultiplierService: ProductCategoryMultiplierService) {
  }

  changeItemQuantity(isAddition: boolean) {
    if (isAddition && this.item.quantity == 999) return;
    else if(isAddition) {
      this.item.quantity += 1;
    }

    if (!isAddition && this.item.quantity == 1) return;
    else if(!isAddition) {
      this.item.quantity -= 1;
    }

    let updatedItemIndex = this.basketService.getBasketValue()!.items.findIndex(
      i => i.productCode == this.item.productCode);

    let updatedBasket = this.basketService.getBasketValue()!;

    updatedBasket.items[updatedItemIndex] = this.item;

    this.basketService.setBasket(updatedBasket);
  }

  removeItemFromBasket() {
    let updatedBasket = this.basketService.getBasketValue()!;

    updatedBasket!.items = updatedBasket!.items.filter(obj => obj.productCode != this.item.productCode);

    this.basketService.setBasket(updatedBasket)
  }
}
