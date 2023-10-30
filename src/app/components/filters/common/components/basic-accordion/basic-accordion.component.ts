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
  @Input() selectedFilters: string[] = [];
  @Input() isOpen: boolean = true;

  constructor(public filterService: FiltersService, public filterComponent : FiltersComponent,
              public catalogComponent : CatalogComponent) {
  }

  selectFilterOption(item: string, event: any) {
    let value = item;
    const filterKey = this.filterService.apiVariableNameMaps[this.dropdownTitle];

    const filterString = `${filterKey}=${value}`;

    if (event.target.checked) {
      this.selectedFilters.push(filterString);
    } else {
      const index = this.selectedFilters.findIndex(filter => filter.includes(filterString));
      if (index !== -1) {
        this.selectedFilters.splice(index, 1);
      }
    }

    this.filterService.selectedFilters = this.selectedFilters;

    this.filterComponent.updateFilters();
    this.catalogComponent.updateCatalog();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  protected readonly Object = Object;
}
