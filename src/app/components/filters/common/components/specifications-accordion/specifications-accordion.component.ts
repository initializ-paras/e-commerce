import {Component, Input} from '@angular/core';
import {accordionAnimation} from "../../animations/accordion.animations";
import {FiltersService} from "../../../filters.service";

@Component({
  selector: 'app-specifications-accordion',
  templateUrl: './specifications-accordion.component.html',
  animations: [accordionAnimation],
})

export class SpecificationsAccordionComponent {
  @Input() filterData: {[p: string]: {[p: string]: number}} = {};
  @Input() category: string = '';

  constructor(public filterService : FiltersService) {
  }

  protected readonly Object = Object;

  getSuitableHeading(title : string, attribute : string) : string {
    return this.filterService.titleMapping[(title.toLowerCase() + ' ' + attribute.toLowerCase()).replaceAll(' ', '_')];
  }
}
