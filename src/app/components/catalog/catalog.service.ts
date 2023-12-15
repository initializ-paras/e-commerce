import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../../modules/shared/models/pagination";
import {GeneralizedProduct} from "../../modules/shared/models/generalized-product";
import {FiltersService} from "../filters/filters.service";
import {SearchService} from "../navigation-bar/search-bar/search.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class CatalogService {
  baseApiUrl : string = environment.apiUrl;

  constructor(public filtersService : FiltersService, private searchService: SearchService,
              private http : HttpClient) { }

  getPaginatedCatalog(category : string, pageIndex : number) {
    let filterQuery: string = this.filtersService.selectedFilters.join('&').replaceAll('+', '%2B')
    let preparedCategory: string = category + '?';
    let preparedPageIndex: string = 'pageindex=' + pageIndex;
    let preparedText: string = 'text=' + this.searchService.searchedText;

    let gatheredAttributes: string[] = [preparedPageIndex, filterQuery, preparedText];

    return this.http.get<Pagination<GeneralizedProduct[]>>(
      this.baseApiUrl + preparedCategory + gatheredAttributes.join('&') );
  }
}
