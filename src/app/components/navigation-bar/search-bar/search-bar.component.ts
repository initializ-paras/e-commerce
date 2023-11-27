import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  searchText: string = '';
  showClearButton: boolean = false;

  constructor(private searchService: SearchService, private router: Router) { }

  clearSearch() {
    this.searchText = '';
    this.showClearButton = false;
  }

  toggleClearButtonVisibility() {
    this.showClearButton = this.searchText.trim() !== '';
  }

  searchForResults() {
    if (this.searchText.trim().length === 0) {
      return;
    }

    this.searchService.searchedText = this.searchText;
    console.log('Searched text:', this.searchService.searchedText);
    this.searchText = '';
    this.showClearButton = false;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['catalog/search_results']);
    });
  }
}
