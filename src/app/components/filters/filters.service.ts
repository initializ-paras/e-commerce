import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FiltersData} from "../../modules/shared/models/filters-data";
import {FilterSpecification} from "./common/models/filter-specification";
import {FilterBaseElement} from "./common/models/filter-base-element";
import {SearchService} from "../navigation-bar/search-bar/search.service";
import {environment} from "../../../environments/environment";
import {SpecsRequestVariables} from "../../modules/shared/models/specs-request-variables";
import {SpecsHeadingVariablesVariables} from "../../modules/shared/models/specs-heading-variables";
import {SpecsCategoryVariables} from "../../modules/shared/models/specs-category-variables";

@Injectable()
export class FiltersService {
  baseApiUrl: string = environment.apiUrl;
  filterCategory!: string | null;
  minimalPrice!: number;
  maximumPrice!: number;
  totalItemsQuantity! : number;
  currentPageItemsQuantity!: number;
  pageIndex!: number
  filterSpecs: FilterSpecification = {};
  filterBrands: FilterBaseElement = {};
  filterCategories: FilterBaseElement = {};
  selectedFilters: string[] = [];

  apiVariableNameMaps: { [key: string]: string } = new SpecsRequestVariables().variableNameMaps;
  titleMapping: { [key: string]: string } = new SpecsHeadingVariablesVariables().titleMapping;
  categoryMapping: { [key: string]: string } = new SpecsCategoryVariables().categoryMapping;

  constructor(private http : HttpClient, private searchService: SearchService) { }

  getRelatedFilters(category : string) {
    let query = this.selectedFilters.join('&').replaceAll('+', '%2B');
    let preparedText: string = 'text=' + this.searchService.searchedText;

    let gatheredAttributes: string[] = [query, preparedText];

    return this.http.get<FiltersData>(
      this.baseApiUrl + 'SpecificationFilter/' + category + '?' + gatheredAttributes.join('&'))
  }

  getFilterOnlyArray() : string[] {
    return this.selectedFilters.filter(
      filter => !filter.includes('sortingtype'));
  }

  clearSelectedFilters(): void {
    this.selectedFilters = [];
  }
}
