import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {BehaviorSubject} from "rxjs";
import {ProductList} from "../common/models/product-list";
import {BasketItem} from "../common/models/basket-item";
import {HttpClient} from "@angular/common/http";
import {GeneralizedProduct} from "../../../modules/shared/models/generalized-product";
import {Product} from "../../../modules/shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl: string = environment.apiUrl;
  basketSource: BehaviorSubject<ProductList<BasketItem>| null> =
    new BehaviorSubject<ProductList<BasketItem> | null>(null);
  basketSource$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get<ProductList<BasketItem>>(this.baseUrl + "basket/?listid=" + id)
      .subscribe({
      next: basket => this.basketSource.next(basket)
    });
  }

  setBasket(basket: ProductList<BasketItem>) {
    return this.http.post<ProductList<BasketItem>>(this.baseUrl + "basket/createorupdate", basket)
      .subscribe({
        next: basket => this.basketSource.next(basket)
      });
  }

  getBasketValue() {
    return this.basketSource.value;
  }

  getBasketBadgeCount(items: BasketItem[] | undefined): string {
    if (!items) return '0';

    let result: number = items.reduce((totalItemsQuantity, item) =>
      totalItemsQuantity + item.quantity, 0);

    if (result > 9) return '9+';

    return result.toString();
  }

  getItemsCount(items: BasketItem[] | undefined): number {
    if (!items) return 0;

    return items.reduce((totalItemsQuantity, item) =>
      totalItemsQuantity + item.quantity, 0);
  }

  addItemToBasket(item: GeneralizedProduct | Product, quantity = 1) {
    const addedItem = this.mapProductToBasketItem(item);
    const basket = this.getBasketValue() ?? this.createNewBasket();
    basket.items = this.addOrUpdateItem(basket.items, addedItem, quantity);
    this.setBasket(basket);
  }

  private mapProductToBasketItem(product: GeneralizedProduct | Product): BasketItem {
    return {
      name: product.name,
      category: product.category,
      price: product.price,
      productCode: product.productCode,
      imageUrl: product.images[0],
      quantity: 0
    }
  }

  private createNewBasket(): ProductList<BasketItem> {
    const basket = new ProductList<BasketItem>();
    localStorage.setItem('basketId', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: BasketItem[], addedItem: BasketItem, quantity: number) {
    const searchedItem = items.find(i => i.productCode == addedItem.productCode)

    if (searchedItem) {
      searchedItem.quantity += quantity;
    }
    else {
      addedItem.quantity = quantity;
      items.push(addedItem);
    }

    return items;
  }
}
