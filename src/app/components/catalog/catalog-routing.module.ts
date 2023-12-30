import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";
import {FiltersService} from "../filters/filters.service";

const catalogRoutes: Routes = [
  {
    path: 'catalog',
    children: [
      {
        path: ':category',
        component: CatalogComponent,
        data: { reuse: true, breadcrumb: { alias: 'productCategory' } },
      },
      {
        path: 'search_results',
        component: CatalogComponent,
        data: { reuse: true },
      },
      {
        path: '',
        pathMatch: 'full',
        component: CatalogComponent,
        data: { reuse: true },
      },
    ],
    data: { breadcrumb: { label: 'Catalog' } }
  },
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
