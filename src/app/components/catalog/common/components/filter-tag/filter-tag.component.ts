import {Component, Input, OnInit} from '@angular/core';
import {FiltersService} from "../../../../filters/filters.service";
import {CatalogComponent} from "../../../catalog.component";
import {FiltersComponent} from "../../../../filters/filters.component";

@Component({
  selector: 'app-filter-tag',
  templateUrl: './filter-tag.component.html'
})

export class FilterTagComponent implements OnInit {
  @Input() category! : string;
  @Input() initialFilter! : string;
  processedFilter! : string;
  tagTitle! : string | undefined;

  constructor(public filterService : FiltersService, public catalogComponent : CatalogComponent) {
  }

  ngOnInit() {
    let isPriceFilter : boolean = this.initialFilter.includes("lowerpricelimit");

    if (isPriceFilter) {
      this.tagTitle = 'Price';
      let values = this.extractNumbers(this.initialFilter);
      this.processedFilter = 'From ' + values[0] + ' to ' + values[1] + ' $USD';
      return;
    }

    this.processedFilter = this.initialFilter.slice(this.initialFilter.indexOf('=') + 1);

    let value = this.initialFilter.split('=')[0];

    this.tagTitle = this.findKeyByValue(value, this.filterService.apiVariableNameMaps);

    if (this.tagTitle == 'Brands') {
      this.tagTitle = 'Brand';
    }

    console.log(this.tagTitle)
  }

  private extractNumbers(inputString: string): number[] {
    const matches = inputString.match(/\d+/g);

    return matches ? matches.map(Number) : [];
  }

  private findKeyByValue = (value: string, obj: { [key: string]: string }): string | undefined => {
    for (const key in obj) {
      if (obj[key] === value) {
        return key;
      }
    }
    return undefined;
  };

  removeFilter(): void {
    const index = this.filterService.selectedFilters.findIndex(
      filter => filter.includes(this.initialFilter));

    if (index !== -1) {
      this.filterService.selectedFilters.splice(index, 1);
    }

    let filters : FiltersComponent = new FiltersComponent(this.filterService);

    filters.updateFilters(this.category);

    this.catalogComponent.updateCatalog();
  }
}
