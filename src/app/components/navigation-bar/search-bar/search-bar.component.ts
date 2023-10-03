import {Component} from '@angular/core';
import {Product} from "../../../modules/shared/models/product";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent{
  items: Product[] = [];
  searchText: string = '';
  showClearButton: boolean = false;

  constructor(private searchService : SearchService) { }

  clearSearch() {
    this.searchText = '';
    this.showClearButton = false;
  }

  toggleClearButtonVisibility() {
    this.showClearButton = this.searchText.trim() !== '';
  }

  searchForResults() {
    this.searchService.getSearchResults(this.searchText).subscribe({
      next: response => this.items = response.items,
      error: err => console.log(err)
    })
  }
}
