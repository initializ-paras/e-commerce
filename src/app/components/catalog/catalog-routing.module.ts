import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";
import {FiltersService} from "../filters/filters.service";

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

export class CatalogRoutingModule {
  constructor(private router: Router, private filtersService: FiltersService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.filtersService.clearSelectedFilters();
      }
    });
  }
}
