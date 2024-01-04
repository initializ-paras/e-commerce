import {Component, Input, OnInit} from '@angular/core';
import {FiltersService} from "./filters.service";
import {FilterSpecification} from "./common/models/filter-specification";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Input() category! : string;
  protected readonly Object = Object;

  constructor(public filtersService : FiltersService, private route: ActivatedRoute) {
  }

  private checkAndClearFilters(category: string): void {
    console.log(category)
    if (category && category !== this.filtersService.filterCategory) {
      this.filtersService.selectedFilters = [];
      this.filtersService.filterCategory = category;
    }
  }

  updateFilters(category : string = this.category): void {
    this.route.paramMap.subscribe( paramMap => {
      let extractedCategory: string = paramMap.get('category')!;
      this.checkAndClearFilters(extractedCategory);
    })
    this.filtersService.getRelatedFilters(category).subscribe({
      next: value => {
        this.filtersService.filterSpecs = this.processSpecifications(value.countedSpecifications);
        this.filtersService.filterBrands = value.countedBrands;
        this.filtersService.filterCategories = value.countedCategories;
        this.filtersService.minimalPrice = value.minPrice;
        this.filtersService.maximumPrice = value.maxPrice;
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
