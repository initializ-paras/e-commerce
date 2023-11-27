import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {GeneralizedProduct} from "../../modules/shared/models/generalized-product";
import {ActivatedRoute, Router} from "@angular/router";
import {FiltersService} from "../filters/filters.service";
import {FiltersComponent} from "../filters/filters.component";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html'
})

export class CatalogComponent implements OnInit{
  items : GeneralizedProduct[] = [];
  url : string = this.catalogService.baseApiUrl;
  category : string = '';
  totalItemsQuantity!: number;
  itemsPerPage: number = 24;
  maxPaginationNavigationLinks: number = 10;
  currentPageIndex: number = 1;

  isFiltersModalVisible: boolean = false;

  constructor(private catalogService : CatalogService, public filterService : FiltersService,
              private route : ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.updateCatalog();
  }

  updateCatalog(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      const apiCategory = this.filterService.categoryMapping[this.category] || this.category;
      this.catalogService.getPaginatedCatalog(apiCategory, this.currentPageIndex).subscribe({
        next: response => {
          this.items = response.items;
          this.totalItemsQuantity = response.totalItemsQuantity;
          this.currentPageIndex = response.pageIndex;
        },
        error: err => {
          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          } else {
            console.log(err);
          }
        }
      });
    });
  }

  toggleFilters(): void {
    this.isFiltersModalVisible = !this.isFiltersModalVisible;
  }

  removeAllFilters(): void {
    this.filterService.clearSelectedFilters();
    this.updateCatalog();
    let filters : FiltersComponent = new FiltersComponent(this.filterService, this.route);
    filters.updateFilters(this.filterService.categoryMapping[this.category]);
  }

  changePageIndex(event : any): void {
    if(this.currentPageIndex !== event.page) {
      this.currentPageIndex = event.page;
      this.updateCatalog();
    }
  }
}
