import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {GeneralizedProduct} from "../../modules/shared/models/generalized-product";
import {ActivatedRoute, Router} from "@angular/router";
import {FiltersService} from "../filters/filters.service";
import {FiltersComponent} from "../filters/filters.component";
import {SortDropdownComponent} from "./common/components/sort-dropdown/sort-dropdown.component";
import {SortingService} from "./common/components/sort-dropdown/sorting.service";
import {BreadcrumbService} from "xng-breadcrumb";

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
              private sortingService: SortingService, private bcService: BreadcrumbService,
              private route : ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.updateCatalog();
  }

  updateCatalog(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];

      if (this.category === undefined) return;

      const apiCategory = this.filterService.categoryMapping[this.category] || this.category;
      this.catalogService.getPaginatedCatalog(apiCategory, this.currentPageIndex).subscribe({
        next: response => {
          this.items = response.items;
          this.totalItemsQuantity = response.totalItemsQuantity;
          this.currentPageIndex = response.pageIndex;
          this.bcService.set('@productCategory',
            this.category.charAt(0).toUpperCase() + this.category.slice(1).replaceAll('_', ' '));
        },
        error: err => {
          if (err.status === 404) {
            this.router.navigate(['/error']);
          } else {
            console.log(err);
          }
        }
      });
    });
  }

  toggleFilters(): void {
    this.isFiltersModalVisible = !this.isFiltersModalVisible;

    const body = document.body!;
    if (body.classList.contains('overflow-y-auto')) {
      body.classList.replace('overflow-y-auto', 'overflow-y-hidden');
    }
    else if (body.classList.contains('overflow-y-hidden')) {
      body.classList.replace('overflow-y-hidden', 'overflow-y-auto');
    }
  }

  removeAllFilters(): void {
    this.filterService.clearSelectedFilters();
    this.updateCatalog();
    let filters : FiltersComponent = new FiltersComponent(this.filterService, this.route);
    filters.updateFilters(this.filterService.categoryMapping[this.category]);
    let sortingFilters : SortDropdownComponent = new SortDropdownComponent(this.sortingService, this, this.filterService);
    sortingFilters.selectValue("Rating");
    const lowerPriceLimitInput = document.getElementById(
      'lowerpricelimit') as HTMLInputElement;
    const upperPriceLimitInput = document.getElementById(
      'upperpricelimit') as HTMLInputElement;
    lowerPriceLimitInput.value = '';
    upperPriceLimitInput.value = '';
  }

  changePageIndex(event : any): void {
    if(this.currentPageIndex !== event.page) {
      this.currentPageIndex = event.page;
      this.updateCatalog();
    }
    window.scrollTo(0, 0);
  }
}
