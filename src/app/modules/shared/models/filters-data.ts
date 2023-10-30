export interface FiltersData {
  minPrice: number;
  maxPrice: number;
  countedBrands: { [key: string]: number };
  countedCategories: { [key: string]: number };
  countedAvailability: { [key: string]: number };
  countedSpecifications: { [key: string]: number };
}
