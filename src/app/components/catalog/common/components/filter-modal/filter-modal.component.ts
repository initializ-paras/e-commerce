import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FiltersService} from "../../../../filters/filters.service";

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html'
})

export class FilterModalComponent {
  @Input() showModal: boolean = false;
  @Input() category: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(public filterService : FiltersService) {
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
