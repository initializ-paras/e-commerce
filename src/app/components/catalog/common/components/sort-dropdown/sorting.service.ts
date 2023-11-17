import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SortingService {
  sortingOptions: { [key: string]: string } = {
    'Rating': 'rating-desc',
    'Price (Ascending)': 'price-asc',
    'Price (Descending)': 'price-desc',
    'Title (Ascending)': 'name-asc',
    'Title (Descending)': 'name-desc'
  };

  selectedOption: string = "Rating"
}
