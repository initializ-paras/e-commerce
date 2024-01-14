import {ProductListItem} from "./product-list-item";

export interface PricedProductListItem extends ProductListItem{
  price: number,
}
