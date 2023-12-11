import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";

const catalogRoutes: Routes = [
  { path: 'catalog/:category', component: CatalogComponent, data: { reuse: true } },
  { path: 'catalog/search_results', component: CatalogComponent, data: { reuse: true } },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(catalogRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CatalogRoutingModule { }
