import {ProductListItem} from "./product-list-item";

export interface ComparedItem extends ProductListItem{
  specifications: { [key: string]: { [key: string]: string } };
}
