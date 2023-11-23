import {Component, Input} from '@angular/core';
import {FilterBaseElement} from "../../models/filter-base-element";
import {accordionAnimation} from "../../animations/accordion.animations";
import {FiltersService} from "../../../filters.service";
import {FiltersComponent} from "../../../filters.component";
import {CatalogComponent} from "../../../../catalog/catalog.component";

@Component({
  selector: 'app-basic-accordion',
  templateUrl: './basic-accordion.component.html',
  animations: [accordionAnimation]
})

export class BasicAccordionComponent {
  @Input() filterData: FilterBaseElement = {};
  @Input() dropdownTitle: string = '';
  @Input() isOpen: boolean = true;

  constructor(public filterService: FiltersService, public filterComponent : FiltersComponent,
              public catalogComponent : CatalogComponent) {
  }

  selectFilterOption(item: string, event: any) {
    let value = item;
    const filterKey = this.filterService.apiVariableNameMaps[this.dropdownTitle];

    const filterString = `${filterKey}=${value}`;

    if (event.target.checked) {
      this.filterService.selectedFilters.push(filterString);
    } else {
      const index = this.filterService.selectedFilters.findIndex(filter => filter.includes(filterString));
      if (index !== -1) {
        this.filterService.selectedFilters.splice(index, 1);
      }
    }

    this.catalogComponent.currentPageIndex = 1;

    this.filterComponent.updateFilters();
    this.catalogComponent.updateCatalog();
  }

  isPresentInFilterList(item: string) : boolean {
    let value = item;
    const filterKey = this.filterService.apiVariableNameMaps[this.dropdownTitle];

    const filterString = `${filterKey}=${value}`;

    const index = this.filterService.selectedFilters.findIndex(filter => filter.includes(filterString));

    return index !== -1;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  protected readonly Object = Object;
}
