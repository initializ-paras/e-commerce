import {Component} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent{
  searchText: string = '';
  showClearButton: boolean = false;

  clearSearch() {
    this.searchText = '';
    this.showClearButton = false;
  }

  toggleClearButtonVisibility() {
    this.showClearButton = this.searchText.trim() !== '';
  }
}
