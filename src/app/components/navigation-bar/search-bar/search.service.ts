import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Pagination} from "../../../modules/shared/models/pagination";
import {Product} from "../../../modules/shared/models/product";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  baseApiUrl : string = environment.apiUrl;
  searchedText : string = '';

  constructor(private http : HttpClient) { }

  getSearchResults(searchedData : string) {
    return this.http.get<Pagination<Product[]>>(this.baseApiUrl + "productsearch?text=" + searchedData);
  }
}
