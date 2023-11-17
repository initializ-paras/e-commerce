import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FiltersService } from "../../../../filters/filters.service";

@Injectable()
export class SortingService implements OnDestroy {
  constructor(
    private filtersService: FiltersService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedOption = "Rating";
      }
    });
  }

  sortingOptions: { [key: string]: string } = {
    'Rating': 'rating-desc',
    'Price (Ascending)': 'price-asc',
    'Price (Descending)': 'price-desc',
    'Title (Ascending)': 'name-asc',
    'Title (Descending)': 'name-desc'
  };

  selectedOption: string = "Rating";

  ngOnDestroy(): void {
    if (this.filtersService.selectedFilters.some(filter => filter.includes('sortingtype'))) {
      let replacedIndex = this.filtersService.selectedFilters.findIndex(
        item => item.includes("sortingtype"));

      this.filtersService.selectedFilters.splice(replacedIndex, 1);
    }
  }
}
