import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import {ProductCardComponent} from "./common/components/product-card/product-card.component";
import {FiltersModule} from "../filters/filters.module";
import {RouterOutlet} from "@angular/router";
import { FilterTagComponent } from './common/components/filter-tag/filter-tag.component';
import { FilterModalComponent } from './common/components/filter-modal/filter-modal.component';
import { SortDropdownComponent } from './common/components/sort-dropdown/sort-dropdown.component';
import {FiltersService} from "../filters/filters.service";
import {SortingService} from "./common/components/sort-dropdown/sorting.service";
import {CatalogService} from "./catalog.service";

@NgModule({
  declarations: [
    CatalogComponent,
    ProductCardComponent,
    FilterTagComponent,
    FilterModalComponent,
    SortDropdownComponent,
  ],
  imports: [
    CommonModule,
    FiltersModule,
    RouterOutlet,
  ],
  providers: [
    FiltersService,
    SortingService,
    CatalogService
  ],
  exports: [
    ProductCardComponent,
    FilterModalComponent
  ]
})

export class CatalogModule { }
