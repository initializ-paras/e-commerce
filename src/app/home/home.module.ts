import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RouterLink} from "@angular/router";
import {CatalogModule} from "../components/catalog/catalog.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
      CommonModule,
      CatalogModule,
      RouterLink
    ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
