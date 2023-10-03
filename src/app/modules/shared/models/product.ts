import {GeneralizedProduct} from "./generalized-product";

export interface Product extends GeneralizedProduct{
  shortDescription: string;
  specifications: {
    [key: string]: {
      [key: string]: string;
    };
  };
}
