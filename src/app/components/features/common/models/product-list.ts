import {ProductListItem} from "./product-list-item";
import {Guid} from "guid-typescript";

export interface ProductList<TItem> {
  id: string,
  items: TItem[]
}

export class ProductList<TItem> implements ProductList<TItem>{
  id: string = Guid.create().toString();
  items: TItem[] = [];
}
