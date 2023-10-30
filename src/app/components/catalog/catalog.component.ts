import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {GeneralizedProduct} from "../../modules/shared/models/generalized-product";
import {ActivatedRoute, Router} from "@angular/router";
import {FiltersService} from "../filters/filters.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
})

export class CatalogComponent implements OnInit{
  items : GeneralizedProduct[] = [];
  url : string = this.catalogService.baseApiUrl;
  category : string = '';
  totalItemsQuantity! : number;

  categoryMapping: { [key: string]: string } = {
    'personal_computers': 'personalcomputer',
  };

  constructor(private catalogService : CatalogService, public filterService : FiltersService,
              private route : ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.updateCatalog();
  }

  updateCatalog() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      const apiCategory = this.categoryMapping[this.category] || this.category;
      this.catalogService.getPaginatedCatalog(apiCategory).subscribe({
        next: response => {
          this.items = response.items;
          this.totalItemsQuantity = response.totalItemsQuantity;
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

  toggleSort($event : any) {
    if (this.filterService.selectedFilters.some(filter => filter.includes('sortingtype'))) {
      let replacedIndex = this.filterService.selectedFilters.findIndex(
        item => item.includes("sortingtype"));

      this.filterService.selectedFilters[replacedIndex] = 'sortingtype=' + $event.target.value;
    }
    else {
      this.filterService.selectedFilters.push('sortingtype=' + $event.target.value);
    }

    this.updateCatalog()
  }

  getFilterOnlyArray() : string[] {
    let filteredFilters = this.filterService.selectedFilters.filter(
      filter => !filter.includes('sortingtype'));

    return filteredFilters;
  }
}
