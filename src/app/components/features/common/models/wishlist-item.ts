import {ProductListItem} from "./product-list-item";

export interface WishListItem extends ProductListItem{
  inStock: string,
}
