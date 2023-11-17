import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FiltersService} from "./filters.service";
import {FilterSpecification} from "./common/models/filter-specification";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() category! : string;
  @Input() isMobileVersion : boolean = false;
  selectedFilters : string[] = [];
  protected readonly Object = Object;

  constructor(public filtersService : FiltersService) {
  }

  ngOnDestroy(): void {
    if (!this.isMobileVersion) {
      this.filtersService.selectedFilters = [];
    }
  }

  ngOnInit(): void {
    this.updateFilters();
  }

  updateFilters(category : string = this.category): void {
    this.filtersService.getRelatedFilters(category).subscribe({
      next: value => {
        this.filtersService.filterSpecs = this.processSpecifications(value.countedSpecifications);
        this.filtersService.filterBrands = value.countedBrands;
        this.filtersService.filterCategories = value.countedCategories;
        this.filtersService.minimalPrice = (this.filtersService.minimalPrice !== undefined
          && !isNaN(this.filtersService.minimalPrice))
          ? this.filtersService.minimalPrice : value.minPrice;
        this.filtersService.maximumPrice = (this.filtersService.maximumPrice !== undefined
          && !isNaN(this.filtersService.maximumPrice))
          ? this.filtersService.maximumPrice : value.maxPrice;
        this.filtersService.totalItemsQuantity = value.totalItemsQuantity;
        this.filtersService.currentPageItemsQuantity = value.currentPageItemsQuantity;
        this.filtersService.pageIndex = value.pageIndex;
      },
      error: err => console.log(err)
    });
  }

  private processSpecifications(specs: { [key: string]: number }): FilterSpecification {
    const processedSpecs: FilterSpecification = {};

    Object.keys(specs).sort().forEach((specKey) => {
      const [category, attribute, value] = specKey
        .replace('Category:', '')
        .replace('Attribute:', '')
        .replace('Value:', '')
        .split('|');

      if (!processedSpecs[category]) {
        processedSpecs[category] = {};
      }

      if (!processedSpecs[category][attribute]) {
        processedSpecs[category][attribute] = {};
      }

      processedSpecs[category][attribute][value] = specs[specKey];
    });

    return processedSpecs;
  }
}
