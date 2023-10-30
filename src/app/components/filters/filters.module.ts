import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FiltersComponent} from "./filters.component";
import {AccordionModule} from "ngx-bootstrap/accordion";
import {MatExpansionModule} from "@angular/material/expansion";
import { BasicAccordionComponent } from './common/components/basic-accordion/basic-accordion.component';
import {SpecificationsAccordionComponent} from "./common/components/specifications-accordion/specifications-accordion.component";
import {
  PositiveNumberDirective,
  PriceRangeAccordionComponent
} from './common/components/price-range-accordion/price-range-accordion.component';
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    FiltersComponent,
    BasicAccordionComponent,
    SpecificationsAccordionComponent,
    PriceRangeAccordionComponent,
    PositiveNumberDirective
  ],
  imports: [
    CommonModule,
    AccordionModule,
    MatExpansionModule,
    MatSliderModule,
    FormsModule,
    MatSlideToggleModule,
  ],
  exports: [
    FiltersComponent,
    BasicAccordionComponent,
    SpecificationsAccordionComponent
  ]
})
export class FiltersModule { }
