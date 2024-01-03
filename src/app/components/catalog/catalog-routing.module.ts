import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule, Routes} from "@angular/router";
import {CatalogComponent} from "./catalog.component";
import {FiltersService} from "../filters/filters.service";
import {ProductDetailedComponent} from "./common/components/product-detailed/product-detailed.component";

const catalogRoutes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent,
    data: { breadcrumb: { label: 'Catalog' } },
  },
  {
    path: 'catalog',
    children: [
      {
        path: ':category',
        component: CatalogComponent,
        data: { reuse: true, breadcrumb: { alias: 'productCategory' } },
      },
      {
        path: ':category',
        data: { reuse: true, breadcrumb: { alias: 'productCategory' } },
        children: [
          {
            path: 'item/:itemId',
            component: ProductDetailedComponent,
            data: { reuse: true, breadcrumb: { alias: 'productItem' } },
          },
          {
            path: '',
            component: CatalogComponent,
            data: { reuse: true, breadcrumb: { alias: 'productCategory' } },
          },
        ]
      },
      {
        path: '',
        component: CatalogComponent,
        data: { reuse: true },
      },
    ],
    data: { breadcrumb: { label: 'Catalog' } },
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
