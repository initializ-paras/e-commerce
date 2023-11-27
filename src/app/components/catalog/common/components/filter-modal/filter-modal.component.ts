import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FiltersComponent} from "../../../../filters/filters.component";
import {CatalogComponent} from "../../../catalog.component";
import {FiltersService} from "../../../../filters/filters.service";
import {
  filterModalBackgroundAnimation,
  filterModalWindowAnimation
} from "./filter-modal.animations";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  animations: [filterModalWindowAnimation, filterModalBackgroundAnimation]
})

export class FilterModalComponent {
  @Input() showModal: boolean = false;
  @Input() category: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(public filterService : FiltersService, public catalogComponent : CatalogComponent,
              private route: ActivatedRoute) {
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  removeAllFilters() {
    this.filterService.clearSelectedFilters();

    this.catalogComponent.updateCatalog();

    let filters : FiltersComponent = new FiltersComponent(this.filterService, this.route);

    filters.updateFilters(this.category);
  }
}
