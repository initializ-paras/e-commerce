export interface Pagination<T> {
  pageIndex: number;
  totalItemsQuantity: number;
  currentPageItemsQuantity: number;
  items: T;
}
