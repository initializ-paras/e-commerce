import {GeneralizedProduct} from "./generalized-product";

export interface Product extends GeneralizedProduct{
  description: string;
  specifications: {
    [key: string]: {
      [key: string]: string;
    };
  };
}
