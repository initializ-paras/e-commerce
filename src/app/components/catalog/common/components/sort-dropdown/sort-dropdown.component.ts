import { Component } from '@angular/core';
import {CatalogComponent} from "../../../catalog.component";
import {SortingService} from "./sorting.service";
import {FiltersService} from "../../../../filters/filters.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-sort-dropdown',
  templateUrl: './sort-dropdown.component.html',
  animations: [
    trigger('openDropdown', [
      transition(':enter', [
        style({
          height: '0',
          overflow: 'hidden',
          opacity: '1',
        }),
        animate('300ms ease-in', style({
          height: '*',
          overflow: 'visible',
          opacity: '1',
        })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          height: '0',
          overflow: 'hidden',
          opacity: '1',
        })),
      ]),
    ]),
  ],
})

export class SortDropdownComponent {
  isOpen: boolean = false;

  constructor(public sortingService: SortingService, private catalog: CatalogComponent,
              private filterService : FiltersService) {
  }

  openDropdown(): void {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }

  selectValue(option : string) {
    this.sortingService.selectedOption = option;

    if (this.filterService.selectedFilters.some(filter => filter.includes('sortingtype'))) {
      let replacedIndex = this.filterService.selectedFilters.findIndex(
        item => item.includes("sortingtype"));

      this.filterService.selectedFilters[replacedIndex] = 'sortingtype=' + this.sortingService.sortingOptions[this.sortingService.selectedOption];
    }
    else {
      this.filterService.selectedFilters.push('sortingtype=' + this.sortingService.sortingOptions[this.sortingService.selectedOption]);
    }

    this.catalog.updateCatalog()
    this.openDropdown();
  }

  protected readonly Object = Object;
}
