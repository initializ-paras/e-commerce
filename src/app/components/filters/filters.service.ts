import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FiltersData} from "../../modules/shared/models/filters-data";
import {FilterSpecification} from "./common/models/filter-specification";
import {FilterBaseElement} from "./common/models/filter-base-element";
import {SearchService} from "../navigation-bar/search-bar/search.service";

@Injectable()
export class FiltersService {
  baseApiUrl: string = "https://localhost:7001/api/";
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

  apiVariableNameMaps: { [key: string]: string } = {
    'Brands' : 'brandname',
    'Categories' : 'category',
    'Availability' : 'instock',
    'Classification' : 'classification',
    'Operating system' : 'operatingsystem',
    'CPU brand' : 'processorbrand',
    'CPU model' : 'processormodel',
    'CPU series' : 'processorseries',
    'CPU cores quantity' : 'coresquantity',
    'GPU brand' : 'graphicscardbrand',
    'GPU model' : 'graphicscardmodel',
    'GPU series' : 'graphicscardseries',
    'GPU type' : 'graphicscardtype',
    'GPU memory capacity' : 'graphicscardmemorycapacity',
    'RAM type' : 'ramtype',
    'RAM memory capacity' : 'ramcapacity',
    'Storage type' : 'storagetype',
    'Storage memory capacity' : 'storagecapacity',
  };

  titleMapping: { [key: string]: string } = {
    'general_classification': 'Classification',
    'general_operating_system': 'Operating system',
    'processor_manufacturer': 'CPU brand',
    'processor_model': 'CPU model',
    'processor_series': 'CPU series',
    'processor_quantity_of_cores': 'CPU cores quantity',
    'graphics_card_manufacturer': 'GPU brand',
    'graphics_card_model': 'GPU model',
    'graphics_card_series': 'GPU series',
    'graphics_card_type': 'GPU type',
    'graphics_card_amount_of_memory': 'GPU memory capacity',
    'random_access_memory_amount_of_memory': 'RAM memory capacity',
    'random_access_memory_type': 'RAM type',
    'storage_amount_of_memory': 'Storage memory capacity',
    'storage_type': 'Storage type',
  };

  categoryMapping: { [key: string]: string } = {
    'personal_computers': 'personalcomputer',
    'search_results': 'productsearch'
  };

  constructor(private http : HttpClient, private searchService: SearchService) { }

  getRelatedFilters(category : string) {
    let query = this.selectedFilters.join('&').replaceAll('+', '%2B');
    let preparedText: string = 'text=' + this.searchService.searchedText;

    let gatheredAttributes: string[] = [query, preparedText];

    return this.http.get<FiltersData>(
      this.baseApiUrl + 'specificationfilter/' + category + '?' + gatheredAttributes.join('&'))
  }

  getFilterOnlyArray() : string[] {
    let filteredFilters = this.selectedFilters.filter(
      filter => !filter.includes('sortingtype'));

    return filteredFilters;
  }

  clearSelectedFilters(): void {
    this.selectedFilters = [];
  }
}
