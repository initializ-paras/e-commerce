import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{
  searchText: string = '';
  showClearButton: boolean = false;

  ngOnInit() {
  }

  clearSearch() {
    this.searchText = '';
    this.showClearButton = false;
  }

  toggleClearButtonVisibility() {
    this.showClearButton = this.searchText.trim() !== '';
  }
}
