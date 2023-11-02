import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import {ProductCardComponent} from "./common/components/product-card/product-card.component";
import {FiltersModule} from "../filters/filters.module";
import {RouterOutlet} from "@angular/router";
import { FilterTagComponent } from './common/components/filter-tag/filter-tag.component';
import { FilterModalComponent } from './common/components/filter-modal/filter-modal.component';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductCardComponent,
    FilterTagComponent,
    FilterModalComponent,
  ],
  imports: [
    CommonModule,
    FiltersModule,
    RouterOutlet,
  ],
  exports: [
    ProductCardComponent,
    FilterModalComponent
  ]
})

export class CatalogModule { }
