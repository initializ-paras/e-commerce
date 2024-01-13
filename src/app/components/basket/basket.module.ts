import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasketComponent} from "./basket.component";
import {BasketService} from "./basket.service";
import {FiltersModule} from "../filters/filters.module";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    BasketComponent
  ],
  providers: [
    BasketService
  ],
  exports: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    FiltersModule,
    RouterLink
  ]
})
export class BasketModule { }
