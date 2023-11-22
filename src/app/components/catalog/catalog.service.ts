import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../../modules/shared/models/pagination";
import {GeneralizedProduct} from "../../modules/shared/models/generalized-product";
import {FiltersService} from "../filters/filters.service";

@Injectable()
export class CatalogService {
  baseApiUrl : string = "https://localhost:7001/api/"

  constructor(public filtersService : FiltersService, private http : HttpClient) { }

  getPaginatedCatalog(categoty : string, pageIndex : number) {
    let query = this.filtersService.selectedFilters.join('&').replaceAll('+', '%2B')

    return this.http.get<Pagination<GeneralizedProduct[]>>(this.baseApiUrl + categoty + '?' + 'pageindex=' + pageIndex + '&' + query);
  }
}
