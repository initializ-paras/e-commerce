import {PricedProductListItem} from "./priced-product-list-item";

export interface BasketItem extends PricedProductListItem{
  quantity: number,
}
